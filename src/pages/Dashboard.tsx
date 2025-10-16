import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Trophy } from "lucide-react";
import { PerformanceChart } from "@/components/PerformanceChart";
import { TeamComparison } from "@/components/TeamComparison";
import { AIInsights } from "@/components/AIInsights";

const Dashboard = () => {
  const stats = [
    {
      title: "Matchs Analysés",
      value: "234",
      change: "+12%",
      icon: BarChart3,
      color: "text-primary",
    },
    {
      title: "Taux de Victoire",
      value: "68%",
      change: "+5%",
      icon: Trophy,
      color: "text-secondary",
    },
    {
      title: "Joueurs Suivis",
      value: "156",
      change: "+23",
      icon: Users,
      color: "text-accent",
    },
    {
      title: "Performance Globale",
      value: "8.4/10",
      change: "+0.6",
      icon: TrendingUp,
      color: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Dashboard Sport Marocain
          </h1>
          <p className="text-muted-foreground">
            Analyse en temps réel des performances des équipes nationales
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-sm text-secondary font-semibold">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PerformanceChart />
          <TeamComparison />
        </div>

        {/* AI Insights */}
        <AIInsights />
      </div>
    </div>
  );
};

export default Dashboard;
