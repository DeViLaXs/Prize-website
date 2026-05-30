"use client";

import { Users2, Zap, Gift, Gamepad2 } from "lucide-react";

const infoItems = [
  {
    title: "مجتمع تفاعلي",
    desc: "تنافس وتواصل مع الآخرين",
    icon: Users2,
    iconColor: "text-purple-400 dark:text-purple-300",
  },
  {
    title: "تحديات يومية",
    desc: "تحديات جديدة كل يوم",
    icon: Zap,
    iconColor: "text-yellow-400 dark:text-yellow-300",
  },
  {
    title: "جوائز حصرية",
    desc: "جوائز قيمة بانتظار الفائزين",
    icon: Gift,
    iconColor: "text-amber-400 dark:text-amber-300",
  },
  {
    title: "مسابقات متنوعة",
    desc: "ألعاب، ثقافة، ذكاء والمزيد!",
    icon: Gamepad2,
    iconColor: "text-purple-400 dark:text-purple-300",
  },
];

export default function QuickInfo() {
  return (
    <div className="w-full rounded-3xl bg-[#12072e]/60 dark:bg-[#12072e]/60 border border-purple-950/40 shadow-xl shadow-black/10 p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-4 px-4 lg:justify-center select-none group border-purple-950/30 lg:border-l lg:last:border-l-0 lg:border-l-purple-950/40"
            >
              {/* Text side */}
              <div className="flex flex-col text-right">
                <h4 className="text-base font-bold text-white dark:text-white group-hover:text-primary transition-colors duration-200">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#a09cbe] mt-1 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Icon side - direct floating icon matching the image */}
              <Icon className={`h-8 w-8 shrink-0 ${item.iconColor} group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.3)] transition-all duration-300`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
