import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Players from "./pages/Players";
import Matches from "./pages/Matches";
import Teams from "./pages/Teams";
import AIAnalytics from "./pages/AIAnalytics";
import Analytics from "./pages/Analytics";
import Subscription from "./pages/Subscription";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/*"
            element={
              <SidebarProvider defaultOpen>
                <div className="flex min-h-screen w-full bg-background">
                  <AppSidebar />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/teams/*" element={<Teams />} />
                    <Route path="/players" element={<Players />} />
                    <Route path="/players/*" element={<Players />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path="/matches/*" element={<Matches />} />
                    <Route path="/analytics/*" element={<Analytics />} />
                    <Route path="/ai-analytics" element={<AIAnalytics />} />
                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </SidebarProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
