"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/db/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "ورود ناموفق بود");
      }

      router.push("/referrallist");
    } catch (err) {
      setError(err.message || "خطایی رخ داده است");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-[#f0e2c2] font-vazir"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-28">
        <div className="max-w-md mx-auto bg-[#121212] border border-[#6e4519]/20 rounded-lg overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-[#1a1a1a] border-b border-[#6e4519]/20 p-6">
            <h1 className="text-2xl font-bold text-[#d4b483] text-center">
              ورود به سیستم
            </h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-[#2a0e0e] border border-[#8b2a2a]/50 text-[#ff9e9e] p-4 mx-6 mt-6 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-[#c19a65]/80 text-sm mb-2"
              >
                ایمیل
              </label>
              <input
                id="email"
                type="email"
                className="w-full bg-[#1a1a1a] border border-[#6e4519]/20 rounded-lg px-4 py-3 text-[#f0e2c2] focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]/50 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[#c19a65]/80 text-sm mb-2"
              >
                رمز عبور
              </label>
              <input
                id="password"
                type="password"
                className="w-full bg-[#1a1a1a] border border-[#6e4519]/20 rounded-lg px-4 py-3 text-[#f0e2c2] focus:outline-none focus:ring-2 focus:ring-[#8b5a2b]/50 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                loading
                  ? "bg-[#8b5a2b]/50 text-[#d4b483]/50 cursor-not-allowed"
                  : "bg-[#8b5a2b] hover:bg-[#a56c36] text-[#f0e2c2]"
              }`}
            >
              {loading ? "در حال ورود..." : "ورود"}
            </button>
          </form>

          {/* Footer */}
          <div className="bg-[#1a1a1a] border-t border-[#6e4519]/20 p-4 text-center text-sm text-[#c19a65]/60">
            سیستم مدیریت معرف‌ها
          </div>
        </div>
      </div>
    </div>
  );
}
