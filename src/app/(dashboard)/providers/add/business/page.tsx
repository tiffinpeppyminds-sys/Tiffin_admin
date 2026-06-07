import { Suspense } from "react";
import { BusinessForm } from "@/components/shops/business-form";

export default function BusinessInfoPage() {
  return (
    <Suspense fallback={<div className="px-6 py-16 text-sm text-neutral-500">Loading...</div>}>
      <BusinessForm />
    </Suspense>
  );
}
