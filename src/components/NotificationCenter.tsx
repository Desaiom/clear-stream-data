import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle,
  Clock,
  MapPin,
  Filter,
  X
} from "lucide-react";

export const NotificationCenter = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "High Turbidity Detected",
      location: "District B, Zone 2",
      message: "Turbidity levels reached 5.2 NTU, exceeding safe threshold. Immediate investigation required.",
      timestamp: "2 min ago",
      status: "active"
    },
    {
      id: 2,
      type: "warning",
      title: "pH Level Fluctuation",
      location: "District A, Zone 3",
      message: "pH levels dropped to 6.3, approaching lower safety limit. Monitor closely.",
      timestamp: "15 min ago",
      status: "active"
    },
    {
      id: 3,
      type: "critical",
      title: "Cholera Risk Alert",
      location: "Village X, District C",
      message: "ML model predicts high cholera risk (85% confidence). Immediate water testing recommended.",
      timestamp: "1 hour ago",
      status: "active"
    },
    {
      id: 4,
      type: "info",
      title: "Sensor Maintenance Scheduled",
      location: "District A, Zone 1",
      message: "Routine sensor calibration completed successfully. All parameters within normal range.",
      timestamp: "3 hours ago",
      status: "resolved"
    },
    {
      id: 5,
      type: "warning",
      title: "Temperature Spike",
      location: "District D, Zone 1",
      message: "Water temperature reached 31°C during peak hours. Bacterial growth risk elevated.",
      timestamp: "5 hours ago",
      status: "acknowledged"
    },
    {
      id: 6,
      type: "critical",
      title: "System Connectivity Loss",
      location: "District B, Zone 4",
      message: "IoT sensor offline for 2 hours. Last reading: pH 6.8, Turbidity 2.1 NTU.",
      timestamp: "2 hours ago",
      status: "active"
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-warning-orange" />;
      case "info":
        return <CheckCircle className="h-4 w-4 text-health-green" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return <Badge className="bg-warning-orange text-white">Warning</Badge>;
      case "info":
        return <Badge variant="secondary">Info</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="text-destructive border-destructive">Active</Badge>;
      case "acknowledged":
        return <Badge variant="outline" className="text-warning-orange border-warning-orange">Acknowledged</Badge>;
      case "resolved":
        return <Badge variant="outline" className="text-health-green border-health-green">Resolved</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredAlerts = selectedFilter === "all" 
    ? alerts 
    : alerts.filter(alert => alert.type === selectedFilter);

  const activeAlertsCount = alerts.filter(alert => alert.status === "active").length;
  const criticalAlertsCount = alerts.filter(alert => alert.type === "critical" && alert.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-data-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlertsCount}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalAlertsCount}</div>
            <p className="text-xs text-muted-foreground">Immediate action needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-health-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-health-green">12 min</div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>
      </div>

      {/* Notification Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-data-teal" />
            <span>Alert Center</span>
          </CardTitle>
          <CardDescription>
            Monitor and manage water quality alerts from all monitoring zones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-card">
              <TabsTrigger value="all">All Alerts ({alerts.length})</TabsTrigger>
              <TabsTrigger value="critical">Critical ({alerts.filter(a => a.type === "critical").length})</TabsTrigger>
              <TabsTrigger value="warning">Warning ({alerts.filter(a => a.type === "warning").length})</TabsTrigger>
              <TabsTrigger value="info">Info ({alerts.filter(a => a.type === "info").length})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedFilter} className="space-y-3">
              {filteredAlerts.map((alert) => (
                <Card key={alert.id} className="border-l-4" style={{
                  borderLeftColor: alert.type === "critical" ? "hsl(var(--destructive))" :
                                   alert.type === "warning" ? "hsl(var(--warning-orange))" :
                                   "hsl(var(--health-green))"
                }}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold">{alert.title}</h4>
                            {getAlertBadge(alert.type)}
                            {getStatusBadge(alert.status)}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3" />
                            <span>{alert.location}</span>
                            <Clock className="h-3 w-3 ml-2" />
                            <span>{alert.timestamp}</span>
                          </div>
                          <p className="text-sm">{alert.message}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {alert.status === "active" && (
                          <>
                            <Button size="sm" variant="outline">
                              Acknowledge
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-data-teal to-secondary">
                              Investigate
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="ghost">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};