import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dataProvider } from "@/lib/dataProvider";
import { Trophy, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerMatchHistoryProps {
  playerId: string;
}

export const PlayerMatchHistory = ({ playerId }: PlayerMatchHistoryProps) => {
  const matchStats = dataProvider.getPlayerMatchStats(playerId);
  
  const getPerformanceColor = (rating: number) => {
    if (rating >= 7.5) return 'text-green-500';
    if (rating >= 6.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <h3 className="text-lg font-semibold mb-4">Historique des matchs (20 derniers)</h3>
      
      <div className="space-y-3">
        {matchStats.slice(0, 10).map((stat) => {
          const match = dataProvider.getMatch(stat.matchId);
          if (!match) return null;

          return (
            <div
              key={stat.matchId}
              className="p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">
                    {match.result === 'W' ? 'V' : match.result === 'D' ? 'N' : 'D'}
                  </Badge>
                  <div className="text-sm">
                    <div className="font-semibold">vs {match.opponent}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(match.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short'
                      })}
                      <Trophy className="h-3 w-3 ml-2" />
                      {dataProvider.getCompetitionLabel(match.competition)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn("text-2xl font-bold", getPerformanceColor(stat.rating))}>
                    {stat.rating.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">Note</div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3 text-sm">
                <div className="text-center">
                  <div className="font-bold text-secondary">{stat.goals}</div>
                  <div className="text-xs text-muted-foreground">Buts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-accent">{stat.assists}</div>
                  <div className="text-xs text-muted-foreground">Passes D.</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{stat.passAccuracy.toFixed(0)}%</div>
                  <div className="text-xs text-muted-foreground">Passes</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{stat.tackles}</div>
                  <div className="text-xs text-muted-foreground">Tacles</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{stat.minutesPlayed}'</div>
                  <div className="text-xs text-muted-foreground">Min</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
