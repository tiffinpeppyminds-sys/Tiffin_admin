"use client";

import { useState } from "react";
import Link from "next/link";
import { Banknote, Laptop, Percent, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Percent,
    title: "Quick and easy set-up",
    body: "With just a few clicks, you can start accepting orders from your restaurant website. No additional steps are needed to set up your menu or to figure out how the order gets to your customer.",
  },
  {
    icon: Laptop,
    title: "Your site, your brand",
    body: "We automatically create an ordering page for you after sign-up. Customise it with your logo, banners, colours and even a URL to build an experience your customers feel confident ordering from again and again.",
  },
  {
    icon: Star,
    title: "Your customers, your site",
    body: "Reach out to your customers and let them know of the new way to easily order from their favourite restaurant, through your existing website, app or social media page.",
  },
];

const steps = [
  {
    n: 1,
    title: "Share your page",
    body: "Be ready to accept orders in minutes by adding your ordering page to your website, social media account and more. We'll show you how.",
  },
  {
    n: 2,
    title: "Tell your customers",
    body: "Your ordering page works automatically. Just let your customers know where to go through email, social media or messaging app.",
  },
  {
    n: 3,
    title: "Start selling",
    body: "No new tools and no changes to your operations. Customers can order from the menu you've already created and can checkout from your website.",
  },
];

const fees = [
  { label: "Tiffin Finder delivery option", value: "25%" },
  { label: "Self-delivery option", value: "6%" },
  { label: "Pick-up option", value: "6%" },
  { label: "Dine-in option", value: "3%" },
];

export default function WebshopPage() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="page-title">Webshop</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-600">
          Allow your customers to place orders for delivery and pick-up right from your website or social media account.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-black">Run your restaurant&apos;s Webshop your way</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[#e6f9ee]">
                <Icon className="size-5 text-[#06c167]" />
              </div>
              <h3 className="font-semibold text-black">{title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-neutral-200">
        <div className="grid lg:grid-cols-2">
          <div className="space-y-6 p-6 lg:p-8">
            <h2 className="text-xl font-bold text-black">After you sign up</h2>
            {steps.map((step) => (
              <div key={step.n} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-semibold text-black">{step.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center bg-neutral-100 p-8">
            <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-4 shadow-lg">
              <div className="mb-3 h-32 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100" />
              <div className="space-y-2">
                <div className="h-3 w-3/4 rounded bg-neutral-200" />
                <div className="h-3 w-1/2 rounded bg-neutral-100" />
                <div className="mt-4 h-8 rounded-lg bg-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-black">What you&apos;ll pay</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200">
          <div className="border-b border-neutral-200 px-5 py-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-black">
              <Banknote className="size-4" />
              Tiffin Finder fee
            </p>
          </div>
          {fees.map((fee, idx) => (
            <div
              key={fee.label}
              className={`flex items-center justify-between px-5 py-3 ${idx > 0 ? "border-t border-neutral-100" : ""}`}
            >
              <span className="text-sm text-neutral-600">{fee.label}</span>
              <span className="text-sm font-semibold text-black">{fee.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-neutral-500">
          These fees apply to the Webshop Sales Channel. Pricing changes will be notified in advance.{" "}
          <Link href="/payments" className="font-medium text-black underline">
            Click here for the current fees.
          </Link>
        </p>
        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-black">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="size-4 rounded border-neutral-300 accent-black"
          />
          I accept the{" "}
          <Link href="/settings" className="font-medium underline">
            Terms &amp; Conditions
          </Link>
        </label>
        <Button className="mt-4" disabled={!accepted}>
          Sign up
        </Button>
      </section>
    </div>
  );
}
