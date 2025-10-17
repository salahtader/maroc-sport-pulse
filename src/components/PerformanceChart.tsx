import { Card } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { dataProvider, CompetitionType, PeriodType } from "@/lib/dataProvider";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface PerformanceChartProps {
  competition: string;
  period: string;
}

export const PerformanceChart = ({ competition, period }: PerformanceChartProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleLines, setVisibleLines] = useState({
    seniorA: true,
    u23: true,
    u20: true,
  });

  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const newData = dataProvider.getPerformanceData(
        competition as CompetitionType,
        period as PeriodType
      );
      setData(newData);
      setLoading(false);
    }, 300);
  }, [competition, period]);

  const toggleLine = (dataKey: keyof typeof visibleLines) => {
    setVisibleLines(prev => ({ ...prev, [dataKey]: !prev[dataKey] }));
  };

  if (loading) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <Skeleton className="h-6 w-48 mb-6" />
        <Skeleton className="h-[300px] w-full" />
      </Card>
    );
  }
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">Évolution des Performances</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {dataProvider.getCompetitionLabel(competition as CompetitionType)} • {dataProvider.getPeriodLabel(period as PeriodType)}
          </p>
        </div>
      </div>
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
          {visibleLines.seniorA && (
            <Line
              type="monotone"
              dataKey="seniorA"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
              name="Équipe A"
              animationDuration={500}
            />
          )}
          {visibleLines.u23 && (
            <Line
              type="monotone"
              dataKey="u23"
              stroke="hsl(var(--secondary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--secondary))", r: 4 }}
              name="U23"
              animationDuration={500}
            />
          )}
          {visibleLines.u20 && (
            <Line
              type="monotone"
              dataKey="u20"
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--accent))", r: 4 }}
              name="U20"
              animationDuration={500}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-4">
        <button
          onClick={() => toggleLine('seniorA')}
          className={`flex items-center gap-2 cursor-pointer transition-opacity ${
            !visibleLines.seniorA ? 'opacity-40' : 'opacity-100'
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm">Équipe A</span>
        </button>
        <button
          onClick={() => toggleLine('u23')}
          className={`flex items-center gap-2 cursor-pointer transition-opacity ${
            !visibleLines.u23 ? 'opacity-40' : 'opacity-100'
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-sm">U23</span>
        </button>
        <button
          onClick={() => toggleLine('u20')}
          className={`flex items-center gap-2 cursor-pointer transition-opacity ${
            !visibleLines.u20 ? 'opacity-40' : 'opacity-100'
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-sm">U20</span>
        </button>
      </div>
    </Card>
  );
};
