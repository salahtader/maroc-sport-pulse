import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Zap, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Visualisations Avancées",
      description: "Graphiques interactifs et tableaux de bord en temps réel pour suivre les performances",
    },
    {
      icon: TrendingUp,
      title: "Analyses Prédictives",
      description: "IA pour anticiper les tendances et comparer les styles de jeu",
    },
    {
      icon: Users,
      title: "Suivi Personnalisé",
      description: "Analyses détaillées par joueur, équipe et compétition",
    },
    {
      icon: Zap,
      title: "Insights Instantanés",
      description: "Génération automatique d'analyses tactiques et statistiques",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Plateforme Data & IA</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Analytics du Sport
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Marocain
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            La première plateforme d'analyse data et IA dédiée aux performances des équipes nationales marocaines. 
            Des insights professionnels pour journalistes, coachs et médias sportifs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/dashboard">
              <Button size="lg" className="group shadow-glow-red hover:shadow-glow-red/50 transition-all duration-300">
                Accéder au Dashboard
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2">
              Découvrir l'Offre Pro
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-card backdrop-blur-sm border-border hover:shadow-elevated transition-all duration-300 hover:scale-105 group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-3 rounded-lg bg-gradient-primary w-fit mb-4 group-hover:shadow-glow-red transition-shadow duration-300">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 pb-20">
        <Card className="p-8 md:p-12 bg-gradient-card backdrop-blur-sm border-border hover:shadow-elevated transition-all duration-300 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">234</div>
              <div className="text-muted-foreground">Matchs Analysés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">156</div>
              <div className="text-muted-foreground">Joueurs Suivis</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">8.4/10</div>
              <div className="text-muted-foreground">Score Performance</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
