import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: Record<string, string> = {
    '': 'Accueil',
    'dashboard': 'Dashboard',
    'players': 'Joueurs',
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link 
        to="/" 
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <div key={name} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2" />
            {isLast ? (
              <span className="text-foreground font-medium">
                {breadcrumbNameMap[name] || name}
              </span>
            ) : (
              <Link 
                to={routeTo} 
                className="hover:text-foreground transition-colors"
              >
                {breadcrumbNameMap[name] || name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
