import { Card } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { dataProvider, CompetitionType } from "@/lib/dataProvider";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TeamComparisonProps {
  competition: string;
  period: string;
}

export const TeamComparison = ({ competition }: TeamComparisonProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const newData = dataProvider.getComparisonData(competition as CompetitionType);
      setData(newData);
      setLoading(false);
    }, 300);
  }, [competition]);

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
      <h3 className="text-xl font-bold mb-2">Comparaison par Compétition</h3>
      <p className="text-sm text-muted-foreground mb-6">
        CAN 2024 vs Qualifications Mondial
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="category"
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
          <Bar
            dataKey="value"
            fill="hsl(var(--primary))"
            radius={[8, 8, 0, 0]}
            name="CAN 2024"
          />
          <Bar
            dataKey="comparison"
            fill="hsl(var(--secondary))"
            radius={[8, 8, 0, 0]}
            name="Qualif. Mondial"
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm">CAN 2024</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-sm">Qualif. Mondial</span>
        </div>
      </div>
    </Card>
  );
};
