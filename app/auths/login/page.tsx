"use client";
import  { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.jpg";
import { XIcon } from "@phosphor-icons/react";

export default function Login() {
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");
    async function LoginUser(e: React.FormEvent) {
      e.preventDefault();
      setLoading(true);
      setMsg("");
  
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const email = formData.get("email");
      const password = formData.get("password");
  
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password
        })
      });
  
      const data = await res.json();
      setLoading(false);
      if (data.error) {
        setError(true);
      }
      setMsg(data.message || data.error);
      console.log(data);
    }
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bg}
          alt="Background"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/70">Log in to your KingHomes account</p>
        </div>

        <form className="space-y-6" onSubmit={LoginUser}>

          {
                      msg != "" && (
                        <div className="w-full flex items-center justify-center">
                          <div className={`flex items-center justify-around self-center p-3 gap-10 ${error ? "bg-red-700" : "bg-green-700"} h-14 shadow-2xl w-fit rounded-2xl`}>
                            <XIcon size={32} color="white" />
                            <h1 className="text-white">{msg}</h1>
                          </div>
                        </div>
                      )
                    }
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/90 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-white/90">Password</label>
              <Link href="#" className="text-xs text-white/70 hover:text-white hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              required
            />
          </div>


          {
            loading ? (
              <div className="flex items-center justify-center gap-2">
    <svg
      className="w-5 h-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    Loading...
  </div>
            )  : 
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg mt-4"
          >
            Log In
          </button>
          }
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            Don't have an account?{" "}
            <Link href="/auths/register" className="text-white font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
