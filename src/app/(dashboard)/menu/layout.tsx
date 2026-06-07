import { MenuShell } from "@/components/menu/menu-shell";

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <MenuShell>{children}</MenuShell>;
}
