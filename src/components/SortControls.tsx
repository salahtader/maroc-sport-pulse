import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type SortOption = 
  | 'name'
  | 'age'
  | 'goals'
  | 'assists'
  | 'rating'
  | 'minutesPlayed';

export type SortDirection = 'asc' | 'desc';

interface SortControlsProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (sortBy: SortOption, direction: SortDirection) => void;
}

export const SortControls = ({ sortBy, sortDirection, onSortChange }: SortControlsProps) => {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name', label: 'Nom' },
    { value: 'age', label: 'Âge' },
    { value: 'goals', label: 'Buts' },
    { value: 'assists', label: 'Passes D.' },
    { value: 'rating', label: 'Note' },
    { value: 'minutesPlayed', label: 'Minutes' },
  ];

  const currentLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Trier';

  const toggleDirection = () => {
    onSortChange(sortBy, sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            {currentLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onSortChange(option.value, sortDirection)}
              className={sortBy === option.value ? 'bg-muted' : ''}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button 
        variant="outline" 
        size="icon"
        onClick={toggleDirection}
        className="gap-2"
      >
        {sortDirection === 'asc' ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
