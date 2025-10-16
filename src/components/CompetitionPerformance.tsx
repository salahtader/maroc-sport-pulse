import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const competitionsData = {
  seniorA: [
    { name: "CAN 2024", matches: 7, wins: 5, draws: 1, losses: 1, winRate: 71 },
    { name: "Qualif. Mondial", matches: 6, wins: 4, draws: 2, losses: 0, winRate: 67 },
    { name: "Matchs Amicaux", matches: 8, wins: 6, draws: 1, losses: 1, winRate: 75 },
  ],
  u23: [
    { name: "CAN U23", matches: 6, wins: 4, draws: 1, losses: 1, winRate: 67 },
    { name: "Qualif. JO", matches: 5, wins: 3, draws: 2, losses: 0, winRate: 60 },
    { name: "Matchs Amicaux", matches: 6, wins: 4, draws: 1, losses: 1, winRate: 67 },
  ],
  u20: [
    { name: "CAN U20", matches: 5, wins: 3, draws: 1, losses: 1, winRate: 60 },
    { name: "Mondial U20", matches: 4, wins: 2, draws: 1, losses: 1, winRate: 50 },
    { name: "Matchs Amicaux", matches: 7, wins: 4, draws: 2, losses: 1, winRate: 57 },
  ],
};

interface CompetitionPerformanceProps {
  selectedPlayer: string;
}

export const CompetitionPerformance = ({ selectedPlayer }: CompetitionPerformanceProps) => {
  const team = selectedPlayer === "seniorA" ? "seniorA" : selectedPlayer === "u23" ? "u23" : "u20";
  const competitions = competitionsData[team];

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <h3 className="text-xl font-bold mb-6">Performance par Compétition</h3>
      <div className="space-y-6">
        {competitions.map((comp, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{comp.name}</h4>
              <span className="text-sm text-muted-foreground">{comp.matches} matchs</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-2xl font-bold text-green-500">{comp.wins}</p>
                <p className="text-xs text-muted-foreground">Victoires</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-2xl font-bold text-yellow-500">{comp.draws}</p>
                <p className="text-xs text-muted-foreground">Nuls</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-2xl font-bold text-red-500">{comp.losses}</p>
                <p className="text-xs text-muted-foreground">Défaites</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Taux de victoire</span>
                <span className="font-semibold">{comp.winRate}%</span>
              </div>
              <Progress value={comp.winRate} className="h-2" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
