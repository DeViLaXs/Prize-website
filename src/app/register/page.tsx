"use client";

import { useState } from "react";
import Navbar from "../home/_components/Navbar";
import { User, Lock, Eye, EyeOff, AtSign, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // TanStack Form definition
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      dob: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    onSubmit: async ({ value }) => {
      // Logic for registration
      console.log("Register Form Submitted:", value);
      alert("تم إنشاء حسابك بنجاح!");
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col overflow-x-hidden" dir="rtl">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Register Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative select-none">
        
        {/* Background spot glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-[20%] left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[20%] right-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating 3D Gamepads, Gifts, Stars (positioned around the card) */}
        
        {/* 1. Green Gamepad - Top Right */}
        <div className="absolute top-[8%] right-[10%] sm:right-[15%] md:right-[26%] lg:right-[30%] xl:right-[32%] z-20 pointer-events-none transform -rotate-[15deg] animate-bounce duration-[4s]">
          <Image
            src="/images/card_gamepad.png"
            alt="Gamepad Decoration"
            width={85}
            height={85}
            className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
          />
        </div>

        {/* 2. Purple Gamepad - Bottom Left */}
        <div className="absolute bottom-[8%] left-[10%] sm:left-[15%] md:left-[26%] lg:left-[30%] xl:left-[32%] z-20 pointer-events-none transform rotate-[25deg] animate-bounce duration-[5s] filter hue-rotate-[90deg] saturate-[1.1]">
          <Image
            src="/images/card_gamepad.png"
            alt="Gamepad Decoration"
            width={80}
            height={80}
            className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
          />
        </div>

        {/* 3. Blue Gift Box - Bottom Right */}
        <div className="absolute bottom-[6%] right-[8%] sm:right-[14%] md:right-[24%] lg:right-[28%] z-20 pointer-events-none transform -rotate-[10deg] animate-pulse filter hue-rotate-[180deg]">
          <Image
            src="/images/card_quiz.png"
            alt="Gift Decoration"
            width={64}
            height={64}
            className="object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* 4. Smaller Purple Gift Box - Middle Right */}
        <div className="absolute top-[25%] right-[8%] sm:right-[14%] md:right-[24%] lg:right-[28%] z-20 pointer-events-none transform rotate-[20deg] animate-pulse">
          <Image
            src="/images/card_quiz.png"
            alt="Gift Decoration"
            width={38}
            height={38}
            className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* 5. Scattered stars */}
        {/* Left Star */}
        <div className="absolute top-[28%] left-[10%] sm:left-[16%] md:left-[26%] text-yellow-400 text-3xl font-bold animate-pulse pointer-events-none drop-shadow-[0_0_8px_#ffc107]">★</div>
        {/* Right Star */}
        <div className="absolute bottom-[24%] right-[10%] sm:right-[16%] md:right-[26%] text-yellow-400 text-3xl font-bold animate-bounce duration-[3s] pointer-events-none drop-shadow-[0_0_8px_#ffc107]">★</div>
        {/* Top Center Star */}
        <div className="absolute top-[12%] left-[45%] text-yellow-400 text-lg opacity-60 animate-ping duration-[5s] pointer-events-none">✦</div>
        {/* Bottom Sparkle */}
        <div className="absolute bottom-[8%] left-[20%] text-slate-400 text-3xl opacity-30 select-none animate-pulse pointer-events-none">✦</div>

        {/* Register Card Container with Neon Border Gradient */}
        <div className="relative w-full max-w-[420px] rounded-[2rem] p-[2px] bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-cyan-400 shadow-[0_0_30px_rgba(168,85,247,0.3)] dark:shadow-[0_0_40px_rgba(168,85,247,0.4)] z-10 transition-all duration-300">
          
          {/* Card Body */}
          <div className="bg-[#130a21] dark:bg-[#130a21] text-white rounded-[1.95rem] p-6 sm:p-8 flex flex-col items-center">
            
            {/* Header */}
            <h2 className="text-2xl sm:text-[28px] font-extrabold text-primary tracking-tight">
              إنشاء حساب جديد
            </h2>
            <p className="text-xs sm:text-sm text-white/95 mt-2 text-center leading-relaxed max-w-sm">
              سجل الآن وابدأ مغامرتك في المسابقات
            </p>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="w-full mt-6 space-y-3.5"
            >
              
              {/* Field 1: Full Name */}
              <form.Field
                name="fullName"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "الاسم الكامل مطلوب";
                    if (value.length < 3) return "يجب أن يكون الاسم 3 أحرف على الأقل";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="w-full flex flex-col gap-1">
                    <div className="relative w-full rounded-xl bg-[#0f0422] border border-purple-950/50 focus-within:border-primary/50 transition-all duration-200">
                      <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="الاسم الكامل"
                        className="w-full bg-transparent px-4 py-3 pr-11 text-right text-sm placeholder-white/40 text-white outline-none"
                      />
                      <User className="h-4.5 w-4.5 text-white/60 absolute right-4 top-1/2 -translate-y-1/2" />
                    </div>
                    {field.state.meta.isTouched && field.state.meta.errors.length ? (
                      <p className="text-xs text-rose-500 font-semibold mt-1 px-1">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {/* Field 2: Email */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "البريد الإلكتروني مطلوب";
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) return "البريد الإلكتروني غير صالح";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="w-full flex flex-col gap-1">
                    <div className="relative w-full rounded-xl bg-[#0f0422] border border-purple-950/50 focus-within:border-primary/50 transition-all duration-200">
                      <input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="البريد الإلكتروني"
                        className="w-full bg-transparent px-4 py-3 pr-11 text-right text-sm placeholder-white/40 text-white outline-none"
                      />
                      <AtSign className="h-4.5 w-4.5 text-white/60 absolute right-4 top-1/2 -translate-y-1/2" />
                    </div>
                    {field.state.meta.isTouched && field.state.meta.errors.length ? (
                      <p className="text-xs text-rose-500 font-semibold mt-1 px-1">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {/* Field 3: Date of Birth */}
              <form.Field
                name="dob"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "تاريخ الميلاد مطلوب";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="w-full flex flex-col gap-1">
                    <div className="relative w-full rounded-xl bg-[#0f0422] border border-purple-950/50 focus-within:border-primary/50 transition-all duration-200">
                      <input
                        type="date"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="تاريخ الميلاد"
                        className="w-full bg-transparent px-4 py-3 pr-11 text-right text-sm placeholder-white/40 text-white outline-none [color-scheme:dark]"
                      />
                      <Calendar className="h-4.5 w-4.5 text-white/60 absolute right-4 top-1/2 -translate-y-1/2" />
                    </div>
                    {field.state.meta.isTouched && field.state.meta.errors.length ? (
                      <p className="text-xs text-rose-500 font-semibold mt-1 px-1">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {/* Field 4: Password */}
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "كلمة المرور مطلوبة";
                    if (value.length < 6) return "يجب أن تكون كلمة المرور 6 أحرف على الأقل";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="w-full flex flex-col gap-1">
                    <div className="relative w-full rounded-xl bg-[#0f0422] border border-purple-950/50 focus-within:border-primary/50 transition-all duration-200">
                      <input
                        type={showPassword ? "text" : "password"}
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="كلمة المرور"
                        className="w-full bg-transparent px-11 py-3 pr-11 text-right text-sm placeholder-white/40 text-white outline-none"
                      />
                      <Lock className="h-4.5 w-4.5 text-white/60 absolute right-4 top-1/2 -translate-y-1/2" />
                      
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                      </button>
                    </div>
                    {field.state.meta.isTouched && field.state.meta.errors.length ? (
                      <p className="text-xs text-rose-500 font-semibold mt-1 px-1">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {/* Field 5: Confirm Password */}
              <form.Field
                name="confirmPassword"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "تأكيد كلمة المرور مطلوب";
                    if (value !== form.state.values.password) return "كلمتا المرور غير متطابقتين";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="w-full flex flex-col gap-1">
                    <div className="relative w-full rounded-xl bg-[#0f0422] border border-purple-950/50 focus-within:border-primary/50 transition-all duration-200">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="تأكيد كلمة المرور"
                        className="w-full bg-transparent px-11 py-3 pr-11 text-right text-sm placeholder-white/40 text-white outline-none"
                      />
                      <Lock className="h-4.5 w-4.5 text-white/60 absolute right-4 top-1/2 -translate-y-1/2" />
                      
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
                        aria-label="Toggle password visibility"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                      </button>
                    </div>
                    {field.state.meta.isTouched && field.state.meta.errors.length ? (
                      <p className="text-xs text-rose-500 font-semibold mt-1 px-1">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {/* Checkbox: Consent */}
              <form.Field
                name="agreeToTerms"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "يجب الموافقة على الشروط والأحكام";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="w-full flex flex-col gap-1">
                    <label className="flex items-center gap-3.5 cursor-pointer select-none text-right justify-start mt-2">
                      <input
                        type="checkbox"
                        checked={field.state.value}
                        onChange={(e) => field.handleChange(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`h-5 w-5 rounded-lg border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                        field.state.value 
                          ? "bg-primary border-primary text-primary-foreground" 
                          : "border-purple-950/50 bg-[#0f0422]"
                      }`}>
                        {field.state.value && (
                          <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-[3.5]" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs text-white/95 leading-relaxed font-semibold">
                        أوافق على{" "}
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-primary hover:underline">الشروط والأحكام</a>
                        {" "}و{" "}
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-primary hover:underline">سياسة الخصوصية</a>
                      </span>
                    </label>
                    {field.state.meta.isTouched && field.state.meta.errors.length ? (
                      <p className="text-xs text-rose-500 font-semibold mt-1 px-1">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {/* Submit Button */}
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 mt-5 rounded-xl bg-primary text-primary-foreground font-extrabold text-sm sm:text-base hover:bg-primary/95 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-primary/20 cursor-pointer text-center disabled:opacity-50"
                  >
                    {isSubmitting ? "جاري التحميل..." : "إنشاء حساب"}
                  </button>
                )}
              </form.Subscribe>

            </form>

            {/* Social Logins */}
            <div className="relative flex py-3 items-center justify-center w-full my-3">
              <div className="flex-grow border-t border-purple-950/40"></div>
              <span className="flex-shrink mx-3 text-[10px] sm:text-xs text-white/70 font-semibold">
                أو سجل باستخدام:
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

            {/* Footer Login link */}
            <p className="text-xs sm:text-sm text-white/95 mt-6 font-medium">
              <span>لديك حساب بالفعل؟ </span>
              <Link
                href="/login"
                className="text-primary hover:underline font-bold"
              >
                تسجيل الدخول
              </Link>
            </p>

          </div>
        </div>

      </main>
    </div>
  );
}
