import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  trend: string;
};

export function StatCard({ label, value, trend }: StatCardProps) {
  const isNegative = trend.trim().startsWith("-");

  return (
    <Card className="relative overflow-hidden border border-blue-100/80 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-blue-900/40 dark:bg-slate-950/70">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-800 via-blue-500 to-blue-900 dark:from-blue-600 dark:via-blue-500 dark:to-blue-800" />
      <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-blue-50/80 dark:bg-blue-950/40" />
      <CardHeader>
        <CardTitle className="heading-classic text-[15px] font-semibold text-black dark:text-slate-200">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="heading-classic text-3xl font-semibold text-black dark:text-slate-100">{value}</p>
        <p
          className={`mt-2 inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
            isNegative
              ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
              : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
          }`}
        >
          {isNegative ? <TrendingDown className="mr-1 size-3.5" /> : <TrendingUp className="mr-1 size-3.5" />}
          {trend}
        </p>
      </CardContent>
    </Card>
  );
}
