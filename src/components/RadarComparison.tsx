import { Card } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { TeamType } from "@/lib/dataProvider";

const radarData = {
  seniorA: [
    { metric: "Attaque", value: 88, average: 75 },
    { metric: "Défense", value: 92, average: 80 },
    { metric: "Possession", value: 85, average: 78 },
    { metric: "Passes", value: 90, average: 82 },
    { metric: "Discipline", value: 78, average: 85 },
    { metric: "Physique", value: 86, average: 80 },
  ],
  u23: [
    { metric: "Attaque", value: 82, average: 75 },
    { metric: "Défense", value: 85, average: 80 },
    { metric: "Possession", value: 80, average: 78 },
    { metric: "Passes", value: 84, average: 82 },
    { metric: "Discipline", value: 75, average: 85 },
    { metric: "Physique", value: 88, average: 80 },
  ],
  u20: [
    { metric: "Attaque", value: 75, average: 75 },
    { metric: "Défense", value: 78, average: 80 },
    { metric: "Possession", value: 76, average: 78 },
    { metric: "Passes", value: 79, average: 82 },
    { metric: "Discipline", value: 70, average: 85 },
    { metric: "Physique", value: 82, average: 80 },
  ],
};

interface RadarComparisonProps {
  selectedTeam: TeamType;
}

export const RadarComparison = ({ selectedTeam }: RadarComparisonProps) => {
  const data = radarData[selectedTeam];

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <h3 className="text-xl font-bold mb-2">Analyse Multi-Critères</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Comparaison avec la moyenne continentale
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis 
            dataKey="metric" 
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          />
          <Radar
            name="Équipe"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="Moyenne"
            dataKey="average"
            stroke="hsl(var(--secondary))"
            fill="hsl(var(--secondary))"
            fillOpacity={0.2}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
};
