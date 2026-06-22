import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextRequest, NextResponse } from "next/server";
export const AUTH_COOKIE_NAME = "pm_auth";

const JWT_EXPIRY = "7d";

/** Stored in JWT; matches `AdminUser.role` in the database (e.g. `admin`, `super_admin`). */
export type AuthRole = string;

export interface JwtPayload {
  sub: string;
  role: AuthRole;
  iat?: number;
  exp?: number;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET must be set and at least 16 characters");
  }
  return secret;
};

export const hashPassword = async (plain: string): Promise<string> => {
  return bcrypt.hash(plain, 12);
};

export const verifyPassword = async (plain: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};

export const signAuthToken = (userId: string, role: AuthRole): string => {
  return jwt.sign({ sub: userId, role }, getJwtSecret(), {
    algorithm: "HS256",
    expiresIn: JWT_EXPIRY,
  });
};

export const verifyAuthToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;
    if (typeof decoded.sub !== "string" || !decoded.role) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
};

export const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export const setAuthCookie = (response: NextResponse, token: string): void => {
  response.cookies.set(AUTH_COOKIE_NAME, token, authCookieOptions);
};

export const clearAuthCookie = (response: NextResponse): void => {
  response.cookies.set(AUTH_COOKIE_NAME, "", { ...authCookieOptions, maxAge: 0 });
};

export const getSessionFromCookies = async (): Promise<JwtPayload | null> => {
  const store = await cookies();
  const token = store.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  return verifyAuthToken(token);
};

export const getSessionFromRequest = (request: NextRequest): JwtPayload | null => {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  return verifyAuthToken(token);
};

export const isSuperAdmin = (session: JwtPayload | null): boolean => {
  const r = session?.role;
  return r === "super_admin" || r === "admin";
};
