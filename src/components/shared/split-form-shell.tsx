"use client";

import type { ReactNode } from "react";

export function SplitFormShell({
  form,
  preview,
}: {
  form: ReactNode;
  preview: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="flex min-w-0 flex-[3] flex-col lg:flex-[5]">{form}</div>
      <div className="sticky top-0 hidden h-screen min-w-[360px] flex-[2] shrink-0 lg:block xl:min-w-[400px]">
        {preview}
      </div>
    </div>
  );
}

export function SplitFormBody({ children }: { children: ReactNode }) {
  return <div className="flex-1 overflow-y-auto px-8 py-8 lg:px-12 lg:py-10">{children}</div>;
}

export function SplitFormFooter({ children }: { children: ReactNode }) {
  return (
    <div className="shrink-0 border-t border-neutral-200 bg-white px-8 py-6 lg:px-12">
      <div className="max-w-2xl">{children}</div>
    </div>
  );
}
