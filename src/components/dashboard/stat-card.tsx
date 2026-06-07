import { TrendingDown, TrendingUp } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  trend: string;
};

export function StatCard({ label, value, trend }: StatCardProps) {
  const isNegative = trend.trim().startsWith("-");

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-300">
      <p className="text-sm font-medium text-neutral-500">{label}</p>
      <p className="mt-2 kpi-value-lg">{value}</p>
      <p
        className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${
          isNegative ? "text-[#cc1700]" : "text-[#048a48]"
        }`}
      >
        {isNegative ? <TrendingDown className="size-3.5" /> : <TrendingUp className="size-3.5" />}
        {trend}
      </p>
    </div>
  );
}
