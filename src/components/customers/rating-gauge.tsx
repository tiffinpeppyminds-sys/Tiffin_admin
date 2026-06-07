import { cn } from "@/lib/utils";

export function RatingGauge({ value, size = "lg" }: { value: number; size?: "lg" | "md" }) {
  const dash = (value / 100) * 50;
  const textSize = size === "lg" ? "text-3xl" : "text-2xl";

  return (
    <div className="flex flex-col items-center">
      <div className={cn("relative", size === "lg" ? "h-28 w-56" : "h-24 w-48")}>
        <svg viewBox="0 0 120 60" className="h-full w-full">
          <path
            d="M10 55 A50 50 0 0 1 110 55"
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M10 55 A50 50 0 0 1 110 55"
            fill="none"
            stroke="#e11900"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${dash} 100`}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 text-center">
          <p className={cn("font-bold text-black", textSize)}>{value}%</p>
          <p className="text-xs text-neutral-500">Average rating</p>
        </div>
      </div>
    </div>
  );
}
