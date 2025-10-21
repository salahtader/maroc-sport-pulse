import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Star, TrendingUp, Target, Shield, Activity } from "lucide-react";
import { dataProvider, Player, TeamType } from "@/lib/dataProvider";
import { PlayerCard } from "@/components/PlayerCard";
import { PlayerDetailsDialog } from "@/components/PlayerDetailsDialog";
import { PlayersComparison } from "@/components/PlayersComparison";
import { PlayerRadarAnalysis } from "@/components/PlayerRadarAnalysis";
import { SortControls, SortOption, SortDirection } from "@/components/SortControls";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Players = () => {
  const { toast } = useToast();
  const [selectedTeam, setSelectedTeam] = useState<TeamType>("seniorA");
  const [selectedPosition, setSelectedPosition] = useState<Player['position'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [favorites, setFavorites] = useState<string[]>([]);

  const allPlayers = dataProvider.getPlayers(selectedTeam, selectedPosition === 'all' ? undefined : selectedPosition);
  
  const filteredAndSortedPlayers = useMemo(() => {
    let filtered = allPlayers.filter(player =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.club.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort players
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (sortBy === 'name') {
        aValue = a.name;
        bValue = b.name;
      } else if (sortBy === 'age') {
        aValue = a.age;
        bValue = b.age;
      } else {
        const aStats = dataProvider.getPlayerStats(a.id);
        const bStats = dataProvider.getPlayerStats(b.id);
        aValue = aStats?.[sortBy] || 0;
        bValue = bStats?.[sortBy] || 0;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [allPlayers, searchQuery, sortBy, sortDirection]);

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
    const newMode = !compareMode;
    setCompareMode(newMode);
    setSelectedForComparison([]);
    
    toast({
      title: newMode ? "Mode comparaison activé" : "Mode comparaison désactivé",
      description: newMode ? "Sélectionnez 2-3 joueurs à comparer" : "Retour au mode normal",
    });
  };

  const toggleFavorite = (playerId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId];
      
      toast({
        title: newFavorites.includes(playerId) ? "Ajouté aux favoris" : "Retiré des favoris",
        description: "Vos préférences ont été sauvegardées",
      });
      
      return newFavorites;
    });
  };

  const handleSortChange = (newSortBy: SortOption, newDirection: SortDirection) => {
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  };

  return (
    <div className="flex-1 space-y-8 p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Gestion des Joueurs
          </h1>
          <p className="text-muted-foreground">
            Suivi détaillé des performances et statistiques de chaque joueur • {dataProvider.getTeamLabel(selectedTeam)}
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

      {/* Filters */}
      <Card className="p-6 mb-6 bg-card/50 backdrop-blur-sm border-border animate-slide-in">
          <div className="flex flex-col gap-4">
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
            
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const showingFavorites = searchQuery === '[FAVORIS]';
                    if (showingFavorites) {
                      setSearchQuery('');
                    } else {
                      setSearchQuery('[FAVORIS]');
                    }
                  }}
                  className="gap-2"
                >
                  <Star className="h-4 w-4" />
                  Favoris ({favorites.length})
                </Button>
              </div>
              
              <SortControls
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
      </Card>

      {/* Comparison View */}
      {compareMode && selectedForComparison.length >= 2 && (
          <>
            <PlayerRadarAnalysis playerIds={selectedForComparison} />
            <PlayersComparison
              playerIds={selectedForComparison}
              onClose={() => {
                setCompareMode(false);
                setSelectedForComparison([]);
              }}
            />
          </>
      )}

      {/* Players Grid */}
      <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {filteredAndSortedPlayers.length} {filteredAndSortedPlayers.length === 1 ? 'Joueur' : 'Joueurs'}
            </h2>
            {compareMode && (
              <Badge variant="secondary" className="text-sm animate-pulse">
                Sélectionnez 2-3 joueurs à comparer
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAndSortedPlayers
              .filter(player => searchQuery !== '[FAVORIS]' || favorites.includes(player.id))
              .map((player, index) => (
              <div 
                key={player.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <PlayerCard
                  player={player}
                  onClick={() => handlePlayerSelect(player)}
                  isSelected={selectedForComparison.includes(player.id)}
                  compareMode={compareMode}
                />
              </div>
            ))}
          </div>
          {filteredAndSortedPlayers.length === 0 && (
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
  );
};

export default Players;
