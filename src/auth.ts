import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

const authSecret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;

if (!authSecret || authSecret.length < 32) {
  throw new Error("NEXTAUTH_SECRET must be set and at least 32 characters");
}

const authUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

const SESSION_MAX_AGE = 8 * 60 * 60;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const { prisma } = await import("@/lib/prisma");
          const bcrypt = await import("bcryptjs");
          const email = String(credentials.email).toLowerCase().trim();
          const admin = await prisma.adminUser.findUnique({
            where: { email },
            select: { id: true, email: true, name: true, password: true },
          });
          if (!admin) return null;
          const valid = await bcrypt.default.compare(String(credentials.password), admin.password);
          if (!valid) return null;
          return { id: admin.id, email: admin.email, name: admin.name };
        } catch (e) {
          console.error("Auth error:", e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE,
  },
  jwt: {
    maxAge: SESSION_MAX_AGE,
  },
  pages: { signIn: "/admin/login" },
  secret: authSecret,
  useSecureCookies: authUrl.startsWith("https://"),
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.valid = true;
      }

      if (token.sub) {
        try {
          const { prisma } = await import("@/lib/prisma");
          const admin = await prisma.adminUser.findUnique({
            where: { id: token.sub as string },
            select: { id: true, email: true, name: true },
          });
          if (!admin) {
            token.valid = false;
            delete token.sub;
            delete token.email;
            delete token.name;
          } else {
            token.valid = true;
            token.email = admin.email;
            token.name = admin.name;
          }
        } catch (e) {
          console.error("JWT validation error:", e);
          token.valid = false;
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (!token.sub || token.valid === false) {
        session.user = undefined as unknown as Session["user"];
        return session;
      }
      if (session.user) {
        session.user.id = token.sub;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
