import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisSectionProps {
  title: string;
  icon: LucideIcon;
  content: string;
  score?: number;
  variant?: "default" | "success" | "warning" | "danger";
  badge?: string;
}

export const AnalysisSection = ({ 
  title, 
  icon: Icon, 
  content, 
  score,
  variant = "default",
  badge
}: AnalysisSectionProps) => {
  const variantColors = {
    default: "text-primary",
    success: "text-green-500",
    warning: "text-yellow-500",
    danger: "text-red-500"
  };

  const badgeVariants = {
    default: "default",
    success: "default",
    warning: "secondary",
    danger: "destructive"
  } as const;

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-card to-card/50 border-border hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-primary/10`}>
            <Icon className={`h-5 w-5 ${variantColors[variant]}`} />
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {badge && (
          <Badge variant={badgeVariants[variant]}>{badge}</Badge>
        )}
      </div>

      {score !== undefined && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Score</span>
            <span className="font-bold">{score}/10</span>
          </div>
          <Progress value={score * 10} className="h-2" />
        </div>
      )}

      <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
        {content}
      </div>
    </Card>
  );
};
