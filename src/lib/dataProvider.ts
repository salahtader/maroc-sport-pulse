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

// Player data structures
export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'GK' | 'DEF' | 'MID' | 'ATT';
  team: TeamType;
  age: number;
  club: string;
  nationality: string;
  photo?: string;
}

export interface PlayerStats {
  playerId: string;
  // Performance
  matchesPlayed: number;
  minutesPlayed: number;
  starts: number;
  // Offensive
  goals: number;
  assists: number;
  shotsTotal: number;
  shotsOnTarget: number;
  xG: number; // Expected Goals
  xA: number; // Expected Assists
  keyPasses: number;
  dribbles: number;
  dribblesSuccess: number;
  // Defensive
  tackles: number;
  interceptions: number;
  clearances: number;
  blocks: number;
  duelsWon: number;
  duelsTotal: number;
  aerialWon: number;
  aerialTotal: number;
  // Passing
  passes: number;
  passesCompleted: number;
  passAccuracy: number;
  longBalls: number;
  longBallsCompleted: number;
  crosses: number;
  crossesCompleted: number;
  // Discipline
  yellowCards: number;
  redCards: number;
  foulsCommitted: number;
  foulsSuffered: number;
  // Goalkeeper specific
  saves?: number;
  cleanSheets?: number;
  goalsConceded?: number;
  penaltiesSaved?: number;
  savePercentage?: number;
}

const playersData: Player[] = [
  // Senior A - Gardiens
  { id: '1', name: 'Yassine Bounou', number: 1, position: 'GK', team: 'seniorA', age: 32, club: 'Al-Hilal', nationality: 'MAR' },
  { id: '2', name: 'Munir Mohamedi', number: 12, position: 'GK', team: 'seniorA', age: 35, club: 'Al-Wehda', nationality: 'MAR' },
  // Senior A - Défenseurs
  { id: '3', name: 'Achraf Hakimi', number: 2, position: 'DEF', team: 'seniorA', age: 25, club: 'PSG', nationality: 'MAR' },
  { id: '4', name: 'Noussair Mazraoui', number: 3, position: 'DEF', team: 'seniorA', age: 26, club: 'Manchester United', nationality: 'MAR' },
  { id: '5', name: 'Romain Saïss', number: 6, position: 'DEF', team: 'seniorA', age: 34, club: 'Al-Shabab', nationality: 'MAR' },
  { id: '6', name: 'Nayef Aguerd', number: 5, position: 'DEF', team: 'seniorA', age: 28, club: 'West Ham', nationality: 'MAR' },
  { id: '7', name: 'Achraf Dari', number: 15, position: 'DEF', team: 'seniorA', age: 24, club: 'Brest', nationality: 'MAR' },
  // Senior A - Milieux
  { id: '8', name: 'Sofyan Amrabat', number: 4, position: 'MID', team: 'seniorA', age: 27, club: 'Fiorentina', nationality: 'MAR' },
  { id: '9', name: 'Azzedine Ounahi', number: 8, position: 'MID', team: 'seniorA', age: 24, club: 'Marseille', nationality: 'MAR' },
  { id: '10', name: 'Bilal El Khannouss', number: 17, position: 'MID', team: 'seniorA', age: 20, club: 'Genk', nationality: 'MAR' },
  { id: '11', name: 'Hakim Ziyech', number: 7, position: 'MID', team: 'seniorA', age: 31, club: 'Galatasaray', nationality: 'MAR' },
  { id: '12', name: 'Amine Adli', number: 20, position: 'MID', team: 'seniorA', age: 23, club: 'Bayer Leverkusen', nationality: 'MAR' },
  // Senior A - Attaquants
  { id: '13', name: 'Youssef En-Nesyri', number: 19, position: 'ATT', team: 'seniorA', age: 27, club: 'Sevilla', nationality: 'MAR' },
  { id: '14', name: 'Ayoub El Kaabi', number: 9, position: 'ATT', team: 'seniorA', age: 30, club: 'Olympiacos', nationality: 'MAR' },
  { id: '15', name: 'Soufiane Rahimi', number: 11, position: 'ATT', team: 'seniorA', age: 28, club: 'Al-Ain', nationality: 'MAR' },
  
  // U23 - Selection
  { id: '16', name: 'Munir El Kajoui', number: 1, position: 'GK', team: 'u23', age: 22, club: 'RS Berkane', nationality: 'MAR' },
  { id: '17', name: 'Akram Nakach', number: 4, position: 'DEF', team: 'u23', age: 23, club: 'FAR Rabat', nationality: 'MAR' },
  { id: '18', name: 'Oussama Targhalline', number: 5, position: 'DEF', team: 'u23', age: 22, club: 'Le Havre', nationality: 'MAR' },
  { id: '19', name: 'Amir Richardson', number: 6, position: 'MID', team: 'u23', age: 22, club: 'Reims', nationality: 'MAR' },
  { id: '20', name: 'Eliesse Ben Seghir', number: 10, position: 'MID', team: 'u23', age: 19, club: 'Monaco', nationality: 'MAR' },
  { id: '21', name: 'Ilias Akhomach', number: 7, position: 'ATT', team: 'u23', age: 20, club: 'Villarreal', nationality: 'MAR' },
  { id: '22', name: 'Abde Ezzalzouli', number: 11, position: 'ATT', team: 'u23', age: 22, club: 'Real Betis', nationality: 'MAR' },
  
  // U20 - Selection
  { id: '23', name: 'Ayoub Lakred', number: 1, position: 'GK', team: 'u20', age: 19, club: 'Wydad Casablanca', nationality: 'MAR' },
  { id: '24', name: 'Adam Aznou', number: 3, position: 'DEF', team: 'u20', age: 18, club: 'Bayern Munich', nationality: 'MAR' },
  { id: '25', name: 'Marouane Essalhi', number: 8, position: 'MID', team: 'u20', age: 19, club: 'Raja Casablanca', nationality: 'MAR' },
  { id: '26', name: 'Naoufel El Hannach', number: 10, position: 'MID', team: 'u20', age: 19, club: 'AS FAR', nationality: 'MAR' },
  { id: '27', name: 'Abdelhamid Aït Boudlal', number: 9, position: 'ATT', team: 'u20', age: 19, club: 'FUS Rabat', nationality: 'MAR' },
];

const playerStatsData: Record<string, PlayerStats> = {
  '1': { playerId: '1', matchesPlayed: 12, minutesPlayed: 1080, starts: 12, goals: 0, assists: 0, shotsTotal: 0, shotsOnTarget: 0, xG: 0, xA: 0, keyPasses: 3, dribbles: 2, dribblesSuccess: 2, tackles: 0, interceptions: 1, clearances: 8, blocks: 2, duelsWon: 5, duelsTotal: 8, aerialWon: 3, aerialTotal: 5, passes: 280, passesCompleted: 245, passAccuracy: 87.5, longBalls: 85, longBallsCompleted: 52, crosses: 0, crossesCompleted: 0, yellowCards: 1, redCards: 0, foulsCommitted: 0, foulsSuffered: 2, saves: 48, cleanSheets: 6, goalsConceded: 8, penaltiesSaved: 2, savePercentage: 85.7 },
  '3': { playerId: '3', matchesPlayed: 11, minutesPlayed: 990, starts: 11, goals: 2, assists: 4, shotsTotal: 15, shotsOnTarget: 8, xG: 1.8, xA: 3.5, keyPasses: 18, dribbles: 42, dribblesSuccess: 28, tackles: 18, interceptions: 12, clearances: 22, blocks: 5, duelsWon: 68, duelsTotal: 95, aerialWon: 12, aerialTotal: 22, passes: 520, passesCompleted: 458, passAccuracy: 88.1, longBalls: 32, longBallsCompleted: 22, crosses: 45, crossesCompleted: 18, yellowCards: 2, redCards: 0, foulsCommitted: 8, foulsSuffered: 15 },
  '8': { playerId: '8', matchesPlayed: 10, minutesPlayed: 850, starts: 9, goals: 1, assists: 2, shotsTotal: 8, shotsOnTarget: 3, xG: 1.2, xA: 2.8, keyPasses: 12, dribbles: 18, dribblesSuccess: 12, tackles: 38, interceptions: 22, clearances: 15, blocks: 8, duelsWon: 95, duelsTotal: 128, aerialWon: 28, aerialTotal: 42, passes: 680, passesCompleted: 612, passAccuracy: 90.0, longBalls: 48, longBallsCompleted: 35, crosses: 8, crossesCompleted: 4, yellowCards: 4, redCards: 0, foulsCommitted: 18, foulsSuffered: 22 },
  '11': { playerId: '11', matchesPlayed: 9, minutesPlayed: 720, starts: 7, goals: 3, assists: 5, shotsTotal: 28, shotsOnTarget: 14, xG: 3.5, xA: 4.2, keyPasses: 24, dribbles: 35, dribblesSuccess: 22, tackles: 8, interceptions: 5, clearances: 3, blocks: 2, duelsWon: 42, duelsTotal: 68, aerialWon: 5, aerialTotal: 12, passes: 420, passesCompleted: 352, passAccuracy: 83.8, longBalls: 18, longBallsCompleted: 12, crosses: 38, crossesCompleted: 15, yellowCards: 1, redCards: 0, foulsCommitted: 6, foulsSuffered: 18 },
  '13': { playerId: '13', matchesPlayed: 11, minutesPlayed: 920, starts: 10, goals: 8, assists: 3, shotsTotal: 42, shotsOnTarget: 22, xG: 6.8, xA: 2.5, keyPasses: 15, dribbles: 28, dribblesSuccess: 18, tackles: 5, interceptions: 3, clearances: 2, blocks: 1, duelsWon: 52, duelsTotal: 88, aerialWon: 38, aerialTotal: 58, passes: 285, passesCompleted: 228, passAccuracy: 80.0, longBalls: 5, longBallsCompleted: 3, crosses: 2, crossesCompleted: 1, yellowCards: 2, redCards: 0, foulsCommitted: 12, foulsSuffered: 32 },
  // U23 stats
  '20': { playerId: '20', matchesPlayed: 8, minutesPlayed: 680, starts: 7, goals: 4, assists: 6, shotsTotal: 24, shotsOnTarget: 15, xG: 3.8, xA: 5.2, keyPasses: 28, dribbles: 48, dribblesSuccess: 35, tackles: 8, interceptions: 6, clearances: 2, blocks: 1, duelsWon: 52, duelsTotal: 78, aerialWon: 8, aerialTotal: 15, passes: 385, passesCompleted: 328, passAccuracy: 85.2, longBalls: 12, longBallsCompleted: 8, crosses: 22, crossesCompleted: 10, yellowCards: 1, redCards: 0, foulsCommitted: 8, foulsSuffered: 24 },
  '21': { playerId: '21', matchesPlayed: 8, minutesPlayed: 640, starts: 7, goals: 5, assists: 4, shotsTotal: 28, shotsOnTarget: 16, xG: 4.5, xA: 3.8, keyPasses: 18, dribbles: 42, dribblesSuccess: 28, tackles: 6, interceptions: 4, clearances: 1, blocks: 0, duelsWon: 48, duelsTotal: 72, aerialWon: 6, aerialTotal: 12, passes: 295, passesCompleted: 242, passAccuracy: 82.0, longBalls: 8, longBallsCompleted: 5, crosses: 18, crossesCompleted: 8, yellowCards: 2, redCards: 0, foulsCommitted: 10, foulsSuffered: 20 },
  // U20 stats
  '27': { playerId: '27', matchesPlayed: 6, minutesPlayed: 480, starts: 5, goals: 6, assists: 2, shotsTotal: 22, shotsOnTarget: 14, xG: 5.2, xA: 1.8, keyPasses: 8, dribbles: 18, dribblesSuccess: 12, tackles: 4, interceptions: 2, clearances: 1, blocks: 0, duelsWon: 28, duelsTotal: 45, aerialWon: 12, aerialTotal: 18, passes: 185, passesCompleted: 148, passAccuracy: 80.0, longBalls: 3, longBallsCompleted: 2, crosses: 2, crossesCompleted: 1, yellowCards: 1, redCards: 0, foulsCommitted: 8, foulsSuffered: 15 },
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

  // Player data methods
  getPlayers: (team?: TeamType, position?: Player['position']): Player[] => {
    let filtered = [...playersData];
    if (team) {
      filtered = filtered.filter(p => p.team === team);
    }
    if (position) {
      filtered = filtered.filter(p => p.position === position);
    }
    return filtered;
  },

  getPlayer: (id: string): Player | undefined => {
    return playersData.find(p => p.id === id);
  },

  getPlayerStats: (playerId: string): PlayerStats | undefined => {
    return playerStatsData[playerId];
  },

  getPositionLabel: (position: Player['position']): string => {
    const labels = {
      'GK': 'Gardien',
      'DEF': 'Défenseur',
      'MID': 'Milieu',
      'ATT': 'Attaquant',
    };
    return labels[position];
  },
};
