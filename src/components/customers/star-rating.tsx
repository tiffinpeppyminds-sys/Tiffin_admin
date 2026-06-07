import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  value,
  size = "sm",
  precise = false,
}: {
  value: number;
  size?: "sm" | "md";
  precise?: boolean;
}) {
  const iconSize = size === "md" ? "size-5" : "size-4";

  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const fillLevel = precise ? Math.min(Math.max(value - i, 0), 1) : i < Math.floor(value) ? 1 : 0;
        const isFull = fillLevel >= 1;
        const isHalf = precise && fillLevel > 0 && fillLevel < 1;

        return (
          <span key={i} className="relative inline-flex">
            <Star className={cn(iconSize, "fill-neutral-200 text-neutral-200")} />
            {isFull || isHalf ? (
              <span className={cn("absolute inset-0 overflow-hidden", isHalf && "w-[50%]")}>
                <Star className={cn(iconSize, "fill-[#ffc043] text-[#ffc043]")} />
              </span>
            ) : null}
          </span>
        );
      })}
    </span>
  );
}
