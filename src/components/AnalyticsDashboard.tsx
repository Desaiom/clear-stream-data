import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  Droplets,
  Thermometer,
  Gauge
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import { FilterState } from "./FilterPanel";

interface AnalyticsDashboardProps {
  filters?: FilterState;
}

export const AnalyticsDashboard = ({ filters }: AnalyticsDashboardProps) => {
  // Mock data that can be filtered
  const mockData = [
    { id: 1, date: "2024-01-15", location: "Maharashtra Mumbai Andheri", ph: 7.2, turbidity: 1.5, temperature: 23.2, status: "safe" },
    { id: 2, date: "2024-01-16", location: "Karnataka Bangalore Whitefield", ph: 6.8, turbidity: 2.1, temperature: 24.1, status: "warning" },
    { id: 3, date: "2024-01-17", location: "Tamil Nadu Chennai T Nagar", ph: 7.5, turbidity: 0.8, temperature: 22.5, status: "safe" },
    { id: 4, date: "2024-01-18", location: "Gujarat Ahmedabad", ph: 6.2, turbidity: 3.2, temperature: 26.8, status: "critical" },
    { id: 5, date: "2024-01-19", location: "Maharashtra Pune Hadapsar", ph: 7.1, turbidity: 1.8, temperature: 23.8, status: "safe" },
  ];

  // Apply filters to data
  const filteredData = filters ? applyFiltersToData(mockData, filters) : mockData;
  
  // Calculate metrics based on filtered data
  const calculateMetrics = (data: typeof mockData) => {
    const total = data.length;
    if (total === 0) {
      return {
        safeZones: 0,
        warningZones: 0,
        criticalZones: 0,
        alertsToday: 0,
        alertsWeek: 0,
        avgPH: 0,
        avgTurbidity: 0,
        avgTemperature: 0
      };
    }

    const safe = data.filter(d => d.status === "safe").length;
    const warning = data.filter(d => d.status === "warning").length;
    const critical = data.filter(d => d.status === "critical").length;
    
    const avgPH = data.reduce((sum, d) => sum + d.ph, 0) / total;
    const avgTurbidity = data.reduce((sum, d) => sum + d.turbidity, 0) / total;
    const avgTemperature = data.reduce((sum, d) => sum + d.temperature, 0) / total;

    return {
      safeZones: Math.round((safe / total) * 100),
      warningZones: Math.round((warning / total) * 100),
      criticalZones: Math.round((critical / total) * 100),
      alertsToday: warning + critical,
      alertsWeek: (warning + critical) * 7,
      avgPH: Number(avgPH.toFixed(1)),
      avgTurbidity: Number(avgTurbidity.toFixed(1)),
      avgTemperature: Number(avgTemperature.toFixed(1))
    };
  };

  const keyMetrics = calculateMetrics(filteredData);

  // Helper function to apply filters
  function applyFiltersToData(data: typeof mockData, filters: FilterState) {
    return data.filter((item) => {
      // Date filtering
      if (filters.dateRange.from && new Date(item.date) < filters.dateRange.from) return false;
      if (filters.dateRange.to && new Date(item.date) > filters.dateRange.to) return false;

      // Location filtering
      if (filters.location.state && !item.location.toLowerCase().includes(filters.location.state.toLowerCase())) return false;
      if (filters.location.district && !item.location.toLowerCase().includes(filters.location.district.toLowerCase())) return false;
      if (filters.location.village && !item.location.toLowerCase().includes(filters.location.village.toLowerCase())) return false;

      // Water quality parameter filtering
      if (item.ph < filters.waterQuality.phRange[0] || item.ph > filters.waterQuality.phRange[1]) return false;
      if (item.turbidity < filters.waterQuality.turbidityRange[0] || item.turbidity > filters.waterQuality.turbidityRange[1]) return false;
      if (item.temperature < filters.waterQuality.temperatureRange[0] || item.temperature > filters.waterQuality.temperatureRange[1]) return false;

      return true;
    });
  }

  const weeklyTrends = [
    { day: 'Mon', safe: 82, warning: 12, critical: 6, alerts: 8 },
    { day: 'Tue', safe: 79, warning: 15, critical: 6, alerts: 12 },
    { day: 'Wed', safe: 78, warning: 15, critical: 7, alerts: 15 },
    { day: 'Thu', safe: 80, warning: 13, critical: 7, alerts: 10 },
    { day: 'Fri', safe: 78, warning: 15, critical: 7, alerts: 12 },
    { day: 'Sat', safe: 76, warning: 17, critical: 7, alerts: 14 },
    { day: 'Sun', safe: 78, warning: 15, critical: 7, alerts: 12 },
  ];

  const monthlyParameters = [
    { month: 'Jan', pH: 7.0, turbidity: 2.1, temperature: 21.5 },
    { month: 'Feb', pH: 7.1, turbidity: 1.9, temperature: 22.1 },
    { month: 'Mar', pH: 7.2, turbidity: 1.8, temperature: 23.2 },
    { month: 'Apr', pH: 7.1, turbidity: 1.7, temperature: 24.1 },
    { month: 'May', pH: 7.0, turbidity: 1.8, temperature: 25.2 },
    { month: 'Jun', pH: 7.1, turbidity: 1.8, temperature: 23.2 },
  ];

  return (
    <div className="space-y-6">
      {/* Filter Status Banner */}
      {filters && hasActiveFilters(filters) && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span className="font-medium">Filtered Results</span>
                <Badge variant="secondary">{filteredData.length} records</Badge>
              </div>
              <Badge variant="outline">
                Showing {filteredData.length} of {mockData.length} total records
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safe Zones</CardTitle>
            <CheckCircle className="h-4 w-4 text-health-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-health-green">{keyMetrics.safeZones}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2.1% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning Zones</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning-orange">{keyMetrics.warningZones}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -1.2% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Zones</CardTitle>
            <Activity className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{keyMetrics.criticalZones}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +0.8% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts (24h)</CardTitle>
            <Activity className="h-4 w-4 text-data-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keyMetrics.alertsToday}</div>
            <p className="text-xs text-muted-foreground">
              {keyMetrics.alertsWeek} this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Water Quality Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Gauge className="h-5 w-5 text-data-teal" />
              <span>Average pH</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{keyMetrics.avgPH}</div>
            <Progress value={71} className="mb-2" />
            <p className="text-sm text-muted-foreground">Within safe range (6.5-8.5)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Droplets className="h-5 w-5 text-water-blue" />
              <span>Avg Turbidity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{keyMetrics.avgTurbidity} NTU</div>
            <Progress value={45} className="mb-2" />
            <p className="text-sm text-muted-foreground">Below threshold (&lt;4 NTU)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Thermometer className="h-5 w-5 text-warning-orange" />
              <span>Avg Temperature</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{keyMetrics.avgTemperature}°C</div>
            <Progress value={62} className="mb-2" />
            <p className="text-sm text-muted-foreground">Normal range (15-30°C)</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Zone Status Trends (7 Days)</CardTitle>
            <CardDescription>Daily distribution of zone safety levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="safe" stackId="1" stroke="hsl(var(--health-green))" fill="hsl(var(--health-green) / 0.6)" />
                  <Area type="monotone" dataKey="warning" stackId="1" stroke="hsl(var(--warning-orange))" fill="hsl(var(--warning-orange) / 0.6)" />
                  <Area type="monotone" dataKey="critical" stackId="1" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.6)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert Generation Trend</CardTitle>
            <CardDescription>Daily alerts over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="alerts" stroke="hsl(var(--data-teal))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Parameter Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Water Quality Parameters (6 Months)</CardTitle>
          <CardDescription>Monthly averages showing quality trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyParameters}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pH" stroke="hsl(var(--data-teal))" strokeWidth={2} name="pH Level" />
                <Line type="monotone" dataKey="turbidity" stroke="hsl(var(--water-blue))" strokeWidth={2} name="Turbidity (NTU)" />
                <Line type="monotone" dataKey="temperature" stroke="hsl(var(--warning-orange))" strokeWidth={2} name="Temperature (°C)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Helper function to check if filters are active
  function hasActiveFilters(filters: FilterState) {
    return (
      filters.dateRange.from !== undefined ||
      filters.dateRange.to !== undefined ||
      filters.location.state !== "" ||
      filters.location.district !== "" ||
      filters.location.village !== "" ||
      filters.waterQuality.phRange[0] !== 0 ||
      filters.waterQuality.phRange[1] !== 14 ||
      filters.waterQuality.turbidityRange[0] !== 0 ||
      filters.waterQuality.turbidityRange[1] !== 10 ||
      filters.waterQuality.temperatureRange[0] !== 0 ||
      filters.waterQuality.temperatureRange[1] !== 50
    );
  }
};