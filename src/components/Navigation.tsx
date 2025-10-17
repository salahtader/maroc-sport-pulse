import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-primary group-hover:shadow-glow-red transition-shadow duration-300">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-lg">Morocco Sports Analytics</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button
                variant={location.pathname === "/" ? "default" : "ghost"}
                className="hover:bg-primary/10"
              >
                Accueil
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant={location.pathname === "/dashboard" ? "default" : "ghost"}
                className="hover:bg-primary/10"
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/players">
              <Button
                variant={location.pathname === "/players" ? "default" : "ghost"}
                className="hover:bg-primary/10"
              >
                Joueurs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
