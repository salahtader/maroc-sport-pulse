import { Card } from "@/components/ui/card";

interface Player {
  position: string;
  x: number; // 0-100
  y: number; // 0-100
  name?: string;
}

interface TacticalFieldProps {
  formation?: string;
  players?: Player[];
  title?: string;
  highlights?: { x: number; y: number; radius: number; color: string; label?: string }[];
}

export const TacticalField = ({ 
  formation = "4-3-3", 
  players = [],
  title = "Schéma Tactique",
  highlights = []
}: TacticalFieldProps) => {
  const defaultFormations: Record<string, Player[]> = {
    "4-3-3": [
      { position: "GK", x: 50, y: 95 },
      { position: "LB", x: 20, y: 75 }, { position: "CB", x: 40, y: 80 }, { position: "CB", x: 60, y: 80 }, { position: "RB", x: 80, y: 75 },
      { position: "CM", x: 30, y: 55 }, { position: "CM", x: 50, y: 50 }, { position: "CM", x: 70, y: 55 },
      { position: "LW", x: 20, y: 25 }, { position: "ST", x: 50, y: 20 }, { position: "RW", x: 80, y: 25 }
    ],
    "4-4-2": [
      { position: "GK", x: 50, y: 95 },
      { position: "LB", x: 20, y: 75 }, { position: "CB", x: 40, y: 80 }, { position: "CB", x: 60, y: 80 }, { position: "RB", x: 80, y: 75 },
      { position: "LM", x: 20, y: 50 }, { position: "CM", x: 40, y: 55 }, { position: "CM", x: 60, y: 55 }, { position: "RM", x: 80, y: 50 },
      { position: "ST", x: 40, y: 20 }, { position: "ST", x: 60, y: 20 }
    ],
    "3-5-2": [
      { position: "GK", x: 50, y: 95 },
      { position: "CB", x: 30, y: 80 }, { position: "CB", x: 50, y: 82 }, { position: "CB", x: 70, y: 80 },
      { position: "LWB", x: 15, y: 60 }, { position: "CM", x: 35, y: 55 }, { position: "CM", x: 50, y: 50 }, { position: "CM", x: 65, y: 55 }, { position: "RWB", x: 85, y: 60 },
      { position: "ST", x: 40, y: 20 }, { position: "ST", x: 60, y: 20 }
    ]
  };

  const displayPlayers = players.length > 0 ? players : (defaultFormations[formation] || defaultFormations["4-3-3"]);

  return (
    <Card className="p-6 bg-gradient-to-b from-card to-card/50">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-primary">⚽</span> {title} - {formation}
      </h3>
      
      <div className="relative w-full aspect-[2/3] bg-gradient-to-b from-green-600 to-green-700 rounded-lg overflow-hidden shadow-lg">
        {/* Field lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Outer border */}
          <rect x="2" y="2" width="96" height="96" fill="none" stroke="white" strokeWidth="0.3" opacity="0.6" />
          
          {/* Center line */}
          <line x1="2" y1="50" x2="98" y2="50" stroke="white" strokeWidth="0.3" opacity="0.6" />
          
          {/* Center circle */}
          <circle cx="50" cy="50" r="8" fill="none" stroke="white" strokeWidth="0.3" opacity="0.6" />
          <circle cx="50" cy="50" r="0.5" fill="white" opacity="0.6" />
          
          {/* Top penalty area */}
          <rect x="25" y="2" width="50" height="15" fill="none" stroke="white" strokeWidth="0.3" opacity="0.6" />
          <rect x="38" y="2" width="24" height="7" fill="none" stroke="white" strokeWidth="0.3" opacity="0.6" />
          <circle cx="50" cy="12" r="0.5" fill="white" opacity="0.6" />
          
          {/* Bottom penalty area */}
          <rect x="25" y="83" width="50" height="15" fill="none" stroke="white" strokeWidth="0.3" opacity="0.6" />
          <rect x="38" y="91" width="24" height="7" fill="none" stroke="white" strokeWidth="0.3" opacity="0.6" />
          <circle cx="50" cy="88" r="0.5" fill="white" opacity="0.6" />
        </svg>

        {/* Highlights zones */}
        {highlights.map((highlight, idx) => (
          <div
            key={idx}
            className="absolute rounded-full flex items-center justify-center"
            style={{
              left: `${highlight.x}%`,
              top: `${highlight.y}%`,
              width: `${highlight.radius}%`,
              height: `${highlight.radius * 1.5}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: highlight.color,
              opacity: 0.3,
              border: `2px solid ${highlight.color}`,
            }}
          >
            {highlight.label && (
              <span className="text-xs font-bold text-white drop-shadow-lg">
                {highlight.label}
              </span>
            )}
          </div>
        ))}

        {/* Players */}
        {displayPlayers.map((player, idx) => (
          <div
            key={idx}
            className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${player.x}%`, top: `${player.y}%` }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-primary rounded-full border-3 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <span className="text-xs font-bold text-white">{player.position}</span>
              </div>
              {player.name && (
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {player.name}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
          <span>Joueurs</span>
        </div>
        {highlights.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500/30 border-2 border-yellow-500 rounded-full"></div>
            <span>Zones clés</span>
          </div>
        )}
      </div>
    </Card>
  );
};
