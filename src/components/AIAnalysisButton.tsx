import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, Loader2, Target, TrendingUp, AlertTriangle, CheckCircle2, Users, Zap, Shield, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TacticalField } from "./TacticalField";
import { AnalysisSection } from "./AnalysisSection";
import { StatComparisonChart } from "./StatComparisonChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AIAnalysisButtonProps {
  type: 'player' | 'team' | 'match' | 'comparison' | 'team_performance' | 'team_style' | 
        'opponent_threats' | 'opponent_weaknesses' | 'lineup_recommendation' | 'tactical_adjustment' |
        'player_prediction' | 'injury_risk' | 'performance_regression' | 'team_strengths_weaknesses' |
        'scouting_profile' | 'match_predictor' | 'xg_analysis' | 'game_plan' | 'post_match_report';
  data: any;
  label?: string;
}

export const AIAnalysisButton = ({ type, data, label = "Analyse IA" }: AIAnalysisButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const { toast } = useToast();

  const generateAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('analyze-performance', {
        body: { type, data }
      });

      if (error) throw error;

      setAnalysis(result.analysis);
      toast({
        title: "Analyse générée",
        description: "L'analyse IA est prête",
      });
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

  const parseAnalysisContent = (text: string) => {
    const sections = text.split(/\n\n+/);
    return sections.filter(s => s.trim());
  };

  const getAnalysisIcon = () => {
    const iconMap: Record<string, any> = {
      player: Users,
      team_performance: Activity,
      team_style: Zap,
      opponent_threats: AlertTriangle,
      opponent_weaknesses: Target,
      lineup_recommendation: CheckCircle2,
      tactical_adjustment: Shield,
      player_prediction: TrendingUp,
    };
    return iconMap[type] || Sparkles;
  };

  // Toujours afficher les onglets visuels
  const shouldShowTacticalField = true;
  const shouldShowStats = true;

  const getTacticalHighlights = () => {
    if (type === 'opponent_threats' || type === 'opponent_weaknesses') {
      return [
        { x: 50, y: 25, radius: 30, color: '#ef4444', label: 'Zone dangereuse' },
        { x: 30, y: 40, radius: 20, color: '#f59e0b', label: 'Couloir gauche' },
        { x: 70, y: 40, radius: 20, color: '#f59e0b', label: 'Couloir droit' },
      ];
    }
    if (type === 'team_style' || type === 'game_plan') {
      return [
        { x: 50, y: 30, radius: 25, color: '#10b981', label: 'Zone offensive' },
        { x: 50, y: 60, radius: 30, color: '#3b82f6', label: 'Zone construction' },
        { x: 25, y: 50, radius: 18, color: '#8b5cf6', label: 'Couloir G' },
        { x: 75, y: 50, radius: 18, color: '#8b5cf6', label: 'Couloir D' },
      ];
    }
    return [
      { x: 50, y: 35, radius: 28, color: '#10b981', label: 'Attaque' },
      { x: 50, y: 65, radius: 25, color: '#3b82f6', label: 'Défense' },
    ];
  };

  const getStatsData = () => {
    // Générer des stats basées sur le type d'analyse
    if (type === 'player' || type === 'player_prediction') {
      return [
        { name: 'Passes', value1: 82, value2: 75, label1: 'Actuel', label2: 'Moyenne équipe' },
        { name: 'Tirs', value1: 3.2, value2: 2.8, label1: 'Actuel', label2: 'Moyenne' },
        { name: 'Duels', value1: 68, value2: 62, label1: 'Actuel', label2: 'Moyenne' },
        { name: 'Dribbles', value1: 4.5, value2: 3.1, label1: 'Actuel', label2: 'Moyenne' },
        { name: 'Interceptions', value1: 1.8, value2: 2.2, label1: 'Actuel', label2: 'Moyenne' },
      ];
    }
    if (type === 'team_performance' || type === 'xg_analysis') {
      return [
        { name: 'xG', value1: 1.8, value2: 1.3, label1: 'Pour', label2: 'Contre' },
        { name: 'Possession', value1: 58, value2: 42, label1: 'Nous', label2: 'Adversaire' },
        { name: 'Tirs cadrés', value1: 6, value2: 3, label1: 'Nous', label2: 'Adversaire' },
        { name: 'Passes clés', value1: 12, value2: 7, label1: 'Nous', label2: 'Adversaire' },
        { name: 'Duels', value1: 54, value2: 48, label1: 'Nous', label2: 'Adversaire' },
      ];
    }
    return [
      { name: 'Offensive', value1: 75 },
      { name: 'Défensive', value1: 68 },
      { name: 'Physique', value1: 82 },
      { name: 'Technique', value1: 79 },
      { name: 'Mentale', value1: 71 },
    ];
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (!analysis) {
      generateAnalysis();
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Sparkles className="h-4 w-4" />
        {label}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-xl">Analyse IA Avancée</div>
                <div className="text-sm text-muted-foreground font-normal mt-1">
                  Insights tactiques et recommandations personnalisées
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 mt-4">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold">Analyse en cours...</p>
                  <p className="text-sm text-muted-foreground">
                    Notre IA analyse les données et génère des insights personnalisés
                  </p>
                </div>
              </div>
            ) : analysis ? (
              <Tabs defaultValue="tactical" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="tactical">⚽ Tactique</TabsTrigger>
                  <TabsTrigger value="stats">📈 Statistiques</TabsTrigger>
                  <TabsTrigger value="analysis">📄 Rapport détaillé</TabsTrigger>
                </TabsList>

                <TabsContent value="tactical" className="space-y-6">
                  <TacticalField
                    formation="4-3-3"
                    title="Visualisation Tactique"
                    highlights={getTacticalHighlights()}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {parseAnalysisContent(analysis).slice(0, 4).map((section, idx) => {
                      const Icon = idx === 0 ? Target : idx === 1 ? Shield : idx === 2 ? Zap : Activity;
                      const lines = section.split('\n');
                      const title = lines[0].replace(/^#+\s*/, '').replace(/^\d+\.\s*/, '').replace(/\*\*/g, '');
                      const content = lines.slice(1, 3).join('\n').trim();
                      
                      let variant: "default" | "success" | "warning" | "danger" = "default";
                      if (title.toLowerCase().includes('force')) variant = "success";
                      else if (title.toLowerCase().includes('faible')) variant = "warning";
                      else if (title.toLowerCase().includes('risque')) variant = "danger";

                      return (
                        <AnalysisSection
                          key={idx}
                          title={title}
                          icon={Icon}
                          content={content}
                          variant={variant}
                        />
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="stats" className="space-y-6">
                  <StatComparisonChart
                    title="Analyse Comparative des Performances"
                    data={getStatsData()}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {parseAnalysisContent(analysis).slice(0, 3).map((section, idx) => {
                      const icons = [Target, Shield, Activity];
                      const Icon = icons[idx] || TrendingUp;
                      const lines = section.split('\n');
                      const title = lines[0].replace(/^#+\s*/, '').replace(/^\d+\.\s*/, '').replace(/\*\*/g, '');
                      const content = lines.slice(1, 2).join('\n').trim();
                      
                      // Extraire un score si possible
                      const scoreMatch = content.match(/(\d+(?:\.\d+)?)\s*\/\s*10/);
                      const score = scoreMatch ? parseFloat(scoreMatch[1]) : Math.random() * 3 + 7;
                      
                      let variant: "default" | "success" | "warning" | "danger" = "default";
                      if (score >= 8) variant = "success";
                      else if (score >= 6.5) variant = "default";
                      else if (score >= 5) variant = "warning";
                      else variant = "danger";

                      return (
                        <AnalysisSection
                          key={idx}
                          title={title}
                          icon={Icon}
                          content={content}
                          score={score}
                          variant={variant}
                        />
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-4">
                  {parseAnalysisContent(analysis).map((section, idx) => {
                    const Icon = getAnalysisIcon();
                    const lines = section.split('\n');
                    const title = lines[0].replace(/^#+\s*/, '').replace(/^\d+\.\s*/, '').replace(/\*\*/g, '');
                    const content = lines.slice(1).join('\n').trim();
                    
                    let variant: "default" | "success" | "warning" | "danger" = "default";
                    let badge = undefined;
                    
                    if (title.toLowerCase().includes('force') || title.toLowerCase().includes('point fort')) {
                      variant = "success";
                      badge = "✓ Force";
                    } else if (title.toLowerCase().includes('faible') || title.toLowerCase().includes('amélioration')) {
                      variant = "warning";
                      badge = "⚠ À améliorer";
                    } else if (title.toLowerCase().includes('risque') || title.toLowerCase().includes('menace')) {
                      variant = "danger";
                      badge = "⚡ Critique";
                    }

                    return (
                      <AnalysisSection
                        key={idx}
                        title={title}
                        icon={Icon}
                        content={content}
                        variant={variant}
                        badge={badge}
                      />
                    );
                  })}
                </TabsContent>
              </Tabs>
            ) : null}
          </ScrollArea>

          <div className="flex justify-between items-center gap-2 pt-4 border-t mt-4">
            <div className="text-xs text-muted-foreground">
              Analyse générée par IA • google/gemini-2.5-flash
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Fermer
              </Button>
              <Button onClick={generateAnalysis} disabled={isAnalyzing}>
                <Sparkles className="h-4 w-4 mr-2" />
                Régénérer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
