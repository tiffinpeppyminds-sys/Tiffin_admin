import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center px-4 py-12">
      <Card className="w-full overflow-hidden">
        <div className="premium-gradient h-2 w-full" />
        <CardHeader>
          <CardTitle className="text-4xl">TIFFIN FINDER Admin Suite</CardTitle>
          <CardDescription>
            Next.js control center with Super Admin access, admin management, and complete app operations modules.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-sm text-black dark:text-slate-400">
            Includes: provider approvals, user moderation, complaints, reports, notification monitoring, and full flow
            mapping for public, customer, and business journeys.
          </p>
          <div className="flex gap-3">
            <Link href="/login">
              <Button>
                Open Login <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary">Skip to Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
