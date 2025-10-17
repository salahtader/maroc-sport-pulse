import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface FilterPanelProps {
  selectedTeam: string;
  selectedCompetition: string;
  selectedPeriod: string;
  onTeamChange: (value: string) => void;
  onCompetitionChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
}

export const FilterPanel = ({
  selectedTeam,
  selectedCompetition,
  selectedPeriod,
  onTeamChange,
  onCompetitionChange,
  onPeriodChange,
}: FilterPanelProps) => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Filtres d'analyse</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Équipe</label>
          <Select value={selectedTeam} onValueChange={onTeamChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seniorA">Équipe A (Seniors)</SelectItem>
              <SelectItem value="u23">Équipe U23</SelectItem>
              <SelectItem value="u20">Équipe U20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Compétition</label>
          <Select value={selectedCompetition} onValueChange={onCompetitionChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes compétitions</SelectItem>
              <SelectItem value="can">CAN 2024</SelectItem>
              <SelectItem value="mondial">Qualif. Mondial</SelectItem>
              <SelectItem value="amical">Matchs Amicaux</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Période</label>
          <Select value={selectedPeriod} onValueChange={onPeriodChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 derniers mois</SelectItem>
              <SelectItem value="6months">6 derniers mois</SelectItem>
              <SelectItem value="1year">Dernière année</SelectItem>
              <SelectItem value="2024">Année 2024</SelectItem>
              <SelectItem value="2023">Année 2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};
