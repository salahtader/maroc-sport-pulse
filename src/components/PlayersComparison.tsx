import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dataProvider } from "@/lib/dataProvider";
import { X, TrendingUp, TrendingDown, Minus, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PlayersComparisonProps {
  playerIds: string[];
  onClose: () => void;
}

export const PlayersComparison = ({ playerIds, onClose }: PlayersComparisonProps) => {
  const players = playerIds.map(id => dataProvider.getPlayer(id)).filter(Boolean);
  const playersStats = playerIds.map(id => dataProvider.getPlayerStats(id)).filter(Boolean);

  if (players.length < 2) return null;

  const metrics = [
    { key: 'matchesPlayed', label: 'Matchs joués', maxValue: 15 },
    { key: 'minutesPlayed', label: 'Minutes', maxValue: 1200 },
    { key: 'goals', label: 'Buts', maxValue: 10 },
    { key: 'assists', label: 'Passes D.', maxValue: 10 },
    { key: 'xG', label: 'xG', maxValue: 8 },
    { key: 'shotsOnTarget', label: 'Tirs cadrés', maxValue: 25 },
    { key: 'keyPasses', label: 'Passes clés', maxValue: 30 },
    { key: 'dribblesSuccess', label: 'Dribbles réussis', maxValue: 40 },
    { key: 'tackles', label: 'Tacles', maxValue: 40 },
    { key: 'interceptions', label: 'Interceptions', maxValue: 30 },
    { key: 'passAccuracy', label: 'Précision passes (%)', maxValue: 100 },
    { key: 'duelsWon', label: 'Duels gagnés', maxValue: 100 },
  ];

  const getComparisonIcon = (playerIndex: number, metricKey: string) => {
    const values = playersStats.map(stat => {
      const value = stat?.[metricKey as keyof typeof stat];
      return typeof value === 'number' ? value : 0;
    });
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const currentValue = values[playerIndex];

    if (currentValue === maxValue && maxValue !== minValue) {
      return <TrendingUp className="h-4 w-4 text-secondary" />;
    } else if (currentValue === minValue && maxValue !== minValue) {
      return <TrendingDown className="h-4 w-4 text-destructive" />;
    }
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <Card className="p-6 mb-6 bg-card/50 backdrop-blur-sm border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Comparaison des Joueurs</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Players Headers */}
      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}>
        {players.map((player) => (
          <Card key={player!.id} className="p-4 bg-muted/30">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                {player!.photo ? (
                  <img src={player!.photo} alt={player!.name} className="h-16 w-16 rounded-full object-cover" />
                ) : (
                  <User className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{player!.name}</h3>
                <Badge variant="outline" className="mb-1">#{player!.number}</Badge>
                <p className="text-xs text-muted-foreground">{player!.club}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Metrics Comparison */}
      <div className="space-y-6">
        {metrics.map((metric) => {
          const values = playersStats.map(stat => {
            const value = stat?.[metric.key as keyof typeof stat];
            return typeof value === 'number' ? value : 0;
          });
          
          const maxValueForMetric = Math.max(...values, metric.maxValue);
          
          return (
            <div key={metric.key}>
              <h4 className="font-medium mb-3 text-sm text-muted-foreground">{metric.label}</h4>
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}>
                {values.map((value, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{typeof value === 'number' ? value.toFixed(metric.key.includes('Accuracy') || metric.key.includes('xG') || metric.key.includes('xA') ? 1 : 0) : value}</span>
                      {getComparisonIcon(idx, metric.key)}
                    </div>
                    <Progress value={(value / maxValueForMetric) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
