import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, Table } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ExportButtonProps {
  competition: string;
  period: string;
  team: string;
}

export const ExportButton = ({ competition, period, team }: ExportButtonProps) => {
  const handleExport = (format: 'pdf' | 'csv') => {
    // Simulate export functionality
    toast({
      title: "Export en cours",
      description: `Génération du rapport ${format.toUpperCase()} pour ${competition} - ${period}...`,
    });

    // In a real app, this would trigger actual export
    setTimeout(() => {
      toast({
        title: "Export réussi",
        description: `Rapport ${format.toUpperCase()} téléchargé avec succès.`,
      });
    }, 1500);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('pdf')} className="gap-2">
          <FileText className="h-4 w-4" />
          Exporter en PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('csv')} className="gap-2">
          <Table className="h-4 w-4" />
          Exporter en CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
