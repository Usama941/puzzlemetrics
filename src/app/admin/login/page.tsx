"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center p-6"
      style={{
        background: "linear-gradient(135deg, #0A0814, #130F2A, #1D1745)",
      }}
    >
      <div
        className="w-full max-w-[400px] rounded-[20px] border border-white/10 p-10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-3">
            <Image src="/logo.png" alt="" width={40} height={40} className="rounded-lg" />
            <span className="text-lg font-bold text-white">PuzzleMetrics</span>
          </div>
          <h1 className="text-[22px] font-extrabold text-white">Admin Panel</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}
          <div>
            <label className="mb-1 block text-xs font-medium text-white/50">Email</label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[10px] border border-white/12 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#6055D9]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-white/50">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[10px] border border-white/12 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#6055D9]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-[#6055D9] py-3 text-sm font-semibold text-white transition hover:bg-[#5348c7] disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>
      </div>
    </div>
  );
}
