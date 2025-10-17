import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Filter, TrendingUp, Target, Shield, Activity } from "lucide-react";
import { dataProvider, Player, TeamType } from "@/lib/dataProvider";
import { PlayerCard } from "@/components/PlayerCard";
import { PlayerDetailsDialog } from "@/components/PlayerDetailsDialog";
import { PlayersComparison } from "@/components/PlayersComparison";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Players = () => {
  const [selectedTeam, setSelectedTeam] = useState<TeamType>("seniorA");
  const [selectedPosition, setSelectedPosition] = useState<Player['position'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);

  const allPlayers = dataProvider.getPlayers(selectedTeam, selectedPosition === 'all' ? undefined : selectedPosition);
  const filteredPlayers = allPlayers.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.club.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      title: "Joueurs Total",
      value: dataProvider.getPlayers(selectedTeam).length.toString(),
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Performance Moy.",
      value: "8.2/10",
      icon: TrendingUp,
      color: "text-secondary",
    },
    {
      title: "Buts Marqués",
      value: "42",
      icon: Target,
      color: "text-accent",
    },
    {
      title: "Clean Sheets",
      value: "18",
      icon: Shield,
      color: "text-primary",
    },
  ];

  const handlePlayerSelect = (player: Player) => {
    if (compareMode) {
      if (selectedForComparison.includes(player.id)) {
        setSelectedForComparison(selectedForComparison.filter(id => id !== player.id));
      } else if (selectedForComparison.length < 3) {
        setSelectedForComparison([...selectedForComparison, player.id]);
      }
    } else {
      setSelectedPlayer(player);
    }
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    setSelectedForComparison([]);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                Analyse des Joueurs
              </h1>
              <p className="text-muted-foreground">
                Statistiques détaillées et performances individuelles • {dataProvider.getTeamLabel(selectedTeam)}
              </p>
            </div>
            <Button
              variant={compareMode ? "default" : "outline"}
              onClick={toggleCompareMode}
              className="gap-2"
            >
              <Activity className="h-4 w-4" />
              {compareMode ? `Comparer (${selectedForComparison.length}/3)` : 'Mode Comparaison'}
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 bg-card/50 backdrop-blur-sm border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6 bg-card/50 backdrop-blur-sm border-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un joueur ou club..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedTeam} onValueChange={(value) => setSelectedTeam(value as TeamType)}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seniorA">Équipe A</SelectItem>
                <SelectItem value="u23">Équipe U23</SelectItem>
                <SelectItem value="u20">Équipe U20</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPosition} onValueChange={(value) => setSelectedPosition(value as Player['position'] | 'all')}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les postes</SelectItem>
                <SelectItem value="GK">Gardiens</SelectItem>
                <SelectItem value="DEF">Défenseurs</SelectItem>
                <SelectItem value="MID">Milieux</SelectItem>
                <SelectItem value="ATT">Attaquants</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Comparison View */}
        {compareMode && selectedForComparison.length >= 2 && (
          <PlayersComparison
            playerIds={selectedForComparison}
            onClose={() => {
              setCompareMode(false);
              setSelectedForComparison([]);
            }}
          />
        )}

        {/* Players Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {filteredPlayers.length} {filteredPlayers.length === 1 ? 'Joueur' : 'Joueurs'}
            </h2>
            {compareMode && (
              <Badge variant="secondary" className="text-sm">
                Sélectionnez 2-3 joueurs à comparer
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onClick={() => handlePlayerSelect(player)}
                isSelected={selectedForComparison.includes(player.id)}
                compareMode={compareMode}
              />
            ))}
          </div>
          {filteredPlayers.length === 0 && (
            <Card className="p-12 bg-card/50 backdrop-blur-sm border-border text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Aucun joueur trouvé</p>
            </Card>
          )}
        </div>

        {/* Player Details Dialog */}
        {selectedPlayer && !compareMode && (
          <PlayerDetailsDialog
            player={selectedPlayer}
            onClose={() => setSelectedPlayer(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Players;
