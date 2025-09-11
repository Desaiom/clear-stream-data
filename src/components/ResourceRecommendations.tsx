import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Users, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  MapPin,
  Truck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Recommendation {
  id: string;
  type: "supplies" | "personnel" | "equipment";
  priority: "high" | "medium" | "low";
  location: string;
  action: string;
  reason: string;
  status: "pending" | "approved" | "deployed";
  estimatedCost: string;
  impact: string;
}

export const ResourceRecommendations = () => {
  const { toast } = useToast();
  
  const recommendations: Recommendation[] = [
    {
      id: "1",
      type: "supplies",
      priority: "high",
      location: "Village Kendra, District A",
      action: "Send 100 ORS packets + Water purification tablets",
      reason: "High cholera risk detected. 250+ population at risk.",
      status: "pending",
      estimatedCost: "₹2,500",
      impact: "Prevents 80+ potential cases"
    },
    {
      id: "2",
      type: "personnel",
      priority: "high",
      location: "District B Health Center",
      action: "Deploy 3 medical officers + 2 ASHA workers",
      reason: "Outbreak response team needed for surge in cases.",
      status: "approved",
      estimatedCost: "₹15,000/week",
      impact: "Covers 5,000+ population"
    },
    {
      id: "3",
      type: "equipment",
      priority: "medium",
      location: "Government School, Zone 3",
      action: "Install UV water purifier system",
      reason: "Poor water quality affecting 400+ students daily.",
      status: "pending",
      estimatedCost: "₹45,000",
      impact: "Benefits 400 students + teachers"
    },
    {
      id: "4",
      type: "supplies",
      priority: "medium",
      location: "Rural Clinic, Zone 5",
      action: "Stock antibiotics + rehydration salts",
      reason: "Monsoon season preparation for waterborne diseases.",
      status: "deployed",
      estimatedCost: "₹8,000",
      impact: "Emergency preparedness for 1,000+ people"
    },
    {
      id: "5",
      type: "equipment",
      priority: "low",
      location: "Community Center, District C",
      action: "Deploy portable water testing kits",
      reason: "Enable local water quality monitoring capability.",
      status: "pending",
      estimatedCost: "₹12,000",
      impact: "Enables community-level monitoring"
    }
  ];

  const handleApprove = (id: string) => {
    toast({
      title: "✅ Recommendation Approved",
      description: "Resource deployment has been authorized and scheduled.",
    });
  };

  const handleDeploy = (id: string) => {
    toast({
      title: "🚛 Deployment Initiated",
      description: "Resources are being dispatched to the location.",
    });
  };

  const getTypeIcon = (type: Recommendation["type"]) => {
    switch (type) {
      case "supplies": return <Package className="h-4 w-4" />;
      case "personnel": return <Users className="h-4 w-4" />;
      case "equipment": return <Filter className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: Recommendation["priority"]) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "outline";
      case "low": return "secondary";
    }
  };

  const getStatusIcon = (status: Recommendation["status"]) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-warning-orange" />;
      case "approved": return <CheckCircle className="h-4 w-4 text-health-green" />;
      case "deployed": return <Truck className="h-4 w-4 text-data-teal" />;
    }
  };

  const filterByType = (type: Recommendation["type"]) => 
    recommendations.filter(rec => rec.type === type);

  const filterByPriority = (priority: Recommendation["priority"]) => 
    recommendations.filter(rec => rec.priority === priority);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-warning-orange" />
          <span>AI-Powered Resource Recommendations</span>
        </CardTitle>
        <CardDescription>
          Intelligent action suggestions based on real-time data analysis and disease prediction models
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({recommendations.length})</TabsTrigger>
            <TabsTrigger value="high">High Priority</TabsTrigger>
            <TabsTrigger value="supplies">Supplies</TabsTrigger>
            <TabsTrigger value="personnel">Personnel</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(rec.type)}
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{rec.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(rec.priority)}>
                        {rec.priority.toUpperCase()}
                      </Badge>
                      {getStatusIcon(rec.status)}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="font-medium text-primary">{rec.action}</p>
                    <p className="text-sm text-muted-foreground">{rec.reason}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <span className="text-xs text-muted-foreground">Estimated Cost:</span>
                        <p className="font-medium text-sm">{rec.estimatedCost}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Expected Impact:</span>
                        <p className="font-medium text-sm">{rec.impact}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {rec.status === "pending" && (
                      <Button 
                        size="sm" 
                        onClick={() => handleApprove(rec.id)}
                        className="bg-gradient-to-r from-health-green to-secondary"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    )}
                    {rec.status === "approved" && (
                      <Button 
                        size="sm" 
                        onClick={() => handleDeploy(rec.id)}
                        className="bg-gradient-to-r from-data-teal to-primary"
                      >
                        <Truck className="h-4 w-4 mr-2" />
                        Deploy Now
                      </Button>
                    )}
                    {rec.status === "deployed" && (
                      <Badge variant="secondary" className="px-3 py-1">
                        <Truck className="h-3 w-3 mr-1" />
                        Deployed
                      </Badge>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="high" className="space-y-4">
            {filterByPriority("high").map((rec) => (
              <Card key={rec.id} className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(rec.type)}
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{rec.location}</span>
                      </div>
                    </div>
                    <Badge variant="destructive">HIGH PRIORITY</Badge>
                  </div>
                  <p className="font-medium text-primary mb-2">{rec.action}</p>
                  <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-red-500 to-warning-orange"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Urgent Action Required
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="supplies" className="space-y-4">
            {filterByType("supplies").map((rec) => (
              <Card key={rec.id} className="border-l-4 border-l-health-green">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="h-5 w-5 text-health-green" />
                    <span className="font-medium">{rec.location}</span>
                  </div>
                  <p className="text-primary font-medium">{rec.action}</p>
                  <p className="text-sm text-muted-foreground mt-2">{rec.estimatedCost}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="personnel" className="space-y-4">
            {filterByType("personnel").map((rec) => (
              <Card key={rec.id} className="border-l-4 border-l-data-teal">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-data-teal" />
                    <span className="font-medium">{rec.location}</span>
                  </div>
                  <p className="text-primary font-medium">{rec.action}</p>
                  <p className="text-sm text-muted-foreground mt-2">{rec.estimatedCost}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="equipment" className="space-y-4">
            {filterByType("equipment").map((rec) => (
              <Card key={rec.id} className="border-l-4 border-l-warning-orange">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Filter className="h-5 w-5 text-warning-orange" />
                    <span className="font-medium">{rec.location}</span>
                  </div>
                  <p className="text-primary font-medium">{rec.action}</p>
                  <p className="text-sm text-muted-foreground mt-2">{rec.estimatedCost}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};