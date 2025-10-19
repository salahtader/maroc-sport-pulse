import { Card } from "@/components/ui/card";
import { dataProvider } from "@/lib/dataProvider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PlayerEvolutionChartProps {
  playerId: string;
}

export const PlayerEvolutionChart = ({ playerId }: PlayerEvolutionChartProps) => {
  const evolution = dataProvider.getPlayerEvolution(playerId);
  const player = dataProvider.getPlayer(playerId);

  if (!player) return null;

  const chartData = evolution.map(e => ({
    date: new Date(e.date).toLocaleDateString('fr-FR', { month: 'short' }),
    Note: parseFloat(e.rating.toFixed(1)),
    Buts: e.goals,
    'Passes D.': e.assists,
    Matchs: e.matchesPlayed
  }));

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <h3 className="text-lg font-semibold mb-4">Évolution sur 12 mois</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            className="text-xs"
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis 
            className="text-xs"
            stroke="hsl(var(--muted-foreground))"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="Note" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))' }}
          />
          <Line 
            type="monotone" 
            dataKey="Buts" 
            stroke="hsl(var(--secondary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--secondary))' }}
          />
          <Line 
            type="monotone" 
            dataKey="Passes D." 
            stroke="hsl(var(--accent))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--accent))' }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="text-center p-3 bg-background/50 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Note moyenne</div>
          <div className="text-2xl font-bold text-primary">
            {(evolution.reduce((sum, e) => sum + e.rating, 0) / evolution.length).toFixed(1)}
          </div>
        </div>
        <div className="text-center p-3 bg-background/50 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Total buts</div>
          <div className="text-2xl font-bold text-secondary">
            {evolution[evolution.length - 1]?.goals || 0}
          </div>
        </div>
        <div className="text-center p-3 bg-background/50 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Total passes D.</div>
          <div className="text-2xl font-bold text-accent">
            {evolution[evolution.length - 1]?.assists || 0}
          </div>
        </div>
        <div className="text-center p-3 bg-background/50 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Total matchs</div>
          <div className="text-2xl font-bold">
            {evolution[evolution.length - 1]?.matchesPlayed || 0}
          </div>
        </div>
      </div>
    </Card>
  );
};
