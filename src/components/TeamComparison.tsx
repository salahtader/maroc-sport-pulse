import { Card } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const allData = {
  can: [
    { category: "Possession", value: 65, comparison: 60 },
    { category: "Passes", value: 92, comparison: 85 },
    { category: "Tirs", value: 78, comparison: 70 },
    { category: "Défense", value: 88, comparison: 82 },
  ],
  mondial: [
    { category: "Possession", value: 62, comparison: 58 },
    { category: "Passes", value: 88, comparison: 80 },
    { category: "Tirs", value: 75, comparison: 68 },
    { category: "Défense", value: 85, comparison: 78 },
  ],
  amical: [
    { category: "Possession", value: 58, comparison: 55 },
    { category: "Passes", value: 82, comparison: 76 },
    { category: "Tirs", value: 70, comparison: 65 },
    { category: "Défense", value: 80, comparison: 75 },
  ],
  all: [
    { category: "Possession", value: 58, comparison: 52 },
    { category: "Passes", value: 85, comparison: 78 },
    { category: "Tirs", value: 72, comparison: 68 },
    { category: "Défense", value: 88, comparison: 80 },
  ],
};

interface TeamComparisonProps {
  competition: string;
  period: string;
}

export const TeamComparison = ({ competition }: TeamComparisonProps) => {
  const data = allData[competition as keyof typeof allData] || allData.all;
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
