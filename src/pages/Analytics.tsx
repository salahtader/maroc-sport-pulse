import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Target, Activity } from "lucide-react";

export default function Analytics() {
  return (
    <div className="flex-1 space-y-8 p-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Analyses & Performances
        </h1>
        <p className="text-muted-foreground">
          Vue complète des performances et analyses tactiques
        </p>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="tactical">Tactique</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="p-6 bg-gradient-card border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Performance Globale</span>
              </div>
              <div className="text-3xl font-bold text-primary">87%</div>
              <div className="text-xs text-muted-foreground mt-1">+5% vs mois dernier</div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-sm text-muted-foreground">Tendance</span>
              </div>
              <div className="text-3xl font-bold text-secondary">↑ 12%</div>
              <div className="text-xs text-muted-foreground mt-1">Progression constante</div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">Objectifs</span>
              </div>
              <div className="text-3xl font-bold text-accent">8/10</div>
              <div className="text-xs text-muted-foreground mt-1">Atteints ce mois</div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-chart-4/10">
                  <Activity className="h-5 w-5 text-chart-4" />
                </div>
                <span className="text-sm text-muted-foreground">Activité</span>
              </div>
              <div className="text-3xl font-bold text-chart-4">142</div>
              <div className="text-xs text-muted-foreground mt-1">Actions ce mois</div>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-card border-border">
            <h3 className="text-lg font-semibold mb-4">Analyses de performance disponibles</h3>
            <div className="text-muted-foreground">
              Sélectionnez une équipe ou un joueur pour voir les analyses détaillées
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tactical" className="space-y-6">
          <Card className="p-6 bg-gradient-card border-border">
            <h3 className="text-lg font-semibold mb-4">Analyses tactiques</h3>
            <div className="text-muted-foreground">
              Analyses tactiques et stratégiques en cours de développement
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
