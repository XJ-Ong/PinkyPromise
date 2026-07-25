"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleMessage = () => {
    setMessage("Login isn\u2019t available yet \u2014 please use the test user below.");
  };

  const handleTestLogin = () => {
    localStorage.setItem("pp_logged_in", "true");
    router.push("/");
  };

  return (
    <main className="container mx-auto px-4 py-6 md:py-10 max-w-md space-y-8">
      {/* Logo */}
      <div className="flex flex-col items-center gap-3 pt-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-primary flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-3xl leading-none">P</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Log in to PinkyPromise</h1>
      </div>

      {/* Login Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email or username
          </label>
          <Input
            id="email"
            name="pp-login-identifier"
            type="email"
            placeholder="you@example.com"
            autoComplete="off"
            data-1p-ignore="true"
            data-lpignore="true"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-slate-700">
            Password
          </label>
          <Input
            id="password"
            name="pp-login-password"
            type="password"
            placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            autoComplete="new-password"
            data-1p-ignore="true"
            data-lpignore="true"
          />
        </div>

        {message && (
          <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            {message}
          </p>
        )}

        <Button className="w-full" onClick={handleMessage}>
          Log In
        </Button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-400">or continue with</span>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full" onClick={handleMessage}>
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full" onClick={handleMessage}>
          Continue with Facebook
        </Button>
      </div>

      {/* Test User */}
      <div className="pt-2">
        <Button className="w-full bg-gradient-to-r from-pink-500 to-primary hover:from-pink-600 hover:to-primary/90 text-white shadow-md" onClick={handleTestLogin}>
          Login as Test User
        </Button>
      </div>
    </main>
  );
}
