import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Settings,
  Plus,
  X,
  CheckCircle
} from "lucide-react";

interface AlertSubscription {
  id: string;
  location: string;
  email?: string;
  phone?: string;
  alertTypes: string[];
  isActive: boolean;
}

export const PersonalizedAlerts = () => {
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState<AlertSubscription[]>([
    {
      id: "1",
      location: "District A, Zone 1",
      email: "user@example.com",
      phone: "+91 98765 43210",
      alertTypes: ["critical", "warning"],
      isActive: true
    }
  ]);
  
  const [newSubscription, setNewSubscription] = useState({
    location: "",
    email: "",
    phone: "",
    alertTypes: [] as string[],
    notifications: {
      email: false,
      sms: false
    }
  });

  const alertTypes = [
    { value: "critical", label: "Critical Alerts", description: "Immediate health risks" },
    { value: "warning", label: "Warning Alerts", description: "Water quality concerns" },
    { value: "maintenance", label: "Maintenance Updates", description: "System maintenance notices" },
    { value: "reports", label: "Weekly Reports", description: "Summary reports" }
  ];

  const availableLocations = [
    "District A, Zone 1",
    "District A, Zone 2",
    "District B, Zone 1",
    "District B, Zone 2",
    "District C, Zone 1",
    "District D, Zone 1"
  ];

  const handleSubscribe = () => {
    if (!newSubscription.location) {
      toast({
        title: "Location Required",
        description: "Please select a location for alerts.",
        variant: "destructive"
      });
      return;
    }

    if (!newSubscription.notifications.email && !newSubscription.notifications.sms) {
      toast({
        title: "Notification Method Required",
        description: "Please enable at least one notification method.",
        variant: "destructive"
      });
      return;
    }

    const subscription: AlertSubscription = {
      id: Date.now().toString(),
      location: newSubscription.location,
      email: newSubscription.notifications.email ? newSubscription.email : undefined,
      phone: newSubscription.notifications.sms ? newSubscription.phone : undefined,
      alertTypes: newSubscription.alertTypes,
      isActive: true
    };

    setSubscriptions([...subscriptions, subscription]);
    setNewSubscription({
      location: "",
      email: "",
      phone: "",
      alertTypes: [],
      notifications: { email: false, sms: false }
    });

    toast({
      title: "Subscription Created",
      description: `You will now receive alerts for ${subscription.location}`,
    });
  };

  const toggleSubscription = (id: string) => {
    setSubscriptions(subscriptions.map(sub => 
      sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
    ));
    
    toast({
      title: "Subscription Updated",
      description: "Alert subscription status has been changed.",
    });
  };

  const removeSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    toast({
      title: "Subscription Removed",
      description: "Alert subscription has been deleted.",
    });
  };

  const testAlert = (location: string) => {
    toast({
      title: "Test Alert Sent",
      description: `A test notification has been sent for ${location}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Subscribe to Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-health-green" />
            <span>Subscribe to Water Quality Alerts</span>
          </CardTitle>
          <CardDescription>
            Get notified when water quality changes in your area
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Location Selection */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Select Location</span>
            </Label>
            <Select value={newSubscription.location} onValueChange={(value) => 
              setNewSubscription({...newSubscription, location: value})
            }>
              <SelectTrigger>
                <SelectValue placeholder="Choose your area" />
              </SelectTrigger>
              <SelectContent>
                {availableLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notification Methods */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-data-teal" />
                  <span className="font-medium">Email Notifications</span>
                </div>
                <Switch
                  checked={newSubscription.notifications.email}
                  onCheckedChange={(checked) => 
                    setNewSubscription({
                      ...newSubscription, 
                      notifications: {...newSubscription.notifications, email: checked}
                    })
                  }
                />
              </div>
              {newSubscription.notifications.email && (
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newSubscription.email}
                  onChange={(e) => setNewSubscription({...newSubscription, email: e.target.value})}
                />
              )}
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-health-green" />
                  <span className="font-medium">SMS Notifications</span>
                </div>
                <Switch
                  checked={newSubscription.notifications.sms}
                  onCheckedChange={(checked) => 
                    setNewSubscription({
                      ...newSubscription, 
                      notifications: {...newSubscription.notifications, sms: checked}
                    })
                  }
                />
              </div>
              {newSubscription.notifications.sms && (
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={newSubscription.phone}
                  onChange={(e) => setNewSubscription({...newSubscription, phone: e.target.value})}
                />
              )}
            </Card>
          </div>

          {/* Alert Types */}
          <div className="space-y-3">
            <Label>Alert Types</Label>
            <div className="grid grid-cols-2 gap-3">
              {alertTypes.map((type) => (
                <Card key={type.value} className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{type.label}</span>
                    <Switch
                      checked={newSubscription.alertTypes.includes(type.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewSubscription({
                            ...newSubscription,
                            alertTypes: [...newSubscription.alertTypes, type.value]
                          });
                        } else {
                          setNewSubscription({
                            ...newSubscription,
                            alertTypes: newSubscription.alertTypes.filter(t => t !== type.value)
                          });
                        }
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSubscribe} 
            className="w-full bg-gradient-to-r from-health-green to-secondary"
          >
            <Bell className="h-4 w-4 mr-2" />
            Subscribe to Alerts
          </Button>
        </CardContent>
      </Card>

      {/* Active Subscriptions */}
      {subscriptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-data-teal" />
              <span>Your Alert Subscriptions</span>
            </CardTitle>
            <CardDescription>
              Manage your existing water quality alert subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <Card key={subscription.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-data-teal" />
                      <div>
                        <div className="font-medium">{subscription.location}</div>
                        <div className="text-sm text-muted-foreground">
                          {subscription.email && `Email: ${subscription.email}`}
                          {subscription.email && subscription.phone && " • "}
                          {subscription.phone && `SMS: ${subscription.phone}`}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={subscription.isActive ? "secondary" : "outline"}>
                        {subscription.isActive ? "Active" : "Paused"}
                      </Badge>
                      <Switch
                        checked={subscription.isActive}
                        onCheckedChange={() => toggleSubscription(subscription.id)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {subscription.alertTypes.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {alertTypes.find(at => at.value === type)?.label}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => testAlert(subscription.location)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Test Alert
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => removeSubscription(subscription.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-warning-orange" />
            <span>Recent Alerts Sent</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { location: "District A, Zone 1", type: "warning", message: "pH levels dropped to 6.3", time: "2 hours ago" },
              { location: "District B, Zone 2", type: "critical", message: "High turbidity detected - 5.2 NTU", time: "1 day ago" },
              { location: "District C, Zone 1", type: "maintenance", message: "Sensor maintenance completed", time: "3 days ago" }
            ].map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-sm">{alert.location}</div>
                    <div className="text-sm text-muted-foreground">{alert.message}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={alert.type === "critical" ? "destructive" : 
                                 alert.type === "warning" ? "destructive" : "secondary"}>
                    {alert.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};