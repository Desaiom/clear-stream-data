import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BarChart } from '@mui/x-charts';
import { 
  Activity, 
  FileText, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Droplets,
  ArrowLeft,
  Thermometer,
  Gauge,
  MessageCircle,
  Users,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";
import { RealTimeAlerts } from "@/components/RealTimeAlerts";
import { AIChatInterface } from "@/components/AIChatInterface";
import { ResourceRecommendations } from "@/components/ResourceRecommendations";
import { AwarenessTraining } from "@/components/AwarenessTraining";
import { LanguageToggle } from "@/components/LanguageToggle";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { NotificationCenter } from "@/components/NotificationCenter";
import { ExportData } from "@/components/ExportData";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [sensorData, setSensorData] = useState({
    ph: "7.2",
    turbidity: "1.5",
    temperature: "22.5",
    location: "District A, Zone 1"
  });

  const handleDataValidation = () => {
    toast({
      title: "Data Validated",
      description: "Sensor data has been validated and sent to ML prediction model.",
    });
  };

  const handlePdfUpload = () => {
    toast({
      title: "PDF Processing",
      description: "PDF report uploaded and parameters extracted successfully.",
    });
  };

  const mockIoTData = [
    { id: 1, location: "District A, Zone 1", ph: 7.2, turbidity: 1.5, status: "normal", lastUpdate: "2 min ago" },
    { id: 2, location: "District A, Zone 2", ph: 6.8, turbidity: 2.1, status: "warning", lastUpdate: "5 min ago" },
    { id: 3, location: "District B, Zone 1", ph: 7.5, turbidity: 0.8, status: "good", lastUpdate: "1 min ago" },
  ];

  const mockPdfReports = [
    { id: 1, title: "Water Quality Report - March 2024", status: "processed", confidence: 95 },
    { id: 2, title: "Regional Health Assessment - Feb 2024", status: "pending", confidence: null },
    { id: 3, title: "Environmental Monitoring - Jan 2024", status: "processed", confidence: 87 },
  ];

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
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Data Validation & Management</p>
                </div>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-primary to-deep-blue text-white">
              Administrator Access
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-card">
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Export</span>
            </TabsTrigger>
            <TabsTrigger value="iot" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>IoT Data</span>
            </TabsTrigger>
            <TabsTrigger value="validate" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Validation</span>
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>AI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Resources</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Training</span>
            </TabsTrigger>
          </TabsList>

          {/* Analytics Dashboard */}
          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          {/* Notification Center */}
          <TabsContent value="notifications" className="space-y-6">
            <NotificationCenter />
          </TabsContent>

          {/* Export Data */}
          <TabsContent value="export" className="space-y-6">
            <ExportData />
          </TabsContent>

          {/* IoT Sensor Data */}
          <TabsContent value="iot" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-data-teal" />
                    <span>Real-time IoT Sensor Data</span>
                  </CardTitle>
                  <CardDescription>
                    Monitor and validate live sensor readings from field devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {mockIoTData.map((sensor) => (
                      <div key={sensor.id} className="flex items-center justify-between p-4 border rounded-lg bg-card/50">
                        <div className="flex items-center space-x-4">
                          <Droplets className={`h-8 w-8 ${
                            sensor.status === 'good' ? 'text-health-green' :
                            sensor.status === 'warning' ? 'text-warning-orange' : 'text-data-teal'
                          }`} />
                          <div>
                            <div className="font-medium">{sensor.location}</div>
                            <div className="text-sm text-muted-foreground">
                              pH: {sensor.ph} | Turbidity: {sensor.turbidity} NTU
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={
                            sensor.status === 'good' ? 'secondary' :
                            sensor.status === 'warning' ? 'destructive' : 'default'
                          }>
                            {sensor.status.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{sensor.lastUpdate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* PDF Reports */}
          <TabsContent value="pdf" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-data-teal" />
                  <span>PDF Report Processing</span>
                </CardTitle>
                <CardDescription>
                  Upload and process government/official water quality reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Drag and drop PDF files or click to upload</p>
                  <Button onClick={handlePdfUpload} className="bg-gradient-to-r from-data-teal to-primary">
                    Upload PDF Report
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Recent PDF Reports</h4>
                  {mockPdfReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 border rounded bg-card/50">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-data-teal" />
                        <span className="font-medium">{report.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {report.confidence && (
                          <Badge variant="outline">{report.confidence}% confidence</Badge>
                        )}
                        <Badge variant={report.status === 'processed' ? 'secondary' : 'default'}>
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Validation */}
          <TabsContent value="validate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-health-green" />
                  <span>Data Validation & Correction</span>
                </CardTitle>
                <CardDescription>
                  Review and correct extracted data before ML processing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={sensorData.location}
                        onChange={(e) => setSensorData({...sensorData, location: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ph" className="flex items-center space-x-2">
                        <Gauge className="h-4 w-4" />
                        <span>pH Level</span>
                      </Label>
                      <Input
                        id="ph"
                        type="number"
                        step="0.1"
                        value={sensorData.ph}
                        onChange={(e) => setSensorData({...sensorData, ph: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="turbidity">Turbidity (NTU)</Label>
                      <Input
                        id="turbidity"
                        type="number"
                        step="0.1"
                        value={sensorData.turbidity}
                        onChange={(e) => setSensorData({...sensorData, turbidity: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temperature" className="flex items-center space-x-2">
                        <Thermometer className="h-4 w-4" />
                        <span>Temperature (°C)</span>
                      </Label>
                      <Input
                        id="temperature"
                        type="number"
                        step="0.1"
                        value={sensorData.temperature}
                        onChange={(e) => setSensorData({...sensorData, temperature: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={handleDataValidation}
                    size="lg"
                    className="bg-gradient-to-r from-health-green to-secondary hover:opacity-90 transition-opacity px-8"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Validate Data & Trigger ML Prediction
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Chat Interface */}
          <TabsContent value="ai-chat" className="space-y-6">
            <AIChatInterface />
          </TabsContent>

          {/* Resource Recommendations */}
          <TabsContent value="resources" className="space-y-6">
            <ResourceRecommendations />
          </TabsContent>

          {/* Training & Awareness */}
          <TabsContent value="training" className="space-y-6">
            <AwarenessTraining />
          </TabsContent>
        </Tabs>
      </div>

      {/* Innovative Features Components */}
      <RealTimeAlerts />
      <LanguageToggle />
    </div>
  );
};

export default AdminDashboard;
