import { Card } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { dataProvider } from "@/lib/dataProvider";
import { Badge } from "@/components/ui/badge";

interface PlayerRadarAnalysisProps {
  playerIds: string[];
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
];

export const PlayerRadarAnalysis = ({ playerIds }: PlayerRadarAnalysisProps) => {
  const players = playerIds.map(id => ({
    player: dataProvider.getPlayer(id),
    stats: dataProvider.getPlayerStats(id)
  })).filter(p => p.player && p.stats);

  if (players.length === 0) return null;

  // Normalize stats to 0-100 scale based on realistic maximums
  const normalizeValue = (value: number, max: number) => {
    return Math.min((value / max) * 100, 100);
  };

  // Create radar data with all players
  const metrics = [
    { key: "Finition", getValue: (stats: any) => normalizeValue((stats.goals || 0) + (stats.xG || 0), 15) },
    { key: "Créativité", getValue: (stats: any) => normalizeValue((stats.assists || 0) + (stats.keyPasses || 0) / 3, 12) },
    { key: "Dribbles", getValue: (stats: any) => normalizeValue(stats.dribblesSuccess || 0, 40) },
    { key: "Passes", getValue: (stats: any) => stats.passAccuracy || 0 },
    { key: "Défense", getValue: (stats: any) => normalizeValue((stats.tackles || 0) + (stats.interceptions || 0), 60) },
    { key: "Duels", getValue: (stats: any) => normalizeValue(stats.duelsWon || 0, 100) },
  ];

  const radarData = metrics.map(metric => {
    const dataPoint: any = { metric: metric.key };
    players.forEach((p, idx) => {
      dataPoint[`player${idx}`] = metric.getValue(p.stats);
    });
    return dataPoint;
  });

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border animate-fade-in">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Analyse Multi-Critères</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Comparaison des profils de jeu sur 6 dimensions clés
        </p>
        <div className="flex flex-wrap gap-2">
          {players.map((p, idx) => (
            <Badge 
              key={p.player!.id} 
              variant="outline"
              style={{ 
                borderColor: COLORS[idx],
                color: COLORS[idx]
              }}
            >
              {p.player!.name}
            </Badge>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={450}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis 
            dataKey="metric" 
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 13, fontWeight: 500 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          />
          {players.map((p, idx) => (
            <Radar
              key={p.player!.id}
              name={p.player!.name}
              dataKey={`player${idx}`}
              stroke={COLORS[idx]}
              fill={COLORS[idx]}
              fillOpacity={0.25}
              strokeWidth={2}
            />
          ))}
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

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Les valeurs sont normalisées sur 100 pour permettre la comparaison entre différentes métriques.
        </p>
      </div>
    </Card>
  );
};
