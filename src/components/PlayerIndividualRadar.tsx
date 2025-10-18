import { Card } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { dataProvider, PlayerStats } from "@/lib/dataProvider";
import { Badge } from "@/components/ui/badge";

interface PlayerIndividualRadarProps {
  playerId: string;
}

export const PlayerIndividualRadar = ({ playerId }: PlayerIndividualRadarProps) => {
  const player = dataProvider.getPlayer(playerId);
  const stats = dataProvider.getPlayerStats(playerId);

  if (!player || !stats) return null;

  // Normalize stats to 0-100 scale based on realistic maximums
  const normalizeValue = (value: number, max: number) => {
    return Math.min((value / max) * 100, 100);
  };

  // Create radar data based on player position
  const getRadarData = (stats: PlayerStats, position: string) => {
    if (position === 'GK') {
      return [
        { 
          metric: "Arrêts", 
          value: normalizeValue(stats.saves || 0, 60),
          rawValue: stats.saves || 0
        },
        { 
          metric: "Relance", 
          value: stats.passAccuracy || 0,
          rawValue: `${stats.passAccuracy?.toFixed(1)}%`
        },
        { 
          metric: "Jeu au pied", 
          value: normalizeValue(stats.passesCompleted || 0, 300),
          rawValue: stats.passesCompleted || 0
        },
        { 
          metric: "Présence", 
          value: normalizeValue(stats.matchesPlayed || 0, 38),
          rawValue: stats.matchesPlayed || 0
        },
        { 
          metric: "Fiabilité", 
          value: normalizeValue((stats.cleanSheets || 0) / (stats.matchesPlayed || 1) * 100, 100),
          rawValue: `${((stats.cleanSheets || 0) / (stats.matchesPlayed || 1) * 100).toFixed(1)}%`
        },
        { 
          metric: "Duels aériens", 
          value: normalizeValue(stats.aerialWon || 0, 50),
          rawValue: stats.aerialWon || 0
        },
      ];
    } else if (position === 'DEF') {
      return [
        { 
          metric: "Défense", 
          value: normalizeValue((stats.tackles || 0) + (stats.interceptions || 0), 80),
          rawValue: (stats.tackles || 0) + (stats.interceptions || 0)
        },
        { 
          metric: "Duels", 
          value: normalizeValue(stats.duelsWon || 0, 100),
          rawValue: stats.duelsWon || 0
        },
        { 
          metric: "Passes", 
          value: stats.passAccuracy || 0,
          rawValue: `${stats.passAccuracy?.toFixed(1)}%`
        },
        { 
          metric: "Jeu aérien", 
          value: normalizeValue(stats.aerialWon || 0, 80),
          rawValue: stats.aerialWon || 0
        },
        { 
          metric: "Relance", 
          value: normalizeValue(stats.longBallsCompleted || 0, 40),
          rawValue: stats.longBallsCompleted || 0
        },
        { 
          metric: "Contribution offensive", 
          value: normalizeValue((stats.goals || 0) + (stats.assists || 0), 8),
          rawValue: (stats.goals || 0) + (stats.assists || 0)
        },
      ];
    } else if (position === 'MID') {
      return [
        { 
          metric: "Créativité", 
          value: normalizeValue((stats.assists || 0) + (stats.keyPasses || 0) / 3, 12),
          rawValue: stats.assists || 0
        },
        { 
          metric: "Passes", 
          value: stats.passAccuracy || 0,
          rawValue: `${stats.passAccuracy?.toFixed(1)}%`
        },
        { 
          metric: "Finition", 
          value: normalizeValue((stats.goals || 0) + (stats.xG || 0), 12),
          rawValue: stats.goals || 0
        },
        { 
          metric: "Dribbles", 
          value: normalizeValue(stats.dribblesSuccess || 0, 35),
          rawValue: stats.dribblesSuccess || 0
        },
        { 
          metric: "Récupération", 
          value: normalizeValue((stats.tackles || 0) + (stats.interceptions || 0), 50),
          rawValue: (stats.tackles || 0) + (stats.interceptions || 0)
        },
        { 
          metric: "Duels", 
          value: normalizeValue(stats.duelsWon || 0, 100),
          rawValue: stats.duelsWon || 0
        },
      ];
    } else { // ATT
      return [
        { 
          metric: "Finition", 
          value: normalizeValue((stats.goals || 0) + (stats.xG || 0), 15),
          rawValue: stats.goals || 0
        },
        { 
          metric: "Créativité", 
          value: normalizeValue((stats.assists || 0) + (stats.keyPasses || 0) / 3, 12),
          rawValue: stats.assists || 0
        },
        { 
          metric: "Dribbles", 
          value: normalizeValue(stats.dribblesSuccess || 0, 40),
          rawValue: stats.dribblesSuccess || 0
        },
        { 
          metric: "Tirs", 
          value: normalizeValue(stats.shotsOnTarget || 0, 40),
          rawValue: stats.shotsOnTarget || 0
        },
        { 
          metric: "Centres", 
          value: normalizeValue(stats.crossesCompleted || 0, 30),
          rawValue: stats.crossesCompleted || 0
        },
        { 
          metric: "Pressing", 
          value: normalizeValue((stats.tackles || 0) + (stats.duelsWon || 0) / 3, 40),
          rawValue: stats.tackles || 0
        },
      ];
    }
  };

  const radarData = getRadarData(stats, player.position);

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Profil de Performance</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Analyse multi-critères adaptée au poste de {dataProvider.getPositionLabel(player.position)}
        </p>
        <Badge 
          variant="outline"
          className="border-primary text-primary"
        >
          {player.name}
        </Badge>
      </div>

      <ResponsiveContainer width="100%" height={400}>
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
          <Radar
            name={player.name}
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.4}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: any, name: any, props: any) => [
              `${Number(value).toFixed(1)}/100 (${props.payload.rawValue})`,
              props.payload.metric
            ]}
          />
        </RadarChart>
      </ResponsiveContainer>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Les métriques sont normalisées sur 100 et adaptées selon le poste du joueur pour refléter les compétences clés requises.
        </p>
      </div>
    </Card>
  );
};
