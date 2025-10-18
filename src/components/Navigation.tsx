import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Accueil" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/players", label: "Joueurs" },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 animate-slide-in">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-primary group-hover:shadow-glow-red transition-all duration-300">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-lg group-hover:text-primary transition-colors">
              Morocco Sports Analytics
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className="hover:bg-primary/10 transition-all duration-300 relative group"
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-slide-in" />
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
