import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Player } from "@/lib/dataProvider";
import { TrendingUp, Target, Activity, Shield } from "lucide-react";

interface PlayerStatsQuickViewProps {
  player: Player;
  stats: {
    goals: number;
    assists: number;
    rating: number;
    matchesPlayed: number;
  } | null;
}

export const PlayerStatsQuickView = ({ player, stats }: PlayerStatsQuickViewProps) => {
  if (!stats) return null;

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-secondary';
    if (rating >= 7) return 'text-accent';
    if (rating >= 6) return 'text-foreground';
    return 'text-muted-foreground';
  };

  return (
    <Card className="p-4 bg-gradient-card border-border hover:shadow-elevated transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg mb-1">{player.name}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              #{player.number}
            </Badge>
            <span className="text-xs text-muted-foreground">{player.club}</span>
          </div>
        </div>
        <div className={`text-3xl font-bold ${getRatingColor(stats.rating)}`}>
          {stats.rating.toFixed(1)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <Target className="h-4 w-4 mx-auto mb-1 text-primary" />
          <div className="font-bold text-sm">{stats.goals}</div>
          <div className="text-xs text-muted-foreground">Buts</div>
        </div>
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <Activity className="h-4 w-4 mx-auto mb-1 text-secondary" />
          <div className="font-bold text-sm">{stats.assists}</div>
          <div className="text-xs text-muted-foreground">Passes</div>
        </div>
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <Shield className="h-4 w-4 mx-auto mb-1 text-accent" />
          <div className="font-bold text-sm">{stats.matchesPlayed}</div>
          <div className="text-xs text-muted-foreground">Matchs</div>
        </div>
      </div>
    </Card>
  );
};
