import { screenFlow } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ScreenFlowBoard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>TIFFIN FINDER App Flow Coverage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {screenFlow.map((stage) => (
          <div key={stage.stage} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="default">Stage {stage.stage}</Badge>
              <h3 className="text-sm font-semibold text-black">{stage.title}</h3>
            </div>
            <ul className="space-y-1 text-sm text-black">
              {stage.points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
