import { useState, useEffect } from "react";
import { Save, Bookmark, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FilterState } from "./FilterPanel";

interface SavedView {
  id: string;
  name: string;
  filters: FilterState;
  createdAt: Date;
}

interface SavedViewsProps {
  currentFilters: FilterState;
  onLoadView: (filters: FilterState) => void;
}

const STORAGE_KEY = "admin_dashboard_saved_views";

export const SavedViews = ({ currentFilters, onLoadView }: SavedViewsProps) => {
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [newViewName, setNewViewName] = useState("");
  const [selectedViewId, setSelectedViewId] = useState("");
  const { toast } = useToast();

  // Load saved views from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedViews(parsed.map((view: any) => ({
          ...view,
          createdAt: new Date(view.createdAt)
        })));
      } catch (error) {
        console.error("Error loading saved views:", error);
      }
    }
  }, []);

  // Save views to localStorage
  const saveToStorage = (views: SavedView[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
  };

  const hasActiveFilters = () => {
    return (
      currentFilters.dateRange.from || 
      currentFilters.dateRange.to || 
      currentFilters.location.state || 
      currentFilters.location.district || 
      currentFilters.location.village ||
      currentFilters.waterQuality.phRange[0] !== 0 || 
      currentFilters.waterQuality.phRange[1] !== 14 ||
      currentFilters.waterQuality.turbidityRange[0] !== 0 || 
      currentFilters.waterQuality.turbidityRange[1] !== 10 ||
      currentFilters.waterQuality.temperatureRange[0] !== 0 || 
      currentFilters.waterQuality.temperatureRange[1] !== 50
    );
  };

  const handleSaveView = () => {
    if (!newViewName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the saved view.",
        variant: "destructive"
      });
      return;
    }

    if (!hasActiveFilters()) {
      toast({
        title: "Error",
        description: "No active filters to save.",
        variant: "destructive"
      });
      return;
    }

    const newView: SavedView = {
      id: Date.now().toString(),
      name: newViewName.trim(),
      filters: currentFilters,
      createdAt: new Date()
    };

    const updatedViews = [...savedViews, newView];
    setSavedViews(updatedViews);
    saveToStorage(updatedViews);
    setNewViewName("");
    setShowSaveForm(false);

    toast({
      title: "Success",
      description: `Saved view "${newView.name}" created successfully.`
    });
  };

  const handleLoadView = (viewId: string) => {
    const view = savedViews.find(v => v.id === viewId);
    if (view) {
      onLoadView(view.filters);
      setSelectedViewId(viewId);
      toast({
        title: "View Loaded",
        description: `Loaded saved view "${view.name}".`
      });
    }
  };

  const handleDeleteView = (viewId: string) => {
    const view = savedViews.find(v => v.id === viewId);
    const updatedViews = savedViews.filter(v => v.id !== viewId);
    setSavedViews(updatedViews);
    saveToStorage(updatedViews);
    
    if (selectedViewId === viewId) {
      setSelectedViewId("");
    }

    toast({
      title: "View Deleted",
      description: `Deleted saved view "${view?.name}".`
    });
  };

  const getViewDescription = (filters: FilterState) => {
    const parts = [];
    
    if (filters.dateRange.from || filters.dateRange.to) {
      parts.push("Date filter");
    }
    
    if (filters.location.state) {
      const locationParts = [filters.location.state];
      if (filters.location.district) locationParts.push(filters.location.district);
      if (filters.location.village) locationParts.push(filters.location.village);
      parts.push(locationParts.join(" → "));
    }
    
    const waterQualityFilters = [];
    if (filters.waterQuality.phRange[0] !== 0 || filters.waterQuality.phRange[1] !== 14) {
      waterQualityFilters.push("pH");
    }
    if (filters.waterQuality.turbidityRange[0] !== 0 || filters.waterQuality.turbidityRange[1] !== 10) {
      waterQualityFilters.push("Turbidity");
    }
    if (filters.waterQuality.temperatureRange[0] !== 0 || filters.waterQuality.temperatureRange[1] !== 50) {
      waterQualityFilters.push("Temperature");
    }
    
    if (waterQualityFilters.length > 0) {
      parts.push(`Water quality: ${waterQualityFilters.join(", ")}`);
    }

    return parts.length > 0 ? parts.join(" • ") : "No filters";
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="h-5 w-5 text-primary" />
            <CardTitle>Saved Views</CardTitle>
            <Badge variant="outline">{savedViews.length}</Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSaveForm(!showSaveForm)}
            disabled={!hasActiveFilters()}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Current View
          </Button>
        </div>
        <CardDescription>
          Save and quickly load filter combinations for repeated analysis
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Save Form */}
        {showSaveForm && (
          <div className="border rounded-lg p-4 bg-muted/50 space-y-3">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Enter view name..."
                value={newViewName}
                onChange={(e) => setNewViewName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSaveView()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSaveView}>
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowSaveForm(false);
                  setNewViewName("");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Current filters: {getViewDescription(currentFilters)}
            </p>
          </div>
        )}

        {/* Load Saved Views */}
        {savedViews.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Select value={selectedViewId} onValueChange={handleLoadView}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a saved view to load..." />
                </SelectTrigger>
                <SelectContent>
                  {savedViews.map((view) => (
                    <SelectItem key={view.id} value={view.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{view.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {view.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Saved Views List */}
            <div className="space-y-2">
              {savedViews.map((view) => (
                <div
                  key={view.id}
                  className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                    selectedViewId === view.id ? 'bg-primary/5 border-primary' : 'bg-card hover:bg-muted/50'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{view.name}</span>
                      {selectedViewId === view.id && (
                        <Badge variant="secondary" className="text-xs">Current</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {getViewDescription(view.filters)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created: {view.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLoadView(view.id)}
                      disabled={selectedViewId === view.id}
                    >
                      Load
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteView(view.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {savedViews.length === 0 && !showSaveForm && (
          <div className="text-center py-8 text-muted-foreground">
            <Bookmark className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No saved views yet.</p>
            <p className="text-sm">Apply some filters and save them for quick access.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};