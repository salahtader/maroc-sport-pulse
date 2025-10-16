import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Target, Shield, Activity, AlertCircle, TrendingUp } from "lucide-react";

const teamData = {
  seniorA: {
    results: { wins: 18, draws: 6, losses: 4, streak: "3V", ranking: 13 },
    offensive: { avgGoals: 2.1, xG: 2.3, shotsOnTarget: 5.8, chances: 12.4 },
    defensive: { goalsConceded: 0.8, cleanSheets: 15, fouls: 11.2, interceptions: 14.5 },
    possession: { avgPossession: 58, passAccuracy: 87, keyPasses: 8.3 },
    discipline: { yellowCards: 32, redCards: 2, foulsPerMatch: 11.2 },
    recentForm: [{ result: "V", score: "2-0" }, { result: "V", score: "3-1" }, { result: "V", score: "1-0" }, { result: "N", score: "1-1" }, { result: "V", score: "2-1" }],
  },
  u23: {
    results: { wins: 14, draws: 5, losses: 3, streak: "2V", ranking: 8 },
    offensive: { avgGoals: 1.8, xG: 2.0, shotsOnTarget: 5.2, chances: 10.8 },
    defensive: { goalsConceded: 1.1, cleanSheets: 11, fouls: 12.1, interceptions: 13.2 },
    possession: { avgPossession: 55, passAccuracy: 84, keyPasses: 7.1 },
    discipline: { yellowCards: 28, redCards: 1, foulsPerMatch: 12.1 },
    recentForm: [{ result: "V", score: "2-1" }, { result: "V", score: "1-0" }, { result: "D", score: "0-2" }, { result: "N", score: "2-2" }, { result: "V", score: "3-0" }],
  },
  u20: {
    results: { wins: 12, draws: 4, losses: 6, streak: "1D", ranking: 15 },
    offensive: { avgGoals: 1.5, xG: 1.7, shotsOnTarget: 4.5, chances: 9.2 },
    defensive: { goalsConceded: 1.3, cleanSheets: 8, fouls: 13.5, interceptions: 11.8 },
    possession: { avgPossession: 52, passAccuracy: 81, keyPasses: 6.2 },
    discipline: { yellowCards: 35, redCards: 3, foulsPerMatch: 13.5 },
    recentForm: [{ result: "D", score: "1-2" }, { result: "V", score: "2-0" }, { result: "V", score: "1-0" }, { result: "D", score: "0-1" }, { result: "N", score: "1-1" }],
  },
};

interface TeamStatsProps {
  selectedPlayer: string;
}

export const TeamStats = ({ selectedPlayer }: TeamStatsProps) => {
  const team = selectedPlayer === "seniorA" ? "seniorA" : selectedPlayer === "u23" ? "u23" : "u20";
  const data = teamData[team];

  const StatCard = ({ icon: Icon, title, value, subtitle }: any) => (
    <Card className="p-4 bg-card/50 backdrop-blur-sm border-border">
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-primary mt-1" />
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </div>
    </Card>
  );

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <h3 className="text-xl font-bold mb-6">Statistiques Détaillées</h3>
      
      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
          <TabsTrigger value="results">Résultats</TabsTrigger>
          <TabsTrigger value="offensive">Attaque</TabsTrigger>
          <TabsTrigger value="defensive">Défense</TabsTrigger>
          <TabsTrigger value="possession">Possession</TabsTrigger>
          <TabsTrigger value="discipline">Discipline</TabsTrigger>
          <TabsTrigger value="form">Forme</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard icon={Trophy} title="Victoires" value={data.results.wins} />
            <StatCard icon={Activity} title="Nuls" value={data.results.draws} />
            <StatCard icon={AlertCircle} title="Défaites" value={data.results.losses} />
            <StatCard icon={TrendingUp} title="Série en cours" value={data.results.streak} />
            <StatCard icon={Trophy} title="Classement FIFA" value={`#${data.results.ranking}`} />
            <StatCard 
              icon={Activity} 
              title="Win Rate" 
              value={`${Math.round((data.results.wins / (data.results.wins + data.results.draws + data.results.losses)) * 100)}%`} 
            />
          </div>
        </TabsContent>

        <TabsContent value="offensive" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Target} title="Buts/Match" value={data.offensive.avgGoals} />
            <StatCard icon={Target} title="xG" value={data.offensive.xG} subtitle="Expected Goals" />
            <StatCard icon={Target} title="Tirs cadrés" value={data.offensive.shotsOnTarget} subtitle="Par match" />
            <StatCard icon={Target} title="Occasions créées" value={data.offensive.chances} subtitle="Par match" />
          </div>
        </TabsContent>

        <TabsContent value="defensive" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Shield} title="Buts encaissés" value={data.defensive.goalsConceded} subtitle="Par match" />
            <StatCard icon={Shield} title="Clean Sheets" value={data.defensive.cleanSheets} />
            <StatCard icon={Shield} title="Fautes concédées" value={data.defensive.fouls} subtitle="Par match" />
            <StatCard icon={Shield} title="Interceptions" value={data.defensive.interceptions} subtitle="Par match" />
          </div>
        </TabsContent>

        <TabsContent value="possession" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard icon={Activity} title="Possession moyenne" value={`${data.possession.avgPossession}%`} />
            <StatCard icon={Activity} title="Précision passes" value={`${data.possession.passAccuracy}%`} />
            <StatCard icon={Activity} title="Passes clés" value={data.possession.keyPasses} subtitle="Par match" />
          </div>
        </TabsContent>

        <TabsContent value="discipline" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard icon={AlertCircle} title="Cartons jaunes" value={data.discipline.yellowCards} />
            <StatCard icon={AlertCircle} title="Cartons rouges" value={data.discipline.redCards} />
            <StatCard icon={AlertCircle} title="Fautes/Match" value={data.discipline.foulsPerMatch} />
          </div>
        </TabsContent>

        <TabsContent value="form" className="space-y-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">5 derniers matchs</h4>
            <div className="flex gap-2">
              {data.recentForm.map((match, index) => (
                <div
                  key={index}
                  className={`flex-1 p-4 rounded-lg border ${
                    match.result === "V"
                      ? "bg-green-500/10 border-green-500/20"
                      : match.result === "N"
                      ? "bg-yellow-500/10 border-yellow-500/20"
                      : "bg-red-500/10 border-red-500/20"
                  }`}
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold mb-1">{match.result}</p>
                    <p className="text-xs text-muted-foreground">{match.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
