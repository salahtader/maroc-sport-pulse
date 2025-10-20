import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "€49",
    period: "/mois",
    description: "Pour les clubs amateurs",
    features: [
      "Jusqu'à 2 équipes",
      "50 joueurs max",
      "Analyses basiques",
      "Export PDF",
      "Support email",
    ],
    current: false,
  },
  {
    name: "Professional",
    price: "€149",
    period: "/mois",
    description: "Pour les clubs professionnels",
    features: [
      "Équipes illimitées",
      "Joueurs illimités",
      "Analyses IA avancées",
      "Export multi-format",
      "Support prioritaire",
      "API access",
    ],
    current: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Sur devis",
    period: "",
    description: "Pour les fédérations",
    features: [
      "Tout du Professional",
      "Infrastructure dédiée",
      "Formation personnalisée",
      "Support 24/7",
      "Intégrations customs",
    ],
    current: false,
  },
];

export default function Subscription() {
  return (
    <div className="flex-1 space-y-8 p-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Abonnement & Facturation
        </h1>
        <p className="text-muted-foreground">
          Gérez votre abonnement et consultez votre historique de facturation
        </p>
      </div>

      {/* Plan actuel */}
      <Card className="p-6 bg-gradient-card border-border">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">Professional</h2>
              <Badge className="bg-primary/20 text-primary border-primary/30">
                Plan actuel
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Renouvelable le 15 janvier 2025
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">€149</div>
            <div className="text-sm text-muted-foreground">/mois</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card className="p-4 bg-card/50 border-border">
            <div className="text-sm text-muted-foreground mb-1">Équipes</div>
            <div className="text-2xl font-bold">3 / ∞</div>
          </Card>
          <Card className="p-4 bg-card/50 border-border">
            <div className="text-sm text-muted-foreground mb-1">Joueurs</div>
            <div className="text-2xl font-bold">87 / ∞</div>
          </Card>
          <Card className="p-4 bg-card/50 border-border">
            <div className="text-sm text-muted-foreground mb-1">Analyses IA</div>
            <div className="text-2xl font-bold">142</div>
            <div className="text-xs text-muted-foreground">ce mois</div>
          </Card>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Méthode de paiement
          </Button>
          <Button variant="outline">
            Historique des factures
          </Button>
        </div>
      </Card>

      {/* Tous les plans */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Changer de plan</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 relative ${
                plan.popular
                  ? "border-primary shadow-glow-red"
                  : "bg-gradient-card border-border"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  <Zap className="h-3 w-3 mr-1" />
                  Populaire
                </Badge>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground mb-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.current ? "outline" : "default"}
                disabled={plan.current}
              >
                {plan.current ? "Plan actuel" : "Choisir ce plan"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
