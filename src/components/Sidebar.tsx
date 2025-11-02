import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterGroup {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

const filterGroups: FilterGroup[] = [
  {
    id: "category",
    label: "IDEAL FOR",
    options: [
      { value: "all", label: "All" },
      { value: "men", label: "Men" },
      { value: "women", label: "Women" },
      { value: "kids", label: "Baby & Kids" },
    ],
  },
  {
    id: "occasion",
    label: "OCCASION",
    options: [
      { value: "all", label: "All" },
      { value: "casual", label: "Casual" },
      { value: "formal", label: "Formal" },
      { value: "party", label: "Party" },
    ],
  },
  {
    id: "work",
    label: "WORK",
    options: [
      { value: "all", label: "All" },
      { value: "handmade", label: "Handmade" },
      { value: "machine", label: "Machine Made" },
    ],
  },
  {
    id: "fabric",
    label: "FABRIC",
    options: [
      { value: "all", label: "All" },
      { value: "cotton", label: "Cotton" },
      { value: "silk", label: "Silk" },
      { value: "wool", label: "Wool" },
    ],
  },
  {
    id: "segment",
    label: "SEGMENT",
    options: [
      { value: "all", label: "All" },
      { value: "premium", label: "Premium" },
      { value: "budget", label: "Budget" },
    ],
  },
  {
    id: "materials",
    label: "RAW MATERIALS",
    options: [
      { value: "all", label: "All" },
      { value: "organic", label: "Organic" },
      { value: "synthetic", label: "Synthetic" },
    ],
  },
  {
    id: "pattern",
    label: "PATTERN",
    options: [
      { value: "all", label: "All" },
      { value: "solid", label: "Solid" },
      { value: "striped", label: "Striped" },
      { value: "floral", label: "Floral" },
    ],
  },
];

interface SidebarProps {
  selectedFilters: Record<string, string[]>;
  onFilterChange: (category: string, value: string) => void;
}

export const Sidebar = ({ selectedFilters, onFilterChange }: SidebarProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(filterGroups.map((g) => g.id))
  );

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <aside className="w-full">
      <div className="space-y-6">
        {filterGroups.map((group) => {
          const isExpanded = expandedGroups.has(group.id);

          return (
            <div key={group.id} className="border-b border-border pb-4">
              <button
                onClick={() => toggleGroup(group.id)}
                className="flex items-center justify-between w-full mb-3 group"
              >
                <h3 className="text-sm font-semibold text-foreground uppercase">
                  {group.label}
                </h3>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <div className="space-y-3">
                  {group.options.map((option) => {
                    const isChecked = selectedFilters[group.id]?.includes(option.value) || false;
                    
                    return (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${group.id}-${option.value}`}
                          checked={isChecked}
                          onCheckedChange={() => onFilterChange(group.id, option.value)}
                        />
                        <Label
                          htmlFor={`${group.id}-${option.value}`}
                          className="text-sm text-foreground cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

