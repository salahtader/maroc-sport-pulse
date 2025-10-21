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

  const shouldShowTacticalField = [
    'team_style', 
    'opponent_threats', 
    'opponent_weaknesses', 
    'lineup_recommendation', 
    'tactical_adjustment',
    'game_plan'
  ].includes(type);

  const shouldShowStats = [
    'player', 
    'team_performance', 
    'player_prediction',
    'xg_analysis',
    'performance_regression'
  ].includes(type);

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
              <Tabs defaultValue="analysis" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="analysis">📊 Analyse</TabsTrigger>
                  {shouldShowTacticalField && <TabsTrigger value="tactical">⚽ Tactique</TabsTrigger>}
                  {shouldShowStats && <TabsTrigger value="stats">📈 Statistiques</TabsTrigger>}
                </TabsList>

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

                {shouldShowTacticalField && (
                  <TabsContent value="tactical" className="space-y-6">
                    <TacticalField
                      formation="4-3-3"
                      title="Schéma Tactique Recommandé"
                      highlights={[
                        { x: 50, y: 30, radius: 25, color: '#10b981', label: 'Zone offensive' },
                        { x: 20, y: 50, radius: 20, color: '#f59e0b', label: 'Couloir gauche' },
                        { x: 80, y: 50, radius: 20, color: '#f59e0b', label: 'Couloir droit' },
                      ]}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <AnalysisSection
                        title="Organisation Défensive"
                        icon={Shield}
                        content="Bloc compact, pressing haut sur les porteurs. Surveillance des couloirs latéraux."
                        variant="default"
                      />
                      <AnalysisSection
                        title="Transitions Offensives"
                        icon={Zap}
                        content="Verticalité rapide, utilisation des ailiers. Recherche de la profondeur."
                        variant="success"
                      />
                    </div>
                  </TabsContent>
                )}

                {shouldShowStats && (
                  <TabsContent value="stats" className="space-y-6">
                    <StatComparisonChart
                      title="Performance Comparative"
                      data={[
                        { name: 'Passes', value1: 85, value2: 78, label1: 'Actuel', label2: 'Moyenne' },
                        { name: 'Tirs', value1: 12, value2: 15, label1: 'Actuel', label2: 'Moyenne' },
                        { name: 'Duels', value1: 65, value2: 60, label1: 'Actuel', label2: 'Moyenne' },
                        { name: 'Interceptions', value1: 8, value2: 10, label1: 'Actuel', label2: 'Moyenne' },
                      ]}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <AnalysisSection
                        title="Efficacité Offensive"
                        icon={Target}
                        content="Bon ratio tirs/buts. Efficacité dans les zones décisives."
                        score={7.5}
                        variant="success"
                      />
                      <AnalysisSection
                        title="Solidité Défensive"
                        icon={Shield}
                        content="Quelques approximations sur les transitions. À renforcer."
                        score={6.2}
                        variant="warning"
                      />
                      <AnalysisSection
                        title="Condition Physique"
                        icon={Activity}
                        content="Excellente forme physique. Intensité maintenue."
                        score={8.3}
                        variant="success"
                      />
                    </div>
                  </TabsContent>
                )}
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
