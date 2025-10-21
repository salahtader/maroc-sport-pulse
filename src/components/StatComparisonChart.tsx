import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface StatComparisonChartProps {
  title: string;
  data: { name: string; value1: number; value2?: number; label1?: string; label2?: string }[];
  colors?: { primary: string; secondary?: string };
}

export const StatComparisonChart = ({ 
  title, 
  data,
  colors = { primary: "#8b5cf6", secondary: "#06b6d4" }
}: StatComparisonChartProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/50">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            fontSize={12}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          {data[0]?.label2 && <Legend />}
          <Bar 
            dataKey="value1" 
            fill={colors.primary} 
            radius={[8, 8, 0, 0]}
            name={data[0]?.label1 || "Valeur"}
          />
          {data[0]?.value2 !== undefined && (
            <Bar 
              dataKey="value2" 
              fill={colors.secondary} 
              radius={[8, 8, 0, 0]}
              name={data[0]?.label2 || "Comparaison"}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
