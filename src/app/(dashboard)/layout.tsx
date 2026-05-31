import { AuthGuard } from "@/components/auth/auth-guard";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <main className="mx-auto max-w-[1500px] p-4 lg:p-6">
        <div className="flex gap-6">
          <Sidebar />
          <div className="min-w-0 flex-1 pb-8">
            <Header />
            {children}
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
