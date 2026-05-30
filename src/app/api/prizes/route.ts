import { NextResponse } from "next/server";

// Simple in-memory mock database of winners/prizes
interface Prize {
  id: string;
  winnerName: string;
  prizeValue: string;
  gameName: string;
  date: string;
  status: "pending" | "completed" | "cancelled";
}

// Global variable to persist data during dev server lifecycle
let prizes: Prize[] = [
  {
    id: "1",
    winnerName: "أحمد محمد",
    prizeValue: "1000 $",
    gameName: "عجلة الحظ",
    date: "2026-05-28",
    status: "completed",
  },
  {
    id: "2",
    winnerName: "سارة عبد الله",
    prizeValue: "500 $",
    gameName: "تحدي الأسئلة",
    date: "2026-05-29",
    status: "pending",
  },
  {
    id: "3",
    winnerName: "خالد العتيبي",
    prizeValue: "2500 $",
    gameName: "مسابقة التخمين",
    date: "2026-05-30",
    status: "completed",
  },
  {
    id: "4",
    winnerName: "مريم علي",
    prizeValue: "150 $",
    gameName: "عجلة الحظ",
    date: "2026-05-30",
    status: "cancelled",
  },
  {
    id: "5",
    winnerName: "يوسف حسن",
    prizeValue: "2000 $",
    gameName: "البطولة الكبرى",
    date: "2026-05-30",
    status: "pending",
  },
];

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return NextResponse.json(prizes);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Simple validation
    if (!body.winnerName || !body.prizeValue || !body.gameName) {
      return NextResponse.json(
        { error: "winnerName, prizeValue, and gameName are required" },
        { status: 400 }
      );
    }

    const newPrize: Prize = {
      id: Math.random().toString(36).substr(2, 9),
      winnerName: body.winnerName,
      prizeValue: body.prizeValue,
      gameName: body.gameName,
      date: new Date().toISOString().split("T")[0],
      status: body.status || "pending",
    };

    prizes = [newPrize, ...prizes];

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(newPrize, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
