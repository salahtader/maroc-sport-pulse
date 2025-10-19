import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player, dataProvider } from "@/lib/dataProvider";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PlayerIndividualRadar } from "@/components/PlayerIndividualRadar";
import { PlayerEvolutionChart } from "@/components/PlayerEvolutionChart";
import { PlayerMatchHistory } from "@/components/PlayerMatchHistory";
import { 
  User, MapPin, Trophy, TrendingUp, Target, Shield, 
  Activity, Zap, AlertCircle, Clock, Calendar
} from "lucide-react";

interface PlayerDetailsDialogProps {
  player: Player;
  onClose: () => void;
}

export const PlayerDetailsDialog = ({ player, onClose }: PlayerDetailsDialogProps) => {
  const stats = dataProvider.getPlayerStats(player.id);
  
  if (!stats) return null;

  const StatItem = ({ label, value, icon: Icon }: { label: string; value: string | number; icon: any }) => (
    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );

  const ProgressStat = ({ label, value, max, color = "bg-primary" }: { label: string; value: number; max: number; color?: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}/{max}</span>
      </div>
      <Progress value={(value / max) * 100} className="h-2" />
    </div>
  );

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4 mb-4">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              {player.photo ? (
                <img src={player.photo} alt={player.name} className="h-20 w-20 rounded-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{player.name}</DialogTitle>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className="text-sm">
                  #{player.number}
                </Badge>
                <Badge className="text-sm">
                  {dataProvider.getPositionLabel(player.position)}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  {player.age} ans
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{player.club}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  <span>{dataProvider.getTeamLabel(player.team)}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="radar">Radar</TabsTrigger>
            <TabsTrigger value="evolution">Évolution</TabsTrigger>
            <TabsTrigger value="matches">Matchs</TabsTrigger>
            <TabsTrigger value="offensive">Offensif</TabsTrigger>
            <TabsTrigger value="defensive">Défensif</TabsTrigger>
            <TabsTrigger value="passing">Passes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Performance Globale
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <StatItem label="Matchs joués" value={stats.matchesPlayed} icon={Calendar} />
                <StatItem label="Titularisations" value={stats.starts} icon={Trophy} />
                <StatItem label="Minutes jouées" value={`${stats.minutesPlayed}'`} icon={Clock} />
                <StatItem label="Minutes/Match" value={Math.round(stats.minutesPlayed / stats.matchesPlayed)} icon={TrendingUp} />
              </div>
            </Card>

            {player.position === 'GK' ? (
              <Card className="p-4 bg-card/50 backdrop-blur-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Statistiques Gardien
                </h3>
                <div className="space-y-4">
                  <ProgressStat label="Arrêts" value={stats.saves || 0} max={60} />
                  <ProgressStat label="Clean Sheets" value={stats.cleanSheets || 0} max={stats.matchesPlayed} color="bg-secondary" />
                  <ProgressStat label="Penalties arrêtés" value={stats.penaltiesSaved || 0} max={5} color="bg-accent" />
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <StatItem label="Buts encaissés" value={stats.goalsConceded || 0} icon={AlertCircle} />
                    <StatItem label="% d'arrêts" value={`${stats.savePercentage?.toFixed(1)}%`} icon={TrendingUp} />
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-4 bg-card/50 backdrop-blur-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Contribution Offensive
                </h3>
                <div className="space-y-4">
                  <ProgressStat label="Buts" value={stats.goals} max={15} />
                  <ProgressStat label="Passes décisives" value={stats.assists} max={10} color="bg-secondary" />
                  <ProgressStat label="xG (Expected Goals)" value={stats.xG} max={10} color="bg-accent" />
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <StatItem label="Tirs totaux" value={stats.shotsTotal} icon={Target} />
                    <StatItem label="Tirs cadrés" value={stats.shotsOnTarget} icon={Zap} />
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Discipline
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <StatItem label="Cartons jaunes" value={stats.yellowCards} icon={AlertCircle} />
                <StatItem label="Cartons rouges" value={stats.redCards} icon={AlertCircle} />
                <StatItem label="Fautes commises" value={stats.foulsCommitted} icon={AlertCircle} />
                <StatItem label="Fautes subies" value={stats.foulsSuffered} icon={AlertCircle} />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="radar" className="space-y-4">
            <PlayerIndividualRadar playerId={player.id} />
          </TabsContent>

          <TabsContent value="evolution" className="space-y-4">
            <PlayerEvolutionChart playerId={player.id} />
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            <PlayerMatchHistory playerId={player.id} />
          </TabsContent>

          <TabsContent value="offensive" className="space-y-4">
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <h3 className="font-semibold mb-4">Statistiques Offensives Détaillées</h3>
              <div className="space-y-4">
                <ProgressStat label="Buts marqués" value={stats.goals} max={15} />
                <ProgressStat label="Passes décisives" value={stats.assists} max={10} color="bg-secondary" />
                <ProgressStat label="Tirs cadrés" value={stats.shotsOnTarget} max={30} color="bg-accent" />
                <ProgressStat label="Passes clés" value={stats.keyPasses} max={40} color="bg-chart-4" />
                <ProgressStat label="xG (Expected Goals)" value={stats.xG} max={10} />
                <ProgressStat label="xA (Expected Assists)" value={stats.xA} max={8} color="bg-secondary" />
              </div>
            </Card>

            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <h3 className="font-semibold mb-4">Dribbles & Technique</h3>
              <div className="space-y-4">
                <ProgressStat label="Dribbles réussis" value={stats.dribblesSuccess} max={stats.dribbles} />
                <div className="grid grid-cols-2 gap-3">
                  <StatItem label="Total dribbles" value={stats.dribbles} icon={Zap} />
                  <StatItem label="% réussite" value={`${Math.round((stats.dribblesSuccess / stats.dribbles) * 100)}%`} icon={TrendingUp} />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="defensive" className="space-y-4">
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <h3 className="font-semibold mb-4">Actions Défensives</h3>
              <div className="space-y-4">
                <ProgressStat label="Tacles" value={stats.tackles} max={50} />
                <ProgressStat label="Interceptions" value={stats.interceptions} max={40} color="bg-secondary" />
                <ProgressStat label="Dégagements" value={stats.clearances} max={50} color="bg-accent" />
                <ProgressStat label="Blocks" value={stats.blocks} max={20} color="bg-chart-4" />
              </div>
            </Card>

            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <h3 className="font-semibold mb-4">Duels</h3>
              <div className="space-y-4">
                <ProgressStat label="Duels gagnés" value={stats.duelsWon} max={stats.duelsTotal} />
                <ProgressStat label="Duels aériens gagnés" value={stats.aerialWon} max={stats.aerialTotal} color="bg-secondary" />
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <StatItem label="% duels" value={`${Math.round((stats.duelsWon / stats.duelsTotal) * 100)}%`} icon={TrendingUp} />
                  <StatItem label="% aériens" value={`${Math.round((stats.aerialWon / stats.aerialTotal) * 100)}%`} icon={TrendingUp} />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="passing" className="space-y-4">
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <h3 className="font-semibold mb-4">Jeu de Passes</h3>
              <div className="space-y-4">
                <ProgressStat label="Passes réussies" value={stats.passesCompleted} max={stats.passes} />
                <div className="grid grid-cols-2 gap-3">
                  <StatItem label="Total passes" value={stats.passes} icon={Activity} />
                  <StatItem label="Précision" value={`${stats.passAccuracy.toFixed(1)}%`} icon={Target} />
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <h3 className="font-semibold mb-4">Passes Longues & Centres</h3>
              <div className="space-y-4">
                <ProgressStat label="Longs ballons réussis" value={stats.longBallsCompleted} max={stats.longBalls} />
                <ProgressStat label="Centres réussis" value={stats.crossesCompleted} max={stats.crosses} color="bg-secondary" />
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <StatItem label="% longs ballons" value={`${Math.round((stats.longBallsCompleted / stats.longBalls) * 100)}%`} icon={TrendingUp} />
                  <StatItem label="% centres" value={`${Math.round((stats.crossesCompleted / stats.crosses) * 100)}%`} icon={TrendingUp} />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
