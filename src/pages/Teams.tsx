import { useState } from "react";
import { dataProvider, TeamType } from "@/lib/dataProvider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Users, TrendingUp, Trophy, Target, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Teams() {
  const [selectedTeam, setSelectedTeam] = useState<TeamType>('seniorA');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const { toast } = useToast();

  const teams = [
    { id: 'seniorA' as TeamType, name: 'Équipe A', color: 'bg-primary' },
    { id: 'u23' as TeamType, name: 'U23', color: 'bg-secondary' },
    { id: 'u20' as TeamType, name: 'U20', color: 'bg-accent' },
  ];

  const players = dataProvider.getPlayers(selectedTeam);
  const matches = dataProvider.getMatches('all', 'all').slice(0, 10);

  // Calculer les statistiques de l'équipe
  const teamStats = {
    totalPlayers: players.length,
    averageAge: Math.round(players.reduce((sum, p) => sum + p.age, 0) / players.length),
    totalGoals: players.reduce((sum, p) => {
      const stats = dataProvider.getPlayerStats(p.id);
      return sum + (stats?.goals || 0);
    }, 0),
    totalAssists: players.reduce((sum, p) => {
      const stats = dataProvider.getPlayerStats(p.id);
      return sum + (stats?.assists || 0);
    }, 0),
    totalMatches: 15,
    wins: 9,
    draws: 3,
    losses: 3,
  };

  // Données d'évolution de l'équipe
  const evolutionData = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));
    return {
      month: date.toLocaleDateString('fr-FR', { month: 'short' }),
      performance: 65 + Math.random() * 25,
      goals: Math.floor(Math.random() * 15) + 10,
      possession: 50 + Math.random() * 20,
    };
  });

  // Données radar pour l'équipe
  const radarData = [
    { attribute: 'Attaque', value: 75 },
    { attribute: 'Défense', value: 82 },
    { attribute: 'Possession', value: 68 },
    { attribute: 'Passes', value: 85 },
    { attribute: 'Physique', value: 78 },
    { attribute: 'Technique', value: 80 },
  ];

  const analyzeTeam = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-performance', {
        body: {
          type: 'team',
          data: {
            team: dataProvider.getTeamLabel(selectedTeam),
            stats: teamStats,
            players: players.map(p => ({
              name: p.name,
              position: dataProvider.getPositionLabel(p.position),
              stats: dataProvider.getPlayerStats(p.id)
            })),
            recentMatches: matches.slice(0, 5)
          }
        }
      });

      if (error) throw error;
      setAiAnalysis(data.analysis);
      toast({
        title: "Analyse générée",
        description: "L'analyse IA est prête",
      });
    } catch (error) {
      console.error('Error analyzing team:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer l'analyse",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 space-y-8 p-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Analyse des Équipes
        </h1>
        <p className="text-muted-foreground">
          Performances, évolution et analyses tactiques détaillées
        </p>
      </div>

      {/* Sélection de l'équipe */}
      <div className="flex gap-3 mb-8">
        {teams.map((team) => (
          <Button
            key={team.id}
            onClick={() => setSelectedTeam(team.id)}
            variant={selectedTeam === team.id ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            {team.name}
          </Button>
        ))}
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Effectif</span>
          </div>
          <div className="text-3xl font-bold text-primary">{teamStats.totalPlayers}</div>
          <div className="text-xs text-muted-foreground">Âge moyen: {teamStats.averageAge} ans</div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-5 w-5 text-secondary" />
            <span className="text-sm text-muted-foreground">Bilan</span>
          </div>
          <div className="text-3xl font-bold text-secondary">
            {teamStats.wins}V-{teamStats.draws}N-{teamStats.losses}D
          </div>
          <div className="text-xs text-muted-foreground">
            {Math.round((teamStats.wins / teamStats.totalMatches) * 100)}% de victoires
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all">
          <div className="flex items-center gap-3 mb-2">
            <Target className="h-5 w-5 text-accent" />
            <span className="text-sm text-muted-foreground">Buts</span>
          </div>
          <div className="text-3xl font-bold text-accent">{teamStats.totalGoals}</div>
          <div className="text-xs text-muted-foreground">
            {teamStats.totalAssists} passes décisives
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-chart-4" />
            <span className="text-sm text-muted-foreground">Forme</span>
          </div>
          <div className="text-3xl font-bold text-chart-4">82%</div>
          <div className="text-xs text-muted-foreground">Performance globale</div>
        </Card>
      </div>

      <Tabs defaultValue="evolution" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="evolution">Évolution</TabsTrigger>
          <TabsTrigger value="radar">Analyse Radar</TabsTrigger>
          <TabsTrigger value="players">Joueurs</TabsTrigger>
          <TabsTrigger value="ai">
            <Sparkles className="h-4 w-4 mr-2" />
            Analyse IA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="evolution">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <h3 className="text-lg font-semibold mb-6">Évolution sur 12 mois</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={evolutionData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Performance"
                />
                <Line
                  type="monotone"
                  dataKey="goals"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  name="Buts"
                />
                <Line
                  type="monotone"
                  dataKey="possession"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  name="Possession"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="radar">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <h3 className="text-lg font-semibold mb-6">Profil de jeu</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="attribute"
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name={dataProvider.getTeamLabel(selectedTeam)}
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="players">
          <div className="grid gap-4">
            {players.map((player) => {
              const stats = dataProvider.getPlayerStats(player.id);
              return (
                <Card key={player.id} className="p-4 bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm font-semibold">
                          {player.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold">{player.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {dataProvider.getPositionLabel(player.position)} • {player.club}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-primary">{stats?.matchesPlayed || 0}</div>
                        <div className="text-xs text-muted-foreground">Matchs</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-secondary">{stats?.goals || 0}</div>
                        <div className="text-xs text-muted-foreground">Buts</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-accent">{stats?.assists || 0}</div>
                        <div className="text-xs text-muted-foreground">Passes D.</div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="ai">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Analyse IA Avancée
              </h3>
              <Button onClick={analyzeTeam} disabled={isAnalyzing}>
                {isAnalyzing ? "Analyse en cours..." : "Générer l'analyse"}
              </Button>
            </div>

            {aiAnalysis ? (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {aiAnalysis}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Cliquez sur "Générer l'analyse" pour obtenir une analyse IA détaillée de l'équipe</p>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
