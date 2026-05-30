"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Trophy } from "lucide-react";

const slides = [
  {
    titleFirst: "اربح الجوائز",
    titleSecond: "واختبر مهاراتك!",
    description: "شارك في أمتع المسابقات اليومية والأسبوعية واربح جوائز حصرية بانتظارك",
    buttonText: "استعرض المسابقات",
    image: "/images/hero_trophy.png",
    glowClass: "from-cyan-500/25 via-purple-500/10 to-transparent",
    ringClass: "border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.65)]",
  },
  {
    titleFirst: "تحديات جديدة",
    titleSecond: "بانتظارك يومياً!",
    description: "تنافس مع أفضل اللاعبين في تحديات ألعاب وثقافة وذكاء مميزة وأثبت جدارتك",
    buttonText: "ابدأ اللعب الآن",
    image: "/images/card_gamepad.png",
    glowClass: "from-emerald-500/25 via-purple-500/10 to-transparent",
    ringClass: "border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.65)]",
  },
  {
    titleFirst: "كويزات وأسئلة",
    titleSecond: "تنمي قدراتك!",
    description: "اختبر معلوماتك العامة والثقافية واجمع النقاط لتتصدر قائمة المتنافسين",
    buttonText: "استكشف الكويزات",
    image: "/images/card_quiz.png",
    glowClass: "from-purple-500/25 via-pink-500/10 to-transparent",
    ringClass: "border-purple-400 shadow-[0_0_35px_rgba(192,132,252,0.65)]",
  },
  {
    titleFirst: "اختبر ذكاءك",
    titleSecond: "وتحدّى عقلك!",
    description: "ألغاز وأفكار شيقة بانتظار العقول المبدعة، حل المسائل واكسب جوائز قيمة",
    buttonText: "تحدّى ذكاءك",
    image: "/images/card_brain.png",
    glowClass: "from-red-500/25 via-purple-500/10 to-transparent",
    ringClass: "border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.65)]",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange((current + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [current]);

  const handleSlideChange = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 300);
  };

  const nextSlide = () => {
    handleSlideChange((current + 1) % slides.length);
  };

  const prevSlide = () => {
    handleSlideChange((current - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[current];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-tr from-[#170830] via-[#090117] to-[#220744] text-white p-6 sm:p-10 md:p-14 min-h-[380px] md:min-h-[460px] flex items-center shadow-2xl border border-purple-950/40">
      
      {/* Background spotlights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Exact image confetti positioning */}
      {/* Floating Yellow Star in the empty middle space */}
      <div className="absolute top-[20%] right-[32%] text-yellow-400 text-3xl sm:text-4xl select-none animate-pulse pointer-events-none drop-shadow-[0_0_12px_#ffc107]">★</div>
      
      {/* Confetti Ribbon (pink) above blue gift (left side) */}
      <div className="absolute top-[32%] left-[36%] text-pink-400 text-xl rotate-12 select-none animate-pulse pointer-events-none">✦</div>
      
      {/* Confetti Ribbon (orange/yellow) on right side */}
      <div className="absolute top-[35%] right-[15%] text-orange-400 text-2xl rotate-45 select-none animate-bounce pointer-events-none">✦</div>
      
      {/* Red confetti on the left near the dice */}
      <div className="absolute top-[18%] left-[7%] text-red-500 text-xs rotate-[-20deg] select-none animate-pulse pointer-events-none">■</div>
      
      {/* Yellow star confetti top-right */}
      <div className="absolute top-10 right-[25%] text-yellow-300 text-lg opacity-40 select-none animate-pulse pointer-events-none">★</div>
      
      {/* Blue confetti on the right side */}
      <div className="absolute bottom-[30%] right-[22%] text-cyan-400 text-sm select-none animate-ping pointer-events-none">✦</div>

      {/* Main Grid Content */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center">
        
        {/* Left Side (Visual Graphic) - Grid cols 5 */}
        <div className={`md:col-span-5 flex justify-center items-center relative transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}>
          {/* Glowing neon ring behind asset */}
          <div className={`absolute w-56 h-56 md:w-72 md:h-72 rounded-full border-2 bg-gradient-to-b ${activeSlide.glowClass} ${activeSlide.ringClass} flex items-center justify-center transition-all duration-500`} />

          {/* Asset Image */}
          <div className="relative z-10 w-52 h-52 md:w-72 md:h-72 transform hover:scale-[1.04] hover:rotate-1 transition-all duration-300 flex items-center justify-center">
            <Image
              src={activeSlide.image}
              alt="Slide Illustration"
              width={280}
              height={280}
              priority
              className="object-contain drop-shadow-[0_15px_22px_rgba(0,0,0,0.5)] max-h-full"
            />
          </div>
        </div>

        {/* Right Side (Arabic Text & Call To Action) - Grid cols 7 */}
        <div className={`md:col-span-7 flex flex-col items-start text-right select-none transition-all duration-300 ${
          isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black leading-[1.25] tracking-tight flex flex-col items-start text-white">
            <span>{activeSlide.titleFirst}</span>
            <span className="text-primary mt-1 drop-shadow-[0_0_15px_rgba(255,193,7,0.3)]">{activeSlide.titleSecond}</span>
          </h2>
          
          <p className="mt-5 text-[#c4bcdc] text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
            {activeSlide.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center w-full sm:w-auto">
            {/* The Text is on the right, Trophy Icon is on the left, fully filled with dark color */}
            <button className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/95 text-base md:text-lg font-bold hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/25 cursor-pointer">
              <span>{activeSlide.buttonText}</span>
              <Trophy className="h-5.5 w-5.5 text-primary-foreground fill-primary-foreground" />
            </button>
          </div>
        </div>

      </div>

      {/* Left/Right Carousel Control Chevrons (RTL aware layout direction) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/30 hover:bg-black/55 text-white/80 hover:text-white border border-white/10 hover:border-white/20 backdrop-blur-xs transition-all cursor-pointer z-20 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/30 hover:bg-black/55 text-white/80 hover:text-white border border-white/10 hover:border-white/20 backdrop-blur-xs transition-all cursor-pointer z-20 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Bottom Center Slide Pagination Indicator Dots (4 dots to match the image exactly) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              current === index ? "bg-primary shadow-[0_0_10px_#ffc107]" : "bg-[#251543] hover:bg-[#341d5e]"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
