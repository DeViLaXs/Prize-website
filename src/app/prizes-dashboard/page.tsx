"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import {
  Trophy,
  Plus,
  Search,
  ArrowUpDown,
  Loader2,
  X,
  TrendingUp,
  Award,
  Users,
  Coins,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import ThemeToggle from "../home/_components/ThemeToggle";

interface Prize {
  id: string;
  winnerName: string;
  prizeValue: string;
  gameName: string;
  date: string;
  status: "pending" | "completed" | "cancelled";
}

const INITIAL_PRIZES: Prize[] = [
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

// Simulated client-side API helper functions using localStorage
const getLocalPrizes = async (): Promise<Prize[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // simulate network delay
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("prizes_db");
    if (data) {
      return JSON.parse(data);
    }
    localStorage.setItem("prizes_db", JSON.stringify(INITIAL_PRIZES));
  }
  return INITIAL_PRIZES;
};

const saveLocalPrize = async (
  newPrize: Omit<Prize, "id" | "date">
): Promise<Prize> => {
  await new Promise((resolve) => setTimeout(resolve, 600)); // simulate network delay
  const prizes = await getLocalPrizes();
  const created: Prize = {
    ...newPrize,
    id: Math.random().toString(36).substring(2, 9),
    date: new Date().toISOString().split("T")[0],
  };
  const updated = [created, ...prizes];
  if (typeof window !== "undefined") {
    localStorage.setItem("prizes_db", JSON.stringify(updated));
  }
  return created;
};

export default function PrizesDashboard() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // TanStack Query: Fetch Prizes from client storage
  const {
    data: prizes = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Prize[]>({
    queryKey: ["prizes"],
    queryFn: getLocalPrizes,
  });

  // TanStack Query: Create Prize Mutation in client storage
  const addPrizeMutation = useMutation({
    mutationFn: saveLocalPrize,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prizes"] });
    },
  });

  // TanStack Form definition
  const form = useForm({
    defaultValues: {
      winnerName: "",
      prizeValue: "",
      gameName: "",
      status: "pending" as "pending" | "completed" | "cancelled",
    },
    onSubmit: async ({ value }) => {
      try {
        await addPrizeMutation.mutateAsync(value);
        form.reset();
        setIsModalOpen(false);
      } catch (err) {
        console.error(err);
      }
    },
  });

  // TanStack Table Column definition
  const columnHelper = createColumnHelper<Prize>();
  const columns = [
    columnHelper.accessor("winnerName", {
      header: "اسم الفائز",
      cell: (info) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-secondary/20 to-purple-500/20 border border-purple-500/10 flex items-center justify-center text-secondary font-bold text-sm">
            {info.getValue().charAt(0)}
          </div>
          <span className="font-semibold text-foreground text-sm sm:text-base">
            {info.getValue()}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("gameName", {
      header: "اللعبة",
      cell: (info) => (
        <span className="text-muted-foreground bg-muted/60 dark:bg-muted/30 border border-border/10 px-3 py-1 rounded-lg text-xs font-semibold">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("prizeValue", {
      header: "قيمة الجائزة",
      cell: (info) => (
        <span className="text-primary font-bold tracking-wide text-sm sm:text-base flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-primary animate-pulse" />
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("date", {
      header: "التاريخ",
      cell: (info) => (
        <span className="text-muted-foreground text-xs font-medium">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "الحالة",
      cell: (info) => {
        const val = info.getValue();
        const statusMap = {
          completed: {
            text: "مكتمل",
            classes: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:text-emerald-400",
          },
          pending: {
            text: "قيد الانتظار",
            classes: "bg-amber-500/10 text-amber-500 border-amber-500/20 dark:text-amber-400",
          },
          cancelled: {
            text: "ملغي",
            classes: "bg-rose-500/10 text-rose-500 border-rose-500/20 dark:text-rose-400",
          },
        };
        const status = statusMap[val] || {
          text: val,
          classes: "bg-slate-500/10 text-slate-500 border-slate-500/20",
        };
        return (
          <span
            className={`px-3 py-1 rounded-lg border text-xs font-bold ${status.classes}`}
          >
            {status.text}
          </span>
        );
      },
    }),
  ];

  // TanStack Table Instance
  const table = useReactTable({
    data: prizes,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  // Calculate quick stats from current prizes
  const totalPrizesCount = prizes.length;
  const pendingPrizesCount = prizes.filter((p) => p.status === "pending").length;
  const completedPrizesCount = prizes.filter((p) => p.status === "completed").length;
  const totalPrizeAmount = prizes
    .filter((p) => p.status === "completed")
    .reduce((acc, curr) => {
      const match = curr.prizeValue.match(/\d+/);
      return acc + (match ? parseInt(match[0], 10) : 0);
    }, 0);

  return (
    <div
      className="min-h-screen w-full bg-background text-foreground transition-colors duration-300 flex flex-col font-sans"
      dir="rtl"
    >
      {/* Mini Header / Dashboard Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/10 bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 text-sm font-semibold"
              >
                <ArrowLeft className="h-4 w-4 rotate-180" />
                <span>الرئيسية</span>
              </Link>
              <div className="h-4 w-px bg-border/20" />
              <span className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                لوحة تحكم الجوائز
              </span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 md:gap-10 animate-in fade-in duration-500">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/10 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              إدارة الجوائز والفائزين
            </h1>
            <p className="text-muted-foreground text-sm mt-1.5">
              استعرض الفائزين، قم بتحديث الحالات، وأضف جوائز جديدة باستخدام TanStack.
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm sm:text-base hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md shadow-primary/25 cursor-pointer"
            >
              <Plus className="h-5 w-5" />
              <span>إضافة فائز جديد</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border/40 shadow-sm flex items-center justify-between">
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-xs sm:text-sm font-medium font-sans">مجموع الجوائز الموزعة</p>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                {isLoading ? "..." : `${totalPrizeAmount} $`}
              </h3>
            </div>
            <div className="p-3.5 rounded-xl bg-primary/10 text-primary">
              <Coins className="h-6 w-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/40 shadow-sm flex items-center justify-between">
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-xs sm:text-sm font-medium">عدد الفائزين المسجلين</p>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                {isLoading ? "..." : totalPrizesCount}
              </h3>
            </div>
            <div className="p-3.5 rounded-xl bg-secondary/10 text-secondary">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/40 shadow-sm flex items-center justify-between">
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-xs sm:text-sm font-medium font-sans">عمليات مكتملة</p>
              <h3 className="text-xl sm:text-2xl font-black text-emerald-500">
                {isLoading ? "..." : completedPrizesCount}
              </h3>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-500">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/40 shadow-sm flex items-center justify-between">
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-xs sm:text-sm font-medium">طلبات قيد المراجعة</p>
              <h3 className="text-xl sm:text-2xl font-black text-amber-500">
                {isLoading ? "..." : pendingPrizesCount}
              </h3>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-500">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/65 dark:bg-card/35 backdrop-blur-sm p-4 rounded-xl border border-border/30">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="ابحث باسم الفائز..."
              className="w-full pl-4 pr-10 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => refetch()}
              className="p-2.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              title="تحديث البيانات"
            >
              <Loader2 className={`h-4.5 w-4.5 ${isLoading ? "animate-spin text-primary" : ""}`} />
            </button>
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
              البيانات محفوظة محلياً
            </span>
          </div>
        </div>

        {/* Table Card */}
        <div className="w-full bg-card rounded-2xl border border-border/40 shadow-sm overflow-hidden transition-all duration-300">
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p className="text-muted-foreground text-sm font-semibold">جاري تحميل بيانات الفائزين...</p>
            </div>
          ) : isError ? (
            <div className="py-24 text-center">
              <p className="text-destructive font-semibold">حدث خطأ أثناء تحميل البيانات.</p>
              <button
                onClick={() => refetch()}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : prizes.length === 0 ? (
            <div className="py-24 text-center">
              <Trophy className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">لا توجد جوائز مسجلة حالياً.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="border-b border-border/40 bg-muted/40 dark:bg-muted/20"
                    >
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <div className="flex items-center gap-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <ArrowUpDown className="h-3 w-3 opacity-60 hover:opacity-100" />
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-border/20">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-muted/20 dark:hover:bg-muted/10 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-4.5 whitespace-nowrap align-middle"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border/40 bg-muted/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    عرض الصفحة{" "}
                    <span className="font-bold text-foreground">
                      {table.getState().pagination.pageIndex + 1}
                    </span>{" "}
                    من{" "}
                    <span className="font-bold text-foreground">
                      {table.getPageCount()}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="p-2 border border-border rounded-xl hover:bg-muted text-muted-foreground disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                  >
                    <ChevronRight className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="p-2 border border-border rounded-xl hover:bg-muted text-muted-foreground disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                  >
                    <ChevronLeft className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* TanStack Form Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#0a0118]/65 backdrop-blur-md transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-lg bg-card rounded-2xl border border-border/40 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-border/20 bg-muted/40">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                إضافة فائز جديد بالجوائز
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer border border-transparent hover:border-border/30"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="p-6 space-y-5"
            >
              {/* Winner Name Input */}
              <form.Field
                name="winnerName"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "اسم الفائز مطلوب";
                    if (value.length < 3) return "يجب أن يكون الاسم 3 أحرف على الأقل";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-1.5">
                    <label
                      htmlFor={field.name}
                      className="text-xs sm:text-sm font-semibold text-muted-foreground"
                    >
                      اسم الفائز بالكامل
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="أحمد محمد علي"
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                    {field.state.meta.isTouched && field.state.meta.errors.length ? (
                      <p className="text-xs text-rose-500 font-semibold mt-1">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {/* Game Name Select / Input */}
              <form.Field
                name="gameName"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "اسم اللعبة مطلوب";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-1.5">
                    <label
                      htmlFor={field.name}
                      className="text-xs sm:text-sm font-semibold text-muted-foreground"
                    >
                      اسم اللعبة / المسابقة
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">اختر مسابقة...</option>
                      <option value="عجلة الحظ">عجلة الحظ (Wheel of Fortune)</option>
                      <option value="تحدي الأسئلة">تحدي الأسئلة (Trivia Quiz)</option>
                      <option value="مسابقة التخمين">مسابقة التخمين (Guessing Game)</option>
                      <option value="البطولة الكبرى">البطولة الكبرى (Grand Tournament)</option>
                    </select>
                    {field.state.meta.isTouched && field.state.meta.errors.length ? (
                      <p className="text-xs text-rose-500 font-semibold mt-1">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {/* Prize Value Input */}
              <form.Field
                name="prizeValue"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "قيمة الجائزة مطلوبة";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-1.5">
                    <label
                      htmlFor={field.name}
                      className="text-xs sm:text-sm font-semibold text-muted-foreground"
                    >
                      قيمة الجائزة المادية
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">حدد الجائزة...</option>
                      <option value="100 $">100 $</option>
                      <option value="250 $">250 $</option>
                      <option value="500 $">500 $</option>
                      <option value="1000 $">1000 $</option>
                      <option value="2500 $">2500 $</option>
                    </select>
                    {field.state.meta.isTouched && field.state.meta.errors.length ? (
                      <p className="text-xs text-rose-500 font-semibold mt-1">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {/* Status Select */}
              <form.Field
                name="status"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "حالة المعاملة مطلوبة";
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-1.5">
                    <label
                      htmlFor={field.name}
                      className="text-xs sm:text-sm font-semibold text-muted-foreground"
                    >
                      الحالة الأولية
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value as "pending" | "completed" | "cancelled"
                        )
                      }
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="pending">قيد الانتظار</option>
                      <option value="completed">مكتمل</option>
                    </select>
                    {field.state.meta.isTouched && field.state.meta.errors.length ? (
                      <p className="text-xs text-rose-500 font-semibold mt-1">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-border/20 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-border rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-all cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={addPrizeMutation.isPending}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl text-sm hover:bg-primary/90 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {addPrizeMutation.isPending ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      <span>جاري الحفظ...</span>
                    </>
                  ) : (
                    <span>إضافة الفائز</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
