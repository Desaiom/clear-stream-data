import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  FileText, 
  FileSpreadsheet,
  Calendar,
  MapPin,
  Filter,
  CheckCircle
} from "lucide-react";

export const ExportData = () => {
  const { toast } = useToast();
  const [selectedFormat, setSelectedFormat] = useState("csv");
  const [selectedTimeRange, setSelectedTimeRange] = useState("last7days");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const handleExport = (type: string) => {
    toast({
      title: "Export Started",
      description: `Generating ${type.toUpperCase()} export. Download will begin shortly.`,
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `${type.toUpperCase()} file has been downloaded successfully.`,
      });
    }, 2000);
  };

  const generateReport = () => {
    toast({
      title: "Report Generation Started",
      description: "Comprehensive PDF report is being generated. This may take a few minutes.",
    });
    
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "PDF report has been generated and is ready for download.",
      });
    }, 3000);
  };

  const exportOptions = {
    formats: [
      { value: "csv", label: "CSV", icon: FileSpreadsheet, description: "Comma-separated values for spreadsheet analysis" },
      { value: "excel", label: "Excel", icon: FileSpreadsheet, description: "Microsoft Excel format with multiple sheets" },
      { value: "json", label: "JSON", icon: FileText, description: "Machine-readable format for API integration" }
    ],
    timeRanges: [
      { value: "last24h", label: "Last 24 Hours" },
      { value: "last7days", label: "Last 7 Days" },
      { value: "last30days", label: "Last 30 Days" },
      { value: "last3months", label: "Last 3 Months" },
      { value: "last6months", label: "Last 6 Months" },
      { value: "lastyear", label: "Last Year" }
    ],
    locations: [
      { value: "all", label: "All Locations" },
      { value: "district-a", label: "District A" },
      { value: "district-b", label: "District B" },
      { value: "district-c", label: "District C" },
      { value: "district-d", label: "District D" }
    ]
  };

  const recentExports = [
    { id: 1, name: "Water Quality Data - March 2024", format: "CSV", size: "2.3 MB", date: "2 hours ago", status: "completed" },
    { id: 2, name: "Disease Predictions Report", format: "PDF", size: "8.7 MB", date: "1 day ago", status: "completed" },
    { id: 3, name: "IoT Sensor Readings - Weekly", format: "Excel", size: "5.1 MB", date: "3 days ago", status: "completed" },
    { id: 4, name: "Alert History Export", format: "JSON", size: "892 KB", date: "1 week ago", status: "completed" }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="export" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card">
          <TabsTrigger value="export">Data Export</TabsTrigger>
          <TabsTrigger value="reports">PDF Reports</TabsTrigger>
          <TabsTrigger value="history">Export History</TabsTrigger>
        </TabsList>

        {/* Data Export */}
        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5 text-data-teal" />
                <span>Export Validated Data</span>
              </CardTitle>
              <CardDescription>
                Download water quality data and predictions in various formats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Export Configuration */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Format</span>
                  </label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {exportOptions.formats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          <div className="flex items-center space-x-2">
                            <format.icon className="h-4 w-4" />
                            <span>{format.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Time Range</span>
                  </label>
                  <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {exportOptions.timeRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Location</span>
                  </label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {exportOptions.locations.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Export Options */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileSpreadsheet className="h-6 w-6 text-health-green" />
                    <h4 className="font-medium">Water Quality Data</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    pH, turbidity, temperature, and other sensor readings
                  </p>
                  <Button 
                    onClick={() => handleExport("water-quality")} 
                    className="w-full bg-gradient-to-r from-health-green to-secondary"
                  >
                    Export Water Data
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="h-6 w-6 text-data-teal" />
                    <h4 className="font-medium">Disease Predictions</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    ML-generated disease risk predictions and confidence scores
                  </p>
                  <Button 
                    onClick={() => handleExport("predictions")} 
                    className="w-full bg-gradient-to-r from-data-teal to-secondary"
                  >
                    Export Predictions
                  </Button>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Filter className="h-6 w-6 text-warning-orange" />
                    <h4 className="font-medium">Complete Dataset</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    All validated data including alerts and historical trends
                  </p>
                  <Button 
                    onClick={() => handleExport("complete")} 
                    className="w-full bg-gradient-to-r from-warning-orange to-secondary"
                  >
                    Export All Data
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PDF Reports */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-data-teal" />
                <span>Auto-Generated PDF Reports</span>
              </CardTitle>
              <CardDescription>
                Comprehensive reports with visualizations and analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Weekly Summary Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Includes key metrics, trends, and alert summaries for the past week
                  </p>
                  <Button onClick={generateReport} className="w-full">
                    Generate Weekly Report
                  </Button>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Monthly Analytics Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Detailed analysis with charts, predictions, and recommendations
                  </p>
                  <Button onClick={generateReport} className="w-full">
                    Generate Monthly Report
                  </Button>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Custom Date Range Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tailored report for specific time periods and locations
                  </p>
                  <Button onClick={generateReport} className="w-full">
                    Generate Custom Report
                  </Button>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Compliance Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Regulatory compliance summary with safety assessments
                  </p>
                  <Button onClick={generateReport} className="w-full">
                    Generate Compliance Report
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Export History */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-health-green" />
                <span>Recent Exports</span>
              </CardTitle>
              <CardDescription>
                Track your data export history and re-download previous exports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentExports.map((exportItem) => (
                  <div key={exportItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-5 w-5 text-data-teal" />
                      <div>
                        <div className="font-medium">{exportItem.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {exportItem.size} • {exportItem.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">{exportItem.format}</Badge>
                      <Badge variant="secondary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {exportItem.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};