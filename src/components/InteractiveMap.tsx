import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Map as MapIcon, 
  MapPin, 
  Droplets, 
  AlertTriangle, 
  CheckCircle,
  Info,
  ZoomIn,
  ZoomOut,
  Layers
} from "lucide-react";

interface District {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status: "safe" | "warning" | "critical";
  waterQuality: {
    pH: number;
    turbidity: number;
    temperature: number;
  };
  diseaseRisk: number;
  population: number;
  lastUpdate: string;
}

export const InteractiveMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [mapView, setMapView] = useState<"safety" | "risk" | "population">("safety");

  const districts: District[] = [
    {
      id: "district-a",
      name: "District A",
      x: 50,
      y: 80,
      width: 120,
      height: 80,
      status: "safe",
      waterQuality: { pH: 7.2, turbidity: 1.5, temperature: 22.5 },
      diseaseRisk: 15,
      population: 45000,
      lastUpdate: "2 min ago"
    },
    {
      id: "district-b",
      name: "District B",
      x: 200,
      y: 60,
      width: 140,
      height: 100,
      status: "warning",
      waterQuality: { pH: 6.8, turbidity: 3.2, temperature: 24.1 },
      diseaseRisk: 35,
      population: 62000,
      lastUpdate: "5 min ago"
    },
    {
      id: "district-c",
      name: "District C",
      x: 380,
      y: 100,
      width: 110,
      height: 90,
      status: "critical",
      waterQuality: { pH: 6.2, turbidity: 4.8, temperature: 26.3 },
      diseaseRisk: 78,
      population: 38000,
      lastUpdate: "1 min ago"
    },
    {
      id: "district-d",
      name: "District D",
      x: 150,
      y: 200,
      width: 160,
      height: 70,
      status: "safe",
      waterQuality: { pH: 7.4, turbidity: 1.1, temperature: 21.8 },
      diseaseRisk: 12,
      population: 55000,
      lastUpdate: "3 min ago"
    },
    {
      id: "district-e",
      name: "District E",
      x: 350,
      y: 220,
      width: 130,
      height: 85,
      status: "warning",
      waterQuality: { pH: 6.9, turbidity: 2.8, temperature: 25.2 },
      diseaseRisk: 28,
      population: 41000,
      lastUpdate: "4 min ago"
    }
  ];

  const getDistrictColor = (district: District) => {
    switch (mapView) {
      case "safety":
        return district.status === "safe" ? "#22c55e" :
               district.status === "warning" ? "#f97316" : "#ef4444";
      case "risk":
        return district.diseaseRisk < 20 ? "#22c55e" :
               district.diseaseRisk < 50 ? "#f97316" : "#ef4444";
      case "population":
        return district.population < 40000 ? "#0ea5e9" :
               district.population < 55000 ? "#8b5cf6" : "#ec4899";
      default:
        return "#6b7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe":
        return <CheckCircle className="h-4 w-4 text-health-green" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning-orange" />;
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapIcon className="h-5 w-5 text-data-teal" />
            <span>Interactive Water Safety Map</span>
          </CardTitle>
          <CardDescription>
            Click on districts to view detailed water quality and disease risk information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Map View:</span>
              <div className="flex space-x-1">
                <Button 
                  size="sm" 
                  variant={mapView === "safety" ? "default" : "outline"}
                  onClick={() => setMapView("safety")}
                >
                  Safety Levels
                </Button>
                <Button 
                  size="sm" 
                  variant={mapView === "risk" ? "default" : "outline"}
                  onClick={() => setMapView("risk")}
                >
                  Disease Risk
                </Button>
                <Button 
                  size="sm" 
                  variant={mapView === "population" ? "default" : "outline"}
                  onClick={() => setMapView("population")}
                >
                  Population
                </Button>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button size="sm" variant="outline">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="relative border rounded-lg p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <svg viewBox="0 0 550 350" className="w-full h-80">
              {/* Map Background */}
              <rect width="550" height="350" fill="transparent" />
              
              {/* Districts */}
              {districts.map((district) => (
                <g key={district.id}>
                  <rect
                    x={district.x}
                    y={district.y}
                    width={district.width}
                    height={district.height}
                    fill={getDistrictColor(district)}
                    stroke="#ffffff"
                    strokeWidth="2"
                    rx="8"
                    className="cursor-pointer transition-all hover:opacity-80"
                    onClick={() => setSelectedDistrict(district)}
                  />
                  <text
                    x={district.x + district.width / 2}
                    y={district.y + district.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {district.name}
                  </text>
                  <text
                    x={district.x + district.width / 2}
                    y={district.y + district.height / 2 + 16}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="10"
                    className="pointer-events-none"
                  >
                    {mapView === "safety" && district.status.toUpperCase()}
                    {mapView === "risk" && `${district.diseaseRisk}% risk`}
                    {mapView === "population" && `${(district.population / 1000).toFixed(0)}k people`}
                  </text>
                </g>
              ))}
            </svg>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur border rounded-lg p-3">
              <div className="text-sm font-medium mb-2">Legend</div>
              <div className="space-y-1">
                {mapView === "safety" && (
                  <>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-health-green rounded"></div>
                      <span className="text-xs">Safe</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-warning-orange rounded"></div>
                      <span className="text-xs">Warning</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-destructive rounded"></div>
                      <span className="text-xs">Critical</span>
                    </div>
                  </>
                )}
                {mapView === "risk" && (
                  <>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-health-green rounded"></div>
                      <span className="text-xs">Low Risk (&lt;20%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-warning-orange rounded"></div>
                      <span className="text-xs">Medium Risk (20-50%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-destructive rounded"></div>
                      <span className="text-xs">High Risk (&gt;50%)</span>
                    </div>
                  </>
                )}
                {mapView === "population" && (
                  <>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-sky-500 rounded"></div>
                      <span className="text-xs">&lt;40k</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      <span className="text-xs">40k-55k</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-pink-500 rounded"></div>
                      <span className="text-xs">&gt;55k</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* District Details */}
      {selectedDistrict && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-data-teal" />
                <span>{selectedDistrict.name} Details</span>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(selectedDistrict.status)}
                <Badge variant={selectedDistrict.status === "safe" ? "secondary" : 
                              selectedDistrict.status === "warning" ? "destructive" : "destructive"}>
                  {selectedDistrict.status.toUpperCase()}
                </Badge>
              </div>
            </CardTitle>
            <CardDescription>
              Last updated: {selectedDistrict.lastUpdate} | Population: {selectedDistrict.population.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Droplets className="h-5 w-5 text-water-blue" />
                  <h4 className="font-medium">Water Quality</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>pH Level:</span>
                    <span className="font-medium">{selectedDistrict.waterQuality.pH}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Turbidity:</span>
                    <span className="font-medium">{selectedDistrict.waterQuality.turbidity} NTU</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temperature:</span>
                    <span className="font-medium">{selectedDistrict.waterQuality.temperature}°C</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-warning-orange" />
                  <h4 className="font-medium">Disease Risk</h4>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">{selectedDistrict.diseaseRisk}%</div>
                  <div className="text-sm text-muted-foreground">Predicted risk level</div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${selectedDistrict.diseaseRisk}%`,
                        backgroundColor: selectedDistrict.diseaseRisk < 20 ? "hsl(var(--health-green))" :
                                       selectedDistrict.diseaseRisk < 50 ? "hsl(var(--warning-orange))" : "hsl(var(--destructive))"
                      }}
                    ></div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="h-5 w-5 text-data-teal" />
                  <h4 className="font-medium">Recommendations</h4>
                </div>
                <div className="space-y-2 text-sm">
                  {selectedDistrict.status === "safe" && (
                    <>
                      <div>✓ Continue monitoring</div>
                      <div>✓ Regular maintenance</div>
                      <div>✓ Community education</div>
                    </>
                  )}
                  {selectedDistrict.status === "warning" && (
                    <>
                      <div>⚠ Increase monitoring frequency</div>
                      <div>⚠ Water treatment needed</div>
                      <div>⚠ Alert health workers</div>
                    </>
                  )}
                  {selectedDistrict.status === "critical" && (
                    <>
                      <div>🚨 Immediate intervention</div>
                      <div>🚨 Distribute safe water</div>
                      <div>🚨 Medical team deployment</div>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};