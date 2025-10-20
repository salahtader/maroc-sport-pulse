import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  UserCircle,
  Calendar,
  BarChart3,
  Sparkles,
  CreditCard,
  Settings,
  ChevronRight,
  Shield,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface NavItem {
  title: string;
  url: string;
  icon: any;
  badge?: string;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Tableau de bord",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Équipes",
    url: "/teams",
    icon: Users,
    subItems: [
      { title: "Vue d'ensemble", url: "/teams", icon: BarChart3 },
      { title: "Comparaison", url: "/teams/comparison", icon: BarChart3 },
    ],
  },
  {
    title: "Joueurs",
    url: "/players",
    icon: UserCircle,
    subItems: [
      { title: "Liste", url: "/players", icon: Users },
      { title: "Statistiques", url: "/players/stats", icon: BarChart3 },
      { title: "Comparaison", url: "/players/comparison", icon: BarChart3 },
    ],
  },
  {
    title: "Matchs",
    url: "/matches",
    icon: Calendar,
    subItems: [
      { title: "Historique", url: "/matches", icon: Calendar },
      { title: "Analyses", url: "/matches/analysis", icon: BarChart3 },
    ],
  },
  {
    title: "Analyses",
    url: "/analytics",
    icon: BarChart3,
    subItems: [
      { title: "Performance", url: "/analytics/performance", icon: BarChart3 },
      { title: "Tactiques", url: "/analytics/tactical", icon: Shield },
    ],
  },
  {
    title: "IA & Recommandations",
    url: "/ai-analytics",
    icon: Sparkles,
    badge: "15",
  },
];

const bottomItems: NavItem[] = [
  {
    title: "Abonnement",
    url: "/subscription",
    icon: CreditCard,
  },
  {
    title: "Administration",
    url: "/admin",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { open: sidebarOpen } = useSidebar();
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<string[]>(["/teams", "/players", "/matches", "/analytics"]);

  const isActive = (url: string) => {
    if (url === "/dashboard") return location.pathname === "/" || location.pathname === "/dashboard";
    return location.pathname.startsWith(url);
  };

  const toggleGroup = (url: string) => {
    setOpenGroups((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  const renderNavItem = (item: NavItem, isSubItem = false) => {
    const Icon = item.icon;
    const active = isActive(item.url);

    if (item.subItems && sidebarOpen) {
      const isOpen = openGroups.includes(item.url);
      return (
        <Collapsible key={item.url} open={isOpen} onOpenChange={() => toggleGroup(item.url)}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={`w-full justify-between ${active ? "bg-primary/10 text-primary font-semibold" : ""}`}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </div>
              <ChevronRight
                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 space-y-1">
            {item.subItems.map((subItem) => renderNavItem(subItem, true))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <SidebarMenuItem key={item.url}>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.url}
            className={({ isActive }) =>
              `flex items-center gap-3 ${
                isActive || active
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-muted/50"
              } ${isSubItem ? "text-sm" : ""}`
            }
          >
            <Icon className="h-4 w-4" />
            {sidebarOpen && (
              <>
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <h2 className="font-bold text-sm">Morocco Sports</h2>
              <p className="text-xs text-muted-foreground">Analytics Pro</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={sidebarOpen ? "" : "sr-only"}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => renderNavItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {bottomItems.map((item) => renderNavItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <SidebarTrigger className="w-full" />
      </SidebarFooter>
    </Sidebar>
  );
}
