"use client";

import { useState } from "react";
import Navbar from "../home/_components/Navbar";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic placeholder
    console.log("Login clicked", { username, password });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col overflow-x-hidden" dir="rtl">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Login Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative select-none">
        
        {/* Background spot glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-[20%] left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[20%] right-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating 3D Gamepads, Gifts, Stars (positioned around the card) */}
        
        {/* 1. Green Gamepad - Top Right */}
        <div className="absolute top-[10%] right-[10%] sm:right-[15%] md:right-[26%] lg:right-[30%] xl:right-[32%] z-20 pointer-events-none transform -rotate-[15deg] animate-bounce duration-[4s]">
          <Image
            src="/images/card_gamepad.png"
            alt="Gamepad Decoration"
            width={85}
            height={85}
            className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
          />
        </div>

        {/* 2. Purple Gamepad - Bottom Left */}
        <div className="absolute bottom-[10%] left-[10%] sm:left-[15%] md:left-[26%] lg:left-[30%] xl:left-[32%] z-20 pointer-events-none transform rotate-[25deg] animate-bounce duration-[5s] filter hue-rotate-[90deg] saturate-[1.1]">
          <Image
            src="/images/card_gamepad.png"
            alt="Gamepad Decoration"
            width={80}
            height={80}
            className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
          />
        </div>

        {/* 3. Purple Gift Box - Middle Left */}
        <div className="absolute top-[25%] left-[8%] sm:left-[14%] md:left-[24%] lg:left-[28%] z-20 pointer-events-none transform rotate-[15deg] animate-pulse">
          <Image
            src="/images/card_quiz.png"
            alt="Gift Decoration"
            width={44}
            height={44}
            className="object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* 4. Blue Gift Box - Bottom Right */}
        <div className="absolute bottom-[8%] right-[8%] sm:right-[14%] md:right-[24%] lg:right-[28%] z-20 pointer-events-none transform -rotate-[10deg] animate-pulse filter hue-rotate-[180deg]">
          <Image
            src="/images/card_quiz.png"
            alt="Gift Decoration"
            width={64}
            height={64}
            className="object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* 5. Smaller Purple Gift Box - Middle Right */}
        <div className="absolute top-[30%] right-[8%] sm:right-[14%] md:right-[24%] lg:right-[28%] z-20 pointer-events-none transform rotate-[20deg] animate-pulse">
          <Image
            src="/images/card_quiz.png"
            alt="Gift Decoration"
            width={38}
            height={38}
            className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* 6. Scattered stars */}
        {/* Left Star */}
        <div className="absolute top-[28%] left-[10%] sm:left-[16%] md:left-[26%] text-yellow-400 text-3xl font-bold animate-pulse pointer-events-none drop-shadow-[0_0_8px_#ffc107]">★</div>
        {/* Right Star */}
        <div className="absolute bottom-[24%] right-[10%] sm:right-[16%] md:right-[26%] text-yellow-400 text-3xl font-bold animate-bounce duration-[3s] pointer-events-none drop-shadow-[0_0_8px_#ffc107]">★</div>
        {/* Top Center Star */}
        <div className="absolute top-[12%] left-[45%] text-yellow-400 text-lg opacity-60 animate-ping duration-[5s] pointer-events-none">✦</div>
        {/* Bottom Sparkle */}
        <div className="absolute bottom-[8%] left-[20%] text-slate-400 text-3xl opacity-30 select-none animate-pulse pointer-events-none">✦</div>

        {/* Login Card Container with Neon Border Gradient */}
        <div className="relative w-full max-w-[400px] rounded-[2rem] p-[2px] bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-cyan-400 shadow-[0_0_30px_rgba(168,85,247,0.3)] dark:shadow-[0_0_40px_rgba(168,85,247,0.4)] z-10 transition-all duration-300">
          
          {/* Card Body */}
          <div className="bg-[#130a21] dark:bg-[#130a21] text-white rounded-[1.95rem] p-6 sm:p-8 flex flex-col items-center">
            
            {/* Header */}
            <h2 className="text-2xl sm:text-[28px] font-extrabold text-primary tracking-tight">
              تسجيل الدخول
            </h2>
            <p className="text-xs sm:text-sm text-white/95 mt-2 text-center leading-relaxed max-w-sm">
              مرحباً بك مجدداً! ادخل إلى حسابك للمشاركة في المسابقات
            </p>

            {/* Form */}
            <form onSubmit={handleLogin} className="w-full mt-6 space-y-3.5">
              
              {/* Input 1: Username/Email (RTL - Icon is on the right inside input) */}
              <div className="relative w-full rounded-xl bg-[#0f0422] border border-purple-950/50 focus-within:border-primary/50 transition-all duration-200">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="المستخدم / الإلكتروني"
                  className="w-full bg-transparent px-4 py-3 pr-11 text-right text-sm placeholder-white/40 text-white outline-none"
                />
                <User className="h-4.5 w-4.5 text-white/60 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>

              {/* Input 2: Password (RTL - Lock on the right, Eye on the left) */}
              <div className="relative w-full rounded-xl bg-[#0f0422] border border-purple-950/50 focus-within:border-primary/50 transition-all duration-200">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة المرور"
                  className="w-full bg-transparent px-11 py-3 pr-11 text-right text-sm placeholder-white/40 text-white outline-none"
                />
                {/* Lock icon on the right */}
                <Lock className="h-4.5 w-4.5 text-white/60 absolute right-4 top-1/2 -translate-y-1/2" />
                
                {/* Eye icon toggle on the left */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>

              {/* Forgot Password Link (RTL right-aligned) */}
              <div className="w-full flex justify-start">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs text-primary font-bold hover:underline"
                >
                  نسيت كلمة المرور؟
                </a>
              </div>

              {/* Login Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 mt-5 rounded-xl bg-primary text-primary-foreground font-extrabold text-sm sm:text-base hover:bg-primary/95 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-primary/20 cursor-pointer text-center"
              >
                دخول
              </button>

            </form>

            {/* Social Logins */}
            <div className="relative flex py-3 items-center justify-center w-full my-3">
              <div className="flex-grow border-t border-purple-950/40"></div>
              <span className="flex-shrink mx-3 text-[10px] sm:text-xs text-white/70 font-semibold">
                أو تسجيل الدخول باستخدام:
              </span>
              <div className="flex-grow border-t border-purple-950/40"></div>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-3.5 justify-center w-full">
              {/* Google */}
              <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0f0422] border border-purple-950/50 hover:border-purple-600/50 hover:bg-purple-950/20 text-white/80 hover:text-white transition-all cursor-pointer">
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V13.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.685 0-8.5-3.815-8.5-8.5s3.815-8.5 8.5-8.5c2.316 0 4.19.857 5.603 2.197l2.404-2.404C18.175 1.554 15.39 0 12.24 0 5.58 0 0 5.58 0 12.24s5.58 12.24 12.24 12.24c6.96 0 12.24-4.89 12.24-12.24 0-.825-.09-1.455-.24-1.95H12.24z" />
                </svg>
              </button>

              {/* Facebook */}
              <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0f0422] border border-purple-950/50 hover:border-purple-600/50 hover:bg-purple-950/20 text-white/80 hover:text-white transition-all cursor-pointer">
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              {/* Apple */}
              <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0f0422] border border-purple-950/50 hover:border-purple-600/50 hover:bg-purple-950/20 text-white/80 hover:text-white transition-all cursor-pointer">
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.1.09 2.22-.58 2.94-1.39z" />
                </svg>
              </button>
            </div>

            {/* Footer Sign-up link */}
            <p className="text-xs sm:text-sm text-white/95 mt-6 font-medium">
              <span>ليس لديك حساب؟ </span>
              <Link
                href="/register"
                className="text-primary hover:underline font-bold"
              >
                إنشاء حساب جديد
              </Link>
            </p>

          </div>
        </div>

      </main>
    </div>
  );
}
