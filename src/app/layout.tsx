import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Uber Move is proprietary; Inter is the closest open neo-grotesque substitute.
const uber = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-uber",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tiffin Finder Manager",
  description: "Manage your store, orders, menu, and performance on Tiffin Finder",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${uber.variable} font-sans`}>{children}</body>
    </html>
  );
}
