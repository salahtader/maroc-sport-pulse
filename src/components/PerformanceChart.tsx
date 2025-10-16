import { Card } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const allData = {
  can: [
    { month: "Jan", seniorA: 82, u23: 75, u20: 68 },
    { month: "Fév", seniorA: 85, u23: 78, u20: 72 },
    { month: "Mar", seniorA: 88, u23: 80, u20: 75 },
    { month: "Avr", seniorA: 90, u23: 82, u20: 78 },
  ],
  mondial: [
    { month: "Jan", seniorA: 75, u23: 68, u20: 62 },
    { month: "Fév", seniorA: 78, u23: 70, u20: 65 },
    { month: "Mar", seniorA: 82, u23: 72, u20: 68 },
    { month: "Avr", seniorA: 85, u23: 75, u20: 70 },
    { month: "Mai", seniorA: 88, u23: 78, u20: 73 },
    { month: "Jun", seniorA: 84, u23: 76, u20: 71 },
  ],
  amical: [
    { month: "Jan", seniorA: 70, u23: 65, u20: 60 },
    { month: "Fév", seniorA: 73, u23: 67, u20: 62 },
    { month: "Mar", seniorA: 76, u23: 70, u20: 65 },
    { month: "Avr", seniorA: 78, u23: 72, u20: 67 },
  ],
  all: [
    { month: "Jan", seniorA: 85, u23: 78, u20: 72 },
    { month: "Fév", seniorA: 88, u23: 80, u20: 75 },
    { month: "Mar", seniorA: 82, u23: 83, u20: 78 },
    { month: "Avr", seniorA: 90, u23: 85, u20: 80 },
    { month: "Mai", seniorA: 92, u23: 87, u20: 82 },
    { month: "Jun", seniorA: 89, u23: 88, u20: 85 },
  ],
};

interface PerformanceChartProps {
  competition: string;
  period: string;
}

export const PerformanceChart = ({ competition }: PerformanceChartProps) => {
  const data = allData[competition as keyof typeof allData] || allData.all;
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <h3 className="text-xl font-bold mb-6">Évolution des Performances</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="seniorA"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", r: 4 }}
            name="Équipe A"
          />
          <Line
            type="monotone"
            dataKey="u23"
            stroke="hsl(var(--secondary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--secondary))", r: 4 }}
            name="U23"
          />
          <Line
            type="monotone"
            dataKey="u20"
            stroke="hsl(var(--accent))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--accent))", r: 4 }}
            name="U20"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm">Équipe A</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-sm">U23</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-sm">U20</span>
        </div>
      </div>
    </Card>
  );
};
