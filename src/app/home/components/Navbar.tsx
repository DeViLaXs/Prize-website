"use client";

import { useState } from "react";
import { Trophy, UserPlus, User, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const navLinks = [
    { id: "home", label: "الرئيسية", href: "#" },
    { id: "competitions", label: "المسابقات", href: "#" },
    { id: "leaderboard", label: "المتصدرين", href: "#" },
    { id: "prizes", label: "الجوائز", href: "#" },
    { id: "how-to", label: "كيف تشارك؟", href: "#" },
    { id: "contact", label: "اتصل بنا", href: "#" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/95 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Right side: Logo & Branding */}
          <div className="flex items-center gap-2 flex-row-reverse">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-sans relative">
              مسابقات
              <span className="absolute -top-1 -right-2 text-[10px] text-primary animate-pulse">★</span>
            </span>
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-secondary to-purple-600 shadow-md shadow-purple-500/20">
              <Trophy className="h-4.5 w-4.5 text-primary" />
            </div>
          </div>

          {/* Center side: Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(link.id);
                }}
                className={`relative px-1 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === link.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full shadow-lg shadow-primary/50" />
                )}
              </a>
            ))}
          </div>

          {/* Left side: Action Buttons + Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#201047] dark:bg-[#201047] hover:bg-[#2d1861] text-white hover:text-white transition-all duration-200 cursor-pointer shadow-sm text-sm font-semibold border border-purple-950/20">
              <User className="h-4 w-4 text-purple-300" />
              <span>تسجيل دخول</span>
            </button>

            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md shadow-primary/20 cursor-pointer">
              <UserPlus className="h-4 w-4" />
              <span>إنشاء حساب</span>
            </button>
          </div>

          {/* Mobile responsive: Menu & Toggle button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer border border-border/40"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sidebar Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-border/10 bg-background px-4 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(link.id);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors duration-200 ${
                  activeTab === link.id
                    ? "bg-primary/10 text-primary border-r-4 border-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="border-t border-border/15 pt-4 flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#201047] text-white hover:bg-[#2d1861] transition-all cursor-pointer border border-purple-950/20 text-base font-semibold">
              <User className="h-5 w-5 text-purple-300" />
              تسجيل دخول
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all shadow-md shadow-primary/25 cursor-pointer">
              <UserPlus className="h-5 w-5" />
              إنشاء حساب
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
