"use client";

import { useState } from "react";
import { Gamepad2, ChevronLeft, Sparkles, Calendar, BookOpen, Laptop, Brain } from "lucide-react";
import CompetitionCard from "./CompetitionCard";

const categories = [
  { id: "all", label: "الكل", icon: Sparkles },
  { id: "weekly", label: "أسبوعية", icon: Calendar },
  { id: "cultural", label: "ثقافية", icon: BookOpen },
  { id: "tech", label: "تقنية", icon: Laptop },
  { id: "iq", label: "ذكاء", icon: Brain },
];

const cardsData = [
  {
    tag: "يومية",
    title: "سؤال اليوم",
    subtitle: "أختبر معلوماتك العامة وتحدّى نفسك",
    participants: "1,240 مشارك",
    time: "08:45:12",
    prizePoints: "100 نقطة",
    image: "/images/card_question.png",
    theme: "blue" as const,
    category: "cultural",
  },
  {
    tag: "أسبوعية",
    title: "كويز الأسبوع",
    subtitle: "أسئلة متنوعة وشاملة في جميع المجالات",
    participants: "3,572 مشارك",
    time: "2 يوم",
    prizePoints: "500 نقطة",
    image: "/images/card_quiz.png",
    theme: "purple" as const,
    category: "weekly",
  },
  {
    tag: "ألعاب",
    title: "تحدي اللاعبين",
    subtitle: "تنافس مع اللاعبين الآخرين واربح الصدارة",
    participants: "2,318 مشارك",
    time: "09:12:44",
    prizePoints: "1000 نقطة",
    image: "/images/card_gamepad.png",
    theme: "green" as const,
    category: "tech",
  },
  {
    tag: "ذكاء",
    title: "اختبر ذكاءك",
    subtitle: "مجموعة ألغاز وأفكار شيقة لتحدي عقلك",
    participants: "3,798 مشارك",
    time: "1 يوم 06:25:10",
    prizePoints: "300 نقطة",
    image: "/images/card_brain.png",
    theme: "red" as const,
    category: "iq",
  },
];

export default function CompetitionsSection() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCards = activeTab === "all"
    ? cardsData
    : cardsData.filter((card) => card.category === activeTab);

  return (
    <section className="w-full flex flex-col gap-6 select-none">
      
      {/* Header section: Title & View All */}
      <div className="flex items-center justify-between w-full">
        
        {/* Left side: View All Link */}
        <a
          href="#"
          className="group flex items-center gap-1 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          <span>عرض الكل</span>
          <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        </a>

        {/* Right side: Title & Icon */}
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            المسابقات المميزة
          </h2>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/20 border border-secondary/20">
            <Gamepad2 className="h-5 w-5 text-secondary dark:text-purple-300 animate-pulse" />
          </div>
        </div>

      </div>

      {/* Tabs Filter section */}
      <div className="flex items-center justify-end w-full overflow-x-auto pb-2 scrollbar-none gap-2 sm:gap-3" dir="rtl">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/10"
                  : "bg-card border-border hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, idx) => (
            <div
              key={idx}
              className="animate-in fade-in duration-300 slide-in-from-bottom-3"
              style={{ animationDelay: `${idx * 75}ms` }}
            >
              <CompetitionCard {...card} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-center text-muted-foreground bg-card border border-border border-dashed rounded-3xl">
            <span className="text-4xl">🔍</span>
            <p className="mt-2 text-base font-semibold">لا توجد مسابقات متاحة في هذا التصنيف حالياً</p>
          </div>
        )}
      </div>

    </section>
  );
}
