// Centralized data provider for the application
// This simulates a real API but provides a clean interface for data access

export type TeamType = 'seniorA' | 'u23' | 'u20';
export type CompetitionType = 'all' | 'can' | 'mondial' | 'amical';
export type PeriodType = '3months' | '6months' | '1year' | '2024' | '2023';

interface PerformanceData {
  month: string;
  seniorA: number;
  u23: number;
  u20: number;
}

interface ComparisonData {
  category: string;
  value: number;
  comparison: number;
}

// Generate data based on period
const generateDataForPeriod = (period: PeriodType, competition: CompetitionType): PerformanceData[] => {
  const baseData = {
    can: [
      { month: "Jan", seniorA: 82, u23: 75, u20: 68 },
      { month: "Fév", seniorA: 85, u23: 78, u20: 72 },
      { month: "Mar", seniorA: 88, u23: 80, u20: 75 },
      { month: "Avr", seniorA: 90, u23: 82, u20: 78 },
      { month: "Mai", seniorA: 92, u23: 85, u20: 80 },
      { month: "Jun", seniorA: 91, u23: 87, u20: 82 },
    ],
    mondial: [
      { month: "Jan", seniorA: 75, u23: 68, u20: 62 },
      { month: "Fév", seniorA: 78, u23: 70, u20: 65 },
      { month: "Mar", seniorA: 82, u23: 72, u20: 68 },
      { month: "Avr", seniorA: 85, u23: 75, u20: 70 },
      { month: "Mai", seniorA: 88, u23: 78, u20: 73 },
      { month: "Jun", seniorA: 84, u23: 76, u20: 71 },
    ],
    amical: [
      { month: "Jan", seniorA: 70, u23: 65, u20: 60 },
      { month: "Fév", seniorA: 73, u23: 67, u20: 62 },
      { month: "Mar", seniorA: 76, u23: 70, u20: 65 },
      { month: "Avr", seniorA: 78, u23: 72, u20: 67 },
      { month: "Mai", seniorA: 80, u23: 74, u20: 69 },
      { month: "Jun", seniorA: 79, u23: 73, u20: 68 },
    ],
    all: [
      { month: "Jan", seniorA: 85, u23: 78, u20: 72 },
      { month: "Fév", seniorA: 88, u23: 80, u20: 75 },
      { month: "Mar", seniorA: 82, u23: 83, u20: 78 },
      { month: "Avr", seniorA: 90, u23: 85, u20: 80 },
      { month: "Mai", seniorA: 92, u23: 87, u20: 82 },
      { month: "Jun", seniorA: 89, u23: 88, u20: 85 },
    ],
  };

  const data = baseData[competition];
  
  // Filter based on period
  switch (period) {
    case '3months':
      return data.slice(-3);
    case '6months':
      return data.slice(-6);
    case '1year':
      return data;
    case '2024':
      return data.slice(0, 6);
    case '2023':
      // Simulate 2023 data with slightly lower values
      return data.map(d => ({
        ...d,
        seniorA: d.seniorA - 5,
        u23: d.u23 - 5,
        u20: d.u20 - 5,
      }));
    default:
      return data;
  }
};

const generateComparisonData = (competition: CompetitionType): ComparisonData[] => {
  const baseData = {
    can: [
      { category: "Possession", value: 65, comparison: 60 },
      { category: "Passes", value: 92, comparison: 85 },
      { category: "Tirs", value: 78, comparison: 70 },
      { category: "Défense", value: 88, comparison: 82 },
    ],
    mondial: [
      { category: "Possession", value: 62, comparison: 58 },
      { category: "Passes", value: 88, comparison: 80 },
      { category: "Tirs", value: 75, comparison: 68 },
      { category: "Défense", value: 85, comparison: 78 },
    ],
    amical: [
      { category: "Possession", value: 58, comparison: 55 },
      { category: "Passes", value: 82, comparison: 76 },
      { category: "Tirs", value: 70, comparison: 65 },
      { category: "Défense", value: 80, comparison: 75 },
    ],
    all: [
      { category: "Possession", value: 62, comparison: 58 },
      { category: "Passes", value: 87, comparison: 80 },
      { category: "Tirs", value: 74, comparison: 68 },
      { category: "Défense", value: 84, comparison: 78 },
    ],
  };

  return baseData[competition];
};

export const dataProvider = {
  getPerformanceData: (competition: CompetitionType, period: PeriodType): PerformanceData[] => {
    // Simulate API delay
    return generateDataForPeriod(period, competition);
  },

  getComparisonData: (competition: CompetitionType): ComparisonData[] => {
    return generateComparisonData(competition);
  },

  getTeamLabel: (team: TeamType): string => {
    const labels = {
      seniorA: 'Équipe A',
      u23: 'Équipe U23',
      u20: 'Équipe U20',
    };
    return labels[team];
  },

  getCompetitionLabel: (competition: CompetitionType): string => {
    const labels = {
      all: 'Toutes compétitions',
      can: 'CAN 2024',
      mondial: 'Qualif. Mondial',
      amical: 'Matchs Amicaux',
    };
    return labels[competition];
  },

  getPeriodLabel: (period: PeriodType): string => {
    const labels = {
      '3months': '3 derniers mois',
      '6months': '6 derniers mois',
      '1year': 'Dernière année',
      '2024': 'Année 2024',
      '2023': 'Année 2023',
    };
    return labels[period];
  },
};
