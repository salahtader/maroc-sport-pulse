import { useState } from "react";
import { dataProvider } from "@/lib/dataProvider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calendar, MapPin, Trophy, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function Matches() {
  const [selectedCompetition, setSelectedCompetition] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  const matches = dataProvider.getMatches(
    'all',
    selectedCompetition === 'all' ? undefined : selectedCompetition as any
  );

  const filteredMatches = matches.filter(match =>
    match.opponent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedMatchData = selectedMatch ? dataProvider.getMatch(selectedMatch) : null;
  const matchStats = selectedMatch ? dataProvider.getMatchStats(selectedMatch) : [];

  const getResultColor = (result: 'W' | 'D' | 'L') => {
    switch(result) {
      case 'W': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'D': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'L': return 'bg-red-500/20 text-red-500 border-red-500/30';
    }
  };

  const getResultLabel = (result: 'W' | 'D' | 'L') => {
    switch(result) {
      case 'W': return 'Victoire';
      case 'D': return 'Match nul';
      case 'L': return 'Défaite';
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <Breadcrumbs items={[{ label: 'Matchs', href: '/matches' }]} />
      
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Historique des Matchs
        </h1>
        <p className="text-muted-foreground">
          Analyse détaillée de chaque rencontre et performances
        </p>
      </div>

      <div className="grid gap-6 mb-8">
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher un adversaire..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <Select value={selectedCompetition} onValueChange={setSelectedCompetition}>
              <SelectTrigger className="md:w-[200px] bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les compétitions</SelectItem>
                <SelectItem value="league">Championnat</SelectItem>
                <SelectItem value="cup">Coupe</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>

      <div className="grid gap-4">
        {filteredMatches.map((match, index) => (
          <Card
            key={match.id}
            onClick={() => setSelectedMatch(match.id)}
            className="p-6 bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all duration-300 cursor-pointer group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 flex-1">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={cn("text-xs", getResultColor(match.result))}>
                    {match.result}
                  </Badge>
                  <div className="text-2xl font-bold">{match.score}</div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {dataProvider.getCompetitionLabel(match.competition)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{match.location === 'home' ? 'Domicile' : 'Extérieur'}</span>
                    <span>vs {match.opponent}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(match.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedMatch} onOpenChange={() => setSelectedMatch(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedMatchData && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-4">
                  <Badge variant="outline" className={cn("text-sm", getResultColor(selectedMatchData.result))}>
                    {getResultLabel(selectedMatchData.result)}
                  </Badge>
                  <span>vs {selectedMatchData.opponent}</span>
                  <span className="text-2xl font-bold">{selectedMatchData.score}</span>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="stats" className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="stats">Statistiques</TabsTrigger>
                  <TabsTrigger value="players">Joueurs</TabsTrigger>
                </TabsList>

                <TabsContent value="stats" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <Card className="p-4 bg-card/50">
                      <div className="text-sm text-muted-foreground mb-1">Date</div>
                      <div className="font-semibold">
                        {new Date(selectedMatchData.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </Card>
                    <Card className="p-4 bg-card/50">
                      <div className="text-sm text-muted-foreground mb-1">Compétition</div>
                      <div className="font-semibold">
                        {dataProvider.getCompetitionLabel(selectedMatchData.competition)}
                      </div>
                    </Card>
                    <Card className="p-4 bg-card/50">
                      <div className="text-sm text-muted-foreground mb-1">Lieu</div>
                      <div className="font-semibold">
                        {selectedMatchData.location === 'home' ? 'Domicile' : 'Extérieur'}
                      </div>
                    </Card>
                  </div>

                  <Card className="p-6 bg-card/50">
                    <h3 className="font-semibold mb-4">Performances collectives</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Buts marqués</div>
                        <div className="text-3xl font-bold text-primary">
                          {selectedMatchData.score.split('-')[0]}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Buts encaissés</div>
                        <div className="text-3xl font-bold text-accent">
                          {selectedMatchData.score.split('-')[1]}
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="players" className="space-y-4">
                  <div className="space-y-3">
                    {matchStats
                      .sort((a, b) => b.rating - a.rating)
                      .map(stat => {
                        const player = dataProvider.getPlayer(stat.playerId);
                        if (!player) return null;

                        return (
                          <Card key={stat.playerId} className="p-4 bg-card/50">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                  {player.photo ? (
                                    <img src={player.photo} alt={player.name} className="h-10 w-10 rounded-full object-cover" />
                                  ) : (
                                    <span className="text-sm font-semibold">
                                      {player.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <div className="font-semibold">{player.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {dataProvider.getPositionLabel(player.position)}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary">
                                  {stat.rating.toFixed(1)}
                                </div>
                                <div className="text-xs text-muted-foreground">Note</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-4 gap-3 text-sm">
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
                                <div className="font-bold">{stat.minutesPlayed}'</div>
                                <div className="text-xs text-muted-foreground">Minutes</div>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
