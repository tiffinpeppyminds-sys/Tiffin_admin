"use client";

import { MessageCircle } from "lucide-react";

export function ChatWidget() {
  return (
    <button
      type="button"
      aria-label="Chat with support"
      className="fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center rounded-full bg-black text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" />
    </button>
  );
}
