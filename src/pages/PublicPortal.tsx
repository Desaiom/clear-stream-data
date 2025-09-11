import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MapPin, 
  Users, 
  BarChart3, 
  TrendingUp,
  Droplets,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { AwarenessTraining } from "@/components/AwarenessTraining";
import { LanguageToggle } from "@/components/LanguageToggle";

const PublicPortal = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Mock data for visualizations
  const diseaseData = [
    { name: 'Waterborne Diseases', value: 40, color: '#ef4444' },
    { name: 'Gastrointestinal', value: 30, color: '#f97316' },
    { name: 'Skin Conditions', value: 20, color: '#eab308' },
    { name: 'Respiratory', value: 10, color: '#22c55e' },
  ];

  const waterQualityData = [
    { parameter: 'pH', value: 7.2, safe: true, range: '6.5-8.5' },
    { parameter: 'Turbidity', value: 1.5, safe: true, range: '<4 NTU' },
    { parameter: 'Temperature', value: 22.5, safe: true, range: '15-30°C' },
    { parameter: 'Chlorine', value: 0.8, safe: true, range: '0.2-1.0 mg/L' },
  ];

  const trendsData = [
    { month: 'Jan', diseases: 45, pH: 7.1, turbidity: 2.1 },
    { month: 'Feb', diseases: 38, pH: 7.0, turbidity: 1.9 },
    { month: 'Mar', diseases: 42, pH: 7.2, turbidity: 1.5 },
    { month: 'Apr', diseases: 35, pH: 7.3, turbidity: 1.2 },
    { month: 'May', diseases: 28, pH: 7.4, turbidity: 1.0 },
    { month: 'Jun', diseases: 25, pH: 7.2, turbidity: 1.5 },
  ];

  const handleSearch = () => {
    if (searchLocation.trim()) {
      setSelectedLocation(searchLocation);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-clean-blue to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-secondary" />
                <div>
                  <h1 className="text-2xl font-bold text-secondary">Public Water Health Portal</h1>
                  <p className="text-sm text-muted-foreground">Open access for healthcare workers & citizens</p>
                </div>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-secondary to-health-green text-white">
              Public Access
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
              <Search className="h-6 w-6 text-data-teal" />
              <span>Search Water Health Data by Location</span>
            </CardTitle>
            <CardDescription>
              Enter your district, city, or area to view water quality and disease predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex max-w-md mx-auto space-x-2">
              <Input
                placeholder="e.g., District A, Zone 1"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="bg-gradient-to-r from-data-teal to-secondary">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {selectedLocation && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="h-5 w-5 text-data-teal" />
              <h2 className="text-xl font-semibold">Results for: {selectedLocation}</h2>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-card">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="diseases">Disease Risks</TabsTrigger>
                <TabsTrigger value="quality">Water Quality</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="awareness">Awareness</TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="text-center">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-health-green">Water Quality Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CheckCircle className="h-12 w-12 mx-auto text-health-green mb-2" />
                      <div className="text-2xl font-bold text-health-green">SAFE</div>
                      <p className="text-sm text-muted-foreground">All parameters within limits</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-warning-orange">Disease Risk Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AlertCircle className="h-12 w-12 mx-auto text-warning-orange mb-2" />
                      <div className="text-2xl font-bold text-warning-orange">MODERATE</div>
                      <p className="text-sm text-muted-foreground">25% predicted risk</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-data-teal">Last Updated</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Droplets className="h-12 w-12 mx-auto text-data-teal mb-2" />
                      <div className="text-2xl font-bold">2 min</div>
                      <p className="text-sm text-muted-foreground">Real-time monitoring</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Disease Distribution */}
              <TabsContent value="diseases" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-data-teal" />
                      <span>Predicted Disease Distribution</span>
                    </CardTitle>
                    <CardDescription>
                      AI-predicted disease risks based on current water quality parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={diseaseData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            dataKey="value"
                          >
                            {diseaseData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {diseaseData.map((disease) => (
                        <div key={disease.name} className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: disease.color }}
                          />
                          <span className="text-sm">{disease.name}: {disease.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Water Quality */}
              <TabsContent value="quality" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Droplets className="h-5 w-5 text-water-blue" />
                      <span>Current Water Quality Parameters</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {waterQualityData.map((param) => (
                        <div key={param.parameter} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="font-medium">{param.parameter}</div>
                            <div className="text-sm text-muted-foreground">Safe range: {param.range}</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-lg font-semibold">{param.value}</div>
                            <Badge variant={param.safe ? "secondary" : "destructive"}>
                              {param.safe ? "SAFE" : "WARNING"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Trends */}
              <TabsContent value="trends" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Disease Cases Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={trendsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="diseases" stroke="#ef4444" strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Water Quality Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={trendsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="pH" fill="#0ea5e9" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Awareness & Training */}
              <TabsContent value="awareness" className="space-y-6">
                <AwarenessTraining />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {/* Language Toggle */}
      <LanguageToggle />
    </div>
  );
};

export default PublicPortal;