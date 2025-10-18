import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface QuickStatProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export const QuickStats = ({ stats }: { stats: QuickStatProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="p-6 bg-gradient-card backdrop-blur-sm border-border hover:shadow-elevated transition-all duration-300 hover:scale-105 cursor-pointer animate-scale-in group"
          style={{ animationDelay: `${(stat.delay || index) * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-primary group-hover:shadow-glow-red transition-shadow duration-300`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
              stat.change.startsWith('+') ? 'bg-secondary/20 text-secondary' : 'bg-destructive/20 text-destructive'
            }`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
          <p className="text-sm text-muted-foreground">{stat.title}</p>
        </Card>
      ))}
    </div>
  );
};
