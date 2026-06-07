"use client";

export function RecommendationPreview({ type }: { type: "ad" | "offer" }) {
  return (
    <div className="flex h-44 items-center justify-center bg-[#f3f3f3]">
      <div className="w-[100px] rounded-[20px] border-[4px] border-black bg-black p-1 shadow-md">
        <div className="overflow-hidden rounded-[16px] bg-white">
          <div
            className={
              type === "ad"
                ? "h-16 bg-gradient-to-br from-amber-200 to-orange-300"
                : "relative h-16 bg-gradient-to-br from-amber-200 to-orange-300"
            }
          >
            {type === "offer" ? (
              <span className="absolute left-1 top-1 rounded bg-[#e11900] px-1 py-0.5 text-[7px] font-bold text-white">
                Save
              </span>
            ) : null}
          </div>
          <div className="space-y-0.5 px-2 py-1.5">
            <div className="h-1.5 w-12 rounded bg-neutral-200" />
            <div className="h-1 w-16 rounded bg-neutral-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
