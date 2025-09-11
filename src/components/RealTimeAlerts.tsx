import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell, X, Droplets, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  type: "outbreak" | "quality" | "system";
  severity: "high" | "medium" | "low";
  location: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

export const RealTimeAlerts = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "outbreak",
      severity: "high",
      location: "Village Kendra, District A",
      message: "High cholera risk detected. Immediate water testing recommended.",
      timestamp: "2 min ago",
      resolved: false
    },
    {
      id: "2",
      type: "quality",
      severity: "medium",
      location: "Zone 3, District B",
      message: "pH levels trending outside safe range. Monitor closely.",
      timestamp: "15 min ago",
      resolved: false
    },
    {
      id: "3",
      type: "system",
      severity: "low",
      location: "IoT Sensor Network",
      message: "3 sensors offline in remote areas. Field maintenance scheduled.",
      timestamp: "1 hour ago",
      resolved: false
    }
  ]);
  
  const [showAlertsPanel, setShowAlertsPanel] = useState(false);

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert: Alert = {
        id: Date.now().toString(),
        type: ["outbreak", "quality", "system"][Math.floor(Math.random() * 3)] as Alert["type"],
        severity: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as Alert["severity"],
        location: `Zone ${Math.floor(Math.random() * 5) + 1}, District ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
        message: "New alert detected - water quality parameters require attention.",
        timestamp: "Just now",
        resolved: false
      };
      
      setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      
      // Show toast notification
      toast({
        title: "🚨 New Alert",
        description: `${newAlert.location}: ${newAlert.message.substring(0, 50)}...`,
        variant: newAlert.severity === "high" ? "destructive" : "default",
      });
    }, 30000); // New alert every 30 seconds
    
    return () => clearInterval(interval);
  }, [toast]);

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      )
    );
  };

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "outbreak": return <AlertTriangle className="h-4 w-4" />;
      case "quality": return <Droplets className="h-4 w-4" />;
      case "system": return <Activity className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "outline";
      case "low": return "secondary";
    }
  };

  const unresolvedAlerts = alerts.filter(alert => !alert.resolved);

  return (
    <>
      {/* Alert Bell - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setShowAlertsPanel(!showAlertsPanel)}
          size="lg"
          className="relative bg-gradient-to-r from-warning-orange to-red-500 hover:opacity-90 rounded-full shadow-lg"
        >
          <Bell className="h-5 w-5" />
          {unresolvedAlerts.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-red-600 text-white">
              {unresolvedAlerts.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Alerts Panel - Sidebar */}
      {showAlertsPanel && (
        <div className="fixed top-0 right-0 h-full w-96 bg-background border-l shadow-xl z-40 animate-slide-in-right">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning-orange" />
              <h2 className="font-semibold">Real-Time Alerts</h2>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAlertsPanel(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-4 space-y-4 max-h-full overflow-y-auto">
            {unresolvedAlerts.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No active alerts</p>
                </CardContent>
              </Card>
            ) : (
              unresolvedAlerts.map((alert) => (
                <Card key={alert.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {getAlertIcon(alert.type)}
                        <CardTitle className="text-sm font-medium">
                          {alert.location}
                        </CardTitle>
                      </div>
                      <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm mb-3">
                      {alert.message}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {alert.timestamp}
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => resolveAlert(alert.id)}
                      >
                        Resolve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          <div className="p-4 border-t bg-muted/20">
            <p className="text-xs text-muted-foreground text-center">
              🔴 Live monitoring • Updates every few seconds
            </p>
          </div>
        </div>
      )}
    </>
  );
};