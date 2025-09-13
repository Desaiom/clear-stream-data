import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export interface FilterState {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  location: {
    state: string;
    district: string;
    village: string;
  };
  waterQuality: {
    phRange: [number, number];
    turbidityRange: [number, number];
    temperatureRange: [number, number];
  };
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

// Mock data for location hierarchy
const locationData = {
  states: ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan"],
  districts: {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"]
  },
  villages: {
    "Mumbai": ["Andheri", "Bandra", "Kurla", "Malad"],
    "Pune": ["Hadapsar", "Kothrud", "Viman Nagar", "Aundh"],
    "Bangalore": ["Whitefield", "Koramangala", "Indiranagar", "Jayanagar"],
    "Chennai": ["T Nagar", "Velachery", "Anna Nagar", "Adyar"]
  }
};

export const FilterPanel = ({ filters, onFiltersChange, onClearFilters }: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = 
    filters.dateRange.from || 
    filters.dateRange.to || 
    filters.location.state || 
    filters.location.district || 
    filters.location.village ||
    filters.waterQuality.phRange[0] !== 0 || 
    filters.waterQuality.phRange[1] !== 14 ||
    filters.waterQuality.turbidityRange[0] !== 0 || 
    filters.waterQuality.turbidityRange[1] !== 10 ||
    filters.waterQuality.temperatureRange[0] !== 0 || 
    filters.waterQuality.temperatureRange[1] !== 50;

  const updateFilters = (newFilters: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...newFilters });
  };

  const availableDistricts = filters.location.state 
    ? locationData.districts[filters.location.state as keyof typeof locationData.districts] || []
    : [];

  const availableVillages = filters.location.district 
    ? locationData.villages[filters.location.district as keyof typeof locationData.villages] || []
    : [];

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <CardTitle>Filters</CardTitle>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                Active
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>
        <CardDescription>
          Filter data by date range, location hierarchy, and water quality parameters
        </CardDescription>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Date Range Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Date Range</Label>
            <div className="flex flex-col sm:flex-row gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !filters.dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange.from ? (
                      format(filters.dateRange.from, "PPP")
                    ) : (
                      <span>From date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateRange.from}
                    onSelect={(date) => updateFilters({
                      dateRange: { ...filters.dateRange, from: date }
                    })}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !filters.dateRange.to && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange.to ? (
                      format(filters.dateRange.to, "PPP")
                    ) : (
                      <span>To date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateRange.to}
                    onSelect={(date) => updateFilters({
                      dateRange: { ...filters.dateRange, to: date }
                    })}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Location Hierarchy Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Location</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select
                value={filters.location.state}
                onValueChange={(value) => updateFilters({
                  location: { state: value, district: "", village: "" }
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {locationData.states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.location.district}
                onValueChange={(value) => updateFilters({
                  location: { ...filters.location, district: value, village: "" }
                })}
                disabled={!filters.location.state}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {availableDistricts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.location.village}
                onValueChange={(value) => updateFilters({
                  location: { ...filters.location, village: value }
                })}
                disabled={!filters.location.district}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Village" />
                </SelectTrigger>
                <SelectContent>
                  {availableVillages.map((village) => (
                    <SelectItem key={village} value={village}>
                      {village}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Water Quality Parameters */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Water Quality Parameters</Label>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">pH Range: {filters.waterQuality.phRange[0]} - {filters.waterQuality.phRange[1]}</Label>
                <Slider
                  value={filters.waterQuality.phRange}
                  onValueChange={(value) => updateFilters({
                    waterQuality: { ...filters.waterQuality, phRange: value as [number, number] }
                  })}
                  max={14}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Turbidity Range (NTU): {filters.waterQuality.turbidityRange[0]} - {filters.waterQuality.turbidityRange[1]}</Label>
                <Slider
                  value={filters.waterQuality.turbidityRange}
                  onValueChange={(value) => updateFilters({
                    waterQuality: { ...filters.waterQuality, turbidityRange: value as [number, number] }
                  })}
                  max={10}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Temperature Range (°C): {filters.waterQuality.temperatureRange[0]} - {filters.waterQuality.temperatureRange[1]}</Label>
                <Slider
                  value={filters.waterQuality.temperatureRange}
                  onValueChange={(value) => updateFilters({
                    waterQuality: { ...filters.waterQuality, temperatureRange: value as [number, number] }
                  })}
                  max={50}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};