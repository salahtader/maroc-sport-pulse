import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AIAnalysisButtonProps {
  type: 'player' | 'team' | 'match' | 'comparison';
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
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Analyse IA Avancée
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
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Fermer
            </Button>
            <Button onClick={generateAnalysis} disabled={isAnalyzing}>
              <Sparkles className="h-4 w-4 mr-2" />
              Régénérer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
