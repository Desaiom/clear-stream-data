import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  GitCompare, 
  Droplets, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface LocationData {
  id: string;
  name: string;
  waterQuality: {
    pH: number;
    turbidity: number;
    temperature: number;
    chlorine: number;
  };
  diseaseRisk: number;
  status: "safe" | "warning" | "critical";
  population: number;
  lastUpdate: string;
  monthlyTrends: Array<{
    month: string;
    pH: number;
    turbidity: number;
    diseases: number;
  }>;
}

export const ComparisonTool = () => {
  const [location1, setLocation1] = useState<string>("");
  const [location2, setLocation2] = useState<string>("");
  const [showComparison, setShowComparison] = useState(false);

  const mockLocations: LocationData[] = [
    {
      id: "district-a-zone-1",
      name: "District A, Zone 1",
      waterQuality: { pH: 7.2, turbidity: 1.5, temperature: 22.5, chlorine: 0.8 },
      diseaseRisk: 15,
      status: "safe",
      population: 45000,
      lastUpdate: "2 min ago",
      monthlyTrends: [
        { month: "Jan", pH: 7.0, turbidity: 2.1, diseases: 18 },
        { month: "Feb", pH: 7.1, turbidity: 1.9, diseases: 16 },
        { month: "Mar", pH: 7.2, turbidity: 1.5, diseases: 15 },
        { month: "Apr", pH: 7.1, turbidity: 1.3, diseases: 12 },
        { month: "May", pH: 7.2, turbidity: 1.5, diseases: 15 },
        { month: "Jun", pH: 7.2, turbidity: 1.5, diseases: 15 },
      ]
    },
    {
      id: "district-b-zone-2",
      name: "District B, Zone 2",
      waterQuality: { pH: 6.8, turbidity: 3.2, temperature: 24.1, chlorine: 0.5 },
      diseaseRisk: 35,
      status: "warning",
      population: 62000,
      lastUpdate: "5 min ago",
      monthlyTrends: [
        { month: "Jan", pH: 6.5, turbidity: 4.1, diseases: 42 },
        { month: "Feb", pH: 6.6, turbidity: 3.8, diseases: 38 },
        { month: "Mar", pH: 6.8, turbidity: 3.2, diseases: 35 },
        { month: "Apr", pH: 6.7, turbidity: 3.5, diseases: 37 },
        { month: "May", pH: 6.8, turbidity: 3.2, diseases: 35 },
        { month: "Jun", pH: 6.8, turbidity: 3.2, diseases: 35 },
      ]
    },
    {
      id: "district-c-zone-1",
      name: "District C, Zone 1",
      waterQuality: { pH: 6.2, turbidity: 4.8, temperature: 26.3, chlorine: 0.3 },
      diseaseRisk: 78,
      status: "critical",
      population: 38000,
      lastUpdate: "1 min ago",
      monthlyTrends: [
        { month: "Jan", pH: 6.0, turbidity: 5.2, diseases: 85 },
        { month: "Feb", pH: 6.1, turbidity: 5.0, diseases: 82 },
        { month: "Mar", pH: 6.2, turbidity: 4.8, diseases: 78 },
        { month: "Apr", pH: 6.1, turbidity: 4.9, diseases: 80 },
        { month: "May", pH: 6.2, turbidity: 4.8, diseases: 78 },
        { month: "Jun", pH: 6.2, turbidity: 4.8, diseases: 78 },
      ]
    },
    {
      id: "district-d-zone-1",
      name: "District D, Zone 1",
      waterQuality: { pH: 7.4, turbidity: 1.1, temperature: 21.8, chlorine: 0.9 },
      diseaseRisk: 12,
      status: "safe",
      population: 55000,
      lastUpdate: "3 min ago",
      monthlyTrends: [
        { month: "Jan", pH: 7.3, turbidity: 1.3, diseases: 15 },
        { month: "Feb", pH: 7.4, turbidity: 1.2, diseases: 13 },
        { month: "Mar", pH: 7.4, turbidity: 1.1, diseases: 12 },
        { month: "Apr", pH: 7.5, turbidity: 1.0, diseases: 10 },
        { month: "May", pH: 7.4, turbidity: 1.1, diseases: 12 },
        { month: "Jun", pH: 7.4, turbidity: 1.1, diseases: 12 },
      ]
    }
  ];

  const selectedLocation1 = mockLocations.find(loc => loc.id === location1);
  const selectedLocation2 = mockLocations.find(loc => loc.id === location2);

  const handleCompare = () => {
    if (location1 && location2 && location1 !== location2) {
      setShowComparison(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe": return "text-health-green";
      case "warning": return "text-warning-orange";
      case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe": return <CheckCircle className={`h-5 w-5 ${getStatusColor(status)}`} />;
      case "warning": return <AlertTriangle className={`h-5 w-5 ${getStatusColor(status)}`} />;
      case "critical": return <AlertTriangle className={`h-5 w-5 ${getStatusColor(status)}`} />;
      default: return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getComparisonIndicator = (value1: number, value2: number, higherIsBetter: boolean = false) => {
    if (value1 === value2) return <Minus className="h-4 w-4 text-muted-foreground" />;
    
    const isFirst = higherIsBetter ? value1 > value2 : value1 < value2;
    return isFirst ? 
      <TrendingUp className="h-4 w-4 text-health-green" /> : 
      <TrendingDown className="h-4 w-4 text-destructive" />;
  };

  const combineRadarData = () => {
    if (!selectedLocation1 || !selectedLocation2) return [];
    
    return [
      {
        parameter: 'pH',
        location1: selectedLocation1.waterQuality.pH,
        location2: selectedLocation2.waterQuality.pH,
        fullMark: 8.5
      },
      {
        parameter: 'Turbidity',
        location1: 5 - selectedLocation1.waterQuality.turbidity, // Invert for better visualization
        location2: 5 - selectedLocation2.waterQuality.turbidity,
        fullMark: 5
      },
      {
        parameter: 'Temperature',
        location1: 35 - selectedLocation1.waterQuality.temperature, // Invert for better visualization
        location2: 35 - selectedLocation2.waterQuality.temperature,
        fullMark: 35
      },
      {
        parameter: 'Chlorine',
        location1: selectedLocation1.waterQuality.chlorine,
        location2: selectedLocation2.waterQuality.chlorine,
        fullMark: 1.0
      },
      {
        parameter: 'Safety',
        location1: 100 - selectedLocation1.diseaseRisk, // Invert risk to safety
        location2: 100 - selectedLocation2.diseaseRisk,
        fullMark: 100
      }
    ];
  };

  return (
    <div className="space-y-6">
      {/* Comparison Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GitCompare className="h-5 w-5 text-data-teal" />
            <span>Compare Water Quality Between Areas</span>
          </CardTitle>
          <CardDescription>
            Select two districts or zones to compare their water quality parameters and trends
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Location</label>
              <Select value={location1} onValueChange={setLocation1}>
                <SelectTrigger>
                  <SelectValue placeholder="Select first area" />
                </SelectTrigger>
                <SelectContent>
                  {mockLocations.map((location) => (
                    <SelectItem key={location.id} value={location.id} disabled={location.id === location2}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Second Location</label>
              <Select value={location2} onValueChange={setLocation2}>
                <SelectTrigger>
                  <SelectValue placeholder="Select second area" />
                </SelectTrigger>
                <SelectContent>
                  {mockLocations.map((location) => (
                    <SelectItem key={location.id} value={location.id} disabled={location.id === location1}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleCompare}
              disabled={!location1 || !location2 || location1 === location2}
              className="bg-gradient-to-r from-data-teal to-secondary"
            >
              <GitCompare className="h-4 w-4 mr-2" />
              Compare Areas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {showComparison && selectedLocation1 && selectedLocation2 && (
        <div className="space-y-6">
          {/* Side-by-Side Overview */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedLocation1.name}</span>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedLocation1.status)}
                    <Badge variant={selectedLocation1.status === "safe" ? "secondary" : "destructive"}>
                      {selectedLocation1.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription>
                  Population: {selectedLocation1.population.toLocaleString()} • Updated: {selectedLocation1.lastUpdate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>pH Level:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{selectedLocation1.waterQuality.pH}</span>
                      {getComparisonIndicator(selectedLocation1.waterQuality.pH, selectedLocation2.waterQuality.pH)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Turbidity:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{selectedLocation1.waterQuality.turbidity} NTU</span>
                      {getComparisonIndicator(selectedLocation1.waterQuality.turbidity, selectedLocation2.waterQuality.turbidity)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Temperature:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{selectedLocation1.waterQuality.temperature}°C</span>
                      {getComparisonIndicator(selectedLocation1.waterQuality.temperature, selectedLocation2.waterQuality.temperature)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Disease Risk:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{selectedLocation1.diseaseRisk}%</span>
                      {getComparisonIndicator(selectedLocation1.diseaseRisk, selectedLocation2.diseaseRisk)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedLocation2.name}</span>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedLocation2.status)}
                    <Badge variant={selectedLocation2.status === "safe" ? "secondary" : "destructive"}>
                      {selectedLocation2.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription>
                  Population: {selectedLocation2.population.toLocaleString()} • Updated: {selectedLocation2.lastUpdate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>pH Level:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{selectedLocation2.waterQuality.pH}</span>
                      {getComparisonIndicator(selectedLocation2.waterQuality.pH, selectedLocation1.waterQuality.pH)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Turbidity:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{selectedLocation2.waterQuality.turbidity} NTU</span>
                      {getComparisonIndicator(selectedLocation2.waterQuality.turbidity, selectedLocation1.waterQuality.turbidity)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Temperature:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{selectedLocation2.waterQuality.temperature}°C</span>
                      {getComparisonIndicator(selectedLocation2.waterQuality.temperature, selectedLocation1.waterQuality.temperature)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Disease Risk:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{selectedLocation2.diseaseRisk}%</span>
                      {getComparisonIndicator(selectedLocation2.diseaseRisk, selectedLocation1.diseaseRisk)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visual Comparisons */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Quality Comparison</CardTitle>
                <CardDescription>Multi-parameter comparison radar chart</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={combineRadarData()}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="parameter" />
                      <PolarRadiusAxis angle={90} domain={[0, 'dataMax']} />
                      <Radar
                        name={selectedLocation1.name}
                        dataKey="location1"
                        stroke="hsl(var(--data-teal))"
                        fill="hsl(var(--data-teal) / 0.3)"
                        strokeWidth={2}
                      />
                      <Radar
                        name={selectedLocation2.name}
                        dataKey="location2"
                        stroke="hsl(var(--warning-orange))"
                        fill="hsl(var(--warning-orange) / 0.3)"
                        strokeWidth={2}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Parameter Comparison Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Parameter Values Comparison</CardTitle>
                <CardDescription>Side-by-side parameter comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { parameter: 'pH', location1: selectedLocation1.waterQuality.pH, location2: selectedLocation2.waterQuality.pH },
                        { parameter: 'Turbidity', location1: selectedLocation1.waterQuality.turbidity, location2: selectedLocation2.waterQuality.turbidity },
                        { parameter: 'Temperature', location1: selectedLocation1.waterQuality.temperature, location2: selectedLocation2.waterQuality.temperature },
                        { parameter: 'Disease Risk', location1: selectedLocation1.diseaseRisk, location2: selectedLocation2.diseaseRisk }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="parameter" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="location1" fill="hsl(var(--data-teal))" name={selectedLocation1.name} />
                      <Bar dataKey="location2" fill="hsl(var(--warning-orange))" name={selectedLocation2.name} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trend Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>6-Month Trend Comparison</CardTitle>
              <CardDescription>Historical trends showing disease risk over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="diseases"
                      data={selectedLocation1.monthlyTrends}
                      stroke="hsl(var(--data-teal))"
                      strokeWidth={3}
                      name={selectedLocation1.name}
                    />
                    <Line
                      type="monotone"
                      dataKey="diseases"
                      data={selectedLocation2.monthlyTrends}
                      stroke="hsl(var(--warning-orange))"
                      strokeWidth={3}
                      name={selectedLocation2.name}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};