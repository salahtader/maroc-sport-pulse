import { Card } from "@/components/ui/card";
import { Sparkles, TrendingUp, AlertCircle } from "lucide-react";

export const AIInsights = () => {
  const insights = [
    {
      type: "positive",
      icon: TrendingUp,
      title: "Tendance Positive",
      description:
        "L'équipe U20 montre une progression constante avec un style de jeu similaire à l'équipe A, notamment dans la construction depuis l'arrière (+15% de passes réussies).",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      type: "analysis",
      icon: Sparkles,
      title: "Analyse Tactique",
      description:
        "Le Maroc privilégie un jeu de possession (58% en moyenne) avec une transition rapide. Les statistiques montrent une amélioration de 12% dans les duels défensifs.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      type: "attention",
      icon: AlertCircle,
      title: "Point d'Attention",
      description:
        "L'efficacité devant le but reste à améliorer. Malgré 18 tirs par match en moyenne, le taux de conversion est de 22%, en dessous de la moyenne continentale (28%).",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-6 w-6 text-accent" />
        <h3 className="text-xl font-bold">Analyses IA</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${insight.bgColor} border border-border/50 hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-start gap-3">
              <insight.icon className={`h-5 w-5 ${insight.color} flex-shrink-0 mt-1`} />
              <div>
                <h4 className="font-semibold mb-2">{insight.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
