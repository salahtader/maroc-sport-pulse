import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, Users, Target, Shield, TrendingUp, 
  Brain, Activity, AlertTriangle, BarChart3, 
  Search, Trophy, LineChart, FileText, Zap 
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { dataProvider } from "@/lib/dataProvider";

interface AnalysisScenario {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'team' | 'player' | 'match' | 'tactical';
  type: string;
}

const scenarios: AnalysisScenario[] = [
  {
    id: '1',
    title: 'Performance Globale Équipe',
    description: 'Analyse complète de l\'état actuel de l\'équipe',
    icon: Users,
    category: 'team',
    type: 'team_performance'
  },
  {
    id: '2',
    title: 'Style de Jeu',
    description: 'Identification de l\'ADN tactique de l\'équipe',
    icon: BarChart3,
    category: 'team',
    type: 'team_style'
  },
  {
    id: '3',
    title: 'Menaces Adversaires',
    description: 'Détection des dangers principaux chez l\'adversaire',
    icon: AlertTriangle,
    category: 'tactical',
    type: 'opponent_threats'
  },
  {
    id: '4',
    title: 'Faiblesses Adversaires',
    description: 'Points faibles exploitables de l\'adversaire',
    icon: Target,
    category: 'tactical',
    type: 'opponent_weaknesses'
  },
  {
    id: '5',
    title: 'Composition Optimale',
    description: 'Recommandation du meilleur 11 de départ',
    icon: Users,
    category: 'tactical',
    type: 'lineup_recommendation'
  },
  {
    id: '6',
    title: 'Ajustements Tactiques',
    description: 'Suggestions d\'ajustements en temps réel',
    icon: Zap,
    category: 'tactical',
    type: 'tactical_adjustment'
  },
  {
    id: '7',
    title: 'Prédiction Performance Joueur',
    description: 'Estimation de la contribution attendue',
    icon: TrendingUp,
    category: 'player',
    type: 'player_prediction'
  },
  {
    id: '8',
    title: 'Risque de Blessure',
    description: 'Identification des joueurs à risque',
    icon: Activity,
    category: 'player',
    type: 'injury_risk'
  },
  {
    id: '9',
    title: 'Détection Régression',
    description: 'Suivi de la forme des joueurs',
    icon: LineChart,
    category: 'player',
    type: 'performance_regression'
  },
  {
    id: '10',
    title: 'Forces & Faiblesses',
    description: 'Analyse stratégique complète de l\'équipe',
    icon: Shield,
    category: 'team',
    type: 'team_strengths_weaknesses'
  },
  {
    id: '11',
    title: 'Scouting Joueur',
    description: 'Évaluation de compatibilité joueur/équipe',
    icon: Search,
    category: 'player',
    type: 'scouting_profile'
  },
  {
    id: '12',
    title: 'Prédiction de Match',
    description: 'Probabilité victoire/nul/défaite',
    icon: Trophy,
    category: 'match',
    type: 'match_predictor'
  },
  {
    id: '13',
    title: 'Analyse xG',
    description: 'Efficacité offensive et expected goals',
    icon: Target,
    category: 'match',
    type: 'xg_analysis'
  },
  {
    id: '14',
    title: 'Plan de Match',
    description: 'Génération de stratégie complète',
    icon: Brain,
    category: 'tactical',
    type: 'game_plan'
  },
  {
    id: '15',
    title: 'Rapport Post-Match',
    description: 'Analyse automatique après match',
    icon: FileText,
    category: 'match',
    type: 'post_match_report'
  },
];

export default function AIAnalytics() {
  const [selectedScenario, setSelectedScenario] = useState<AnalysisScenario | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  const generateAnalysis = async (scenario: AnalysisScenario) => {
    setIsAnalyzing(true);
    try {
      // Préparer des données de démonstration selon le type
      let demoData = {};
      const players = dataProvider.getPlayers('seniorA');
      const matches = dataProvider.getMatches('all', 'all').slice(0, 5);

      switch (scenario.category) {
        case 'team':
          demoData = {
            team: 'Équipe A',
            recentMatches: matches,
            stats: {
              wins: 9,
              draws: 3,
              losses: 3,
              goalsScored: 28,
              goalsConceded: 15,
              possession: 58,
              passAccuracy: 84
            }
          };
          break;
        case 'player':
          const player = players[0];
          demoData = {
            player: player.name,
            position: dataProvider.getPositionLabel(player.position),
            stats: dataProvider.getPlayerStats(player.id),
            recentMatches: matches.slice(0, 3)
          };
          break;
        case 'match':
          demoData = {
            homeTeam: 'Équipe A',
            awayTeam: 'Adversaire X',
            recentForm: { home: 'VVN', away: 'NDD' },
            stats: matches[0]
          };
          break;
        case 'tactical':
          demoData = {
            team: 'Équipe A',
            opponent: 'Adversaire X',
            context: 'Match de championnat',
            availablePlayers: players.slice(0, 15).map(p => p.name)
          };
          break;
      }

      const { data, error } = await supabase.functions.invoke('analyze-performance', {
        body: {
          type: scenario.type,
          data: demoData
        }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
    } catch (error: any) {
      console.error('Error generating analysis:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de générer l'analyse",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleScenarioClick = (scenario: AnalysisScenario) => {
    setSelectedScenario(scenario);
    setAnalysis('');
    generateAnalysis(scenario);
  };

  const filteredScenarios = selectedCategory === 'all' 
    ? scenarios 
    : scenarios.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background p-8">
      <Breadcrumbs items={[{ label: 'Analyses IA', href: '/ai-analytics' }]} />
      
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Analyses IA Avancées
        </h1>
        <p className="text-muted-foreground">
          15 scénarios d'intelligence artificielle pour optimiser vos performances
        </p>
      </div>

      {/* Filtres de catégorie */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <Button
          onClick={() => setSelectedCategory('all')}
          variant={selectedCategory === 'all' ? "default" : "outline"}
        >
          Tous
        </Button>
        <Button
          onClick={() => setSelectedCategory('team')}
          variant={selectedCategory === 'team' ? "default" : "outline"}
        >
          <Users className="h-4 w-4 mr-2" />
          Équipe
        </Button>
        <Button
          onClick={() => setSelectedCategory('player')}
          variant={selectedCategory === 'player' ? "default" : "outline"}
        >
          <Target className="h-4 w-4 mr-2" />
          Joueur
        </Button>
        <Button
          onClick={() => setSelectedCategory('match')}
          variant={selectedCategory === 'match' ? "default" : "outline"}
        >
          <Trophy className="h-4 w-4 mr-2" />
          Match
        </Button>
        <Button
          onClick={() => setSelectedCategory('tactical')}
          variant={selectedCategory === 'tactical' ? "default" : "outline"}
        >
          <Brain className="h-4 w-4 mr-2" />
          Tactique
        </Button>
      </div>

      {/* Grille de scénarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <Card
              key={scenario.id}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all cursor-pointer group"
              onClick={() => handleScenarioClick(scenario)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {scenario.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {scenario.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                Analyse IA
              </div>
            </Card>
          );
        })}
      </div>

      {/* Dialog d'analyse */}
      <Dialog open={!!selectedScenario} onOpenChange={() => setSelectedScenario(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedScenario && <selectedScenario.icon className="h-6 w-6 text-primary" />}
              {selectedScenario?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  Génération de l'analyse en cours...
                </p>
              </div>
            ) : analysis ? (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {analysis}
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setSelectedScenario(null)}>
              Fermer
            </Button>
            <Button 
              onClick={() => selectedScenario && generateAnalysis(selectedScenario)} 
              disabled={isAnalyzing}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Régénérer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
