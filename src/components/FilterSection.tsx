import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export interface Filter {
  id: string;
  label: string;
  options: string[];
}

interface FilterSectionProps {
  filters: Filter[];
  onFilterChange: (filterId: string, value: string) => void;
  activeFilters: Record<string, string>;
}

export const FilterSection = ({ filters, onFilterChange, activeFilters }: FilterSectionProps) => {
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(new Set());

  const toggleFilter = (filterId: string) => {
    const newExpanded = new Set(expandedFilters);
    if (newExpanded.has(filterId)) {
      newExpanded.delete(filterId);
    } else {
      newExpanded.add(filterId);
    }
    setExpandedFilters(newExpanded);
  };

  return (
    <div className="w-full space-y-6">
      {filters.map((filter) => {
        const isExpanded = expandedFilters.has(filter.id);
        const activeValue = activeFilters[filter.id] || "All";

        return (
          <div key={filter.id} className="space-y-3">
            <button
              onClick={() => toggleFilter(filter.id)}
              className="flex items-center justify-between w-full text-left group"
            >
              <h3 className="text-sm font-medium text-foreground group-hover:text-accent transition-smooth">
                {filter.label}
              </h3>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid gap-2 transition-all duration-300 ease-in-out ${
                isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex flex-wrap gap-2 pb-2">
                  {filter.options.map((option) => (
                    <Button
                      key={option}
                      variant={activeValue === option ? "filter-active" : "filter"}
                      size="sm"
                      onClick={() => onFilterChange(filter.id, option)}
                      className="rounded-full"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
