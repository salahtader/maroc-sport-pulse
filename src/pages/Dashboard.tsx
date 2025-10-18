import { useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Trophy } from "lucide-react";
import { PerformanceChart } from "@/components/PerformanceChart";
import { TeamComparison } from "@/components/TeamComparison";
import { AIInsights } from "@/components/AIInsights";
import { FilterPanel } from "@/components/FilterPanel";
import { TeamStats } from "@/components/TeamStats";
import { CompetitionPerformance } from "@/components/CompetitionPerformance";
import { RadarComparison } from "@/components/RadarComparison";
import { ExportButton } from "@/components/ExportButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { dataProvider, TeamType } from "@/lib/dataProvider";

const Dashboard = () => {
  const [selectedTeam, setSelectedTeam] = useState("seniorA");
  const [selectedCompetition, setSelectedCompetition] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
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
        <Breadcrumbs />
        
        <div className="mb-8 flex items-start justify-between animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
              Dashboard Sport Marocain
            </h1>
            <p className="text-muted-foreground">
              Analyse en temps réel des performances des équipes nationales • {dataProvider.getTeamLabel(selectedTeam as TeamType)}
            </p>
          </div>
          <ExportButton 
            competition={selectedCompetition} 
            period={selectedPeriod}
            team={selectedTeam}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex-1">
            <FilterPanel
              selectedTeam={selectedTeam}
              selectedCompetition={selectedCompetition}
              selectedPeriod={selectedPeriod}
              onTeamChange={setSelectedTeam}
              onCompetitionChange={setSelectedCompetition}
              onPeriodChange={setSelectedPeriod}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-card backdrop-blur-sm border-border hover:shadow-elevated transition-all duration-300 hover:scale-105 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
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
          <PerformanceChart 
            competition={selectedCompetition}
            period={selectedPeriod}
          />
          <TeamComparison 
            competition={selectedCompetition}
            period={selectedPeriod}
          />
        </div>

        {/* Team Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TeamStats selectedPlayer={selectedTeam} />
          </div>
          <CompetitionPerformance selectedPlayer={selectedTeam} />
        </div>

        {/* Radar Comparison */}
        <div className="mb-8">
          <RadarComparison selectedTeam={selectedTeam as TeamType} />
        </div>

        {/* AI Insights */}
        <AIInsights />
      </div>
    </div>
  );
};

export default Dashboard;
