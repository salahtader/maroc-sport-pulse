import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Player, dataProvider } from "@/lib/dataProvider";
import { User, MapPin, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerCardProps {
  player: Player;
  onClick: () => void;
  isSelected?: boolean;
  compareMode?: boolean;
}

export const PlayerCard = ({ player, onClick, isSelected, compareMode }: PlayerCardProps) => {
  const stats = dataProvider.getPlayerStats(player.id);
  const positionColor = {
    GK: 'bg-accent/20 text-accent-foreground border-accent/30',
    DEF: 'bg-primary/20 text-primary-foreground border-primary/30',
    MID: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
    ATT: 'bg-chart-4/20 text-white border-chart-4/30',
  };

  return (
    <Card
      onClick={onClick}
      className={cn(
        "p-4 bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all duration-300 cursor-pointer group relative",
        isSelected && "ring-2 ring-primary shadow-glow-red",
        compareMode && "hover:ring-2 hover:ring-primary/50"
      )}
    >
      {isSelected && compareMode && (
        <div className="absolute -top-2 -right-2 z-10">
          <CheckCircle2 className="h-6 w-6 text-primary bg-background rounded-full" />
        </div>
      )}
      
      <div className="flex items-start gap-4 mb-4">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
          {player.photo ? (
            <img src={player.photo} alt={player.name} className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <User className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-sm truncate">{player.name}</h3>
            <Badge variant="outline" className="ml-2 flex-shrink-0">
              #{player.number}
            </Badge>
          </div>
          <Badge className={cn("text-xs mb-2", positionColor[player.position])}>
            {dataProvider.getPositionLabel(player.position)}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{player.club}</span>
          </div>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{stats.matchesPlayed}</div>
            <div className="text-xs text-muted-foreground">Matchs</div>
          </div>
          {player.position === 'GK' ? (
            <>
              <div className="text-center">
                <div className="text-lg font-bold text-secondary">{stats.cleanSheets}</div>
                <div className="text-xs text-muted-foreground">CS</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-accent">{stats.saves}</div>
                <div className="text-xs text-muted-foreground">Arrêts</div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="text-lg font-bold text-secondary">{stats.goals}</div>
                <div className="text-xs text-muted-foreground">Buts</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-accent">{stats.assists}</div>
                <div className="text-xs text-muted-foreground">Passes D.</div>
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  );
};
