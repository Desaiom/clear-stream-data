import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  Flag,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  ThumbsUp
} from "lucide-react";

interface WaterIssue {
  id: string;
  title: string;
  description: string;
  location: string;
  reporterName: string;
  reporterContact: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "submitted" | "investigating" | "resolved";
  submittedAt: string;
  upvotes: number;
}

export const CommunityEngagement = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    reporterName: "",
    reporterEmail: "",
    reporterPhone: ""
  });

  const [reportedIssues, setReportedIssues] = useState<WaterIssue[]>([
    {
      id: "1",
      title: "Unusual Water Color",
      description: "Water from the community well has been yellowish for the past 3 days. Many residents are concerned about safety.",
      location: "Village Center, District A",
      reporterName: "Raj Kumar",
      reporterContact: "raj@example.com",
      category: "water-quality",
      priority: "high",
      status: "investigating",
      submittedAt: "2 days ago",
      upvotes: 12
    },
    {
      id: "2",
      title: "Broken Water Pipe",
      description: "Main water supply pipe is leaking near the school. Children are using contaminated water for drinking.",
      location: "Government School, District B",
      reporterName: "Priya Singh",
      reporterContact: "+91 98765 43210",
      category: "infrastructure",
      priority: "high",
      status: "submitted",
      submittedAt: "1 day ago",
      upvotes: 8
    },
    {
      id: "3",
      title: "Foul Smell in Water",
      description: "Community bore well water has a strong smell. Some people reported stomach issues after consumption.",
      location: "Ward 5, District C",
      reporterName: "Anonymous",
      reporterContact: "anonymous@example.com",
      category: "water-quality",
      priority: "medium",
      status: "resolved",
      submittedAt: "1 week ago",
      upvotes: 15
    }
  ]);

  const categories = [
    { value: "water-quality", label: "Water Quality Issues" },
    { value: "infrastructure", label: "Infrastructure Problems" },
    { value: "supply", label: "Water Supply Issues" },
    { value: "contamination", label: "Contamination Reports" },
    { value: "maintenance", label: "Maintenance Requests" },
    { value: "other", label: "Other Issues" }
  ];

  const handleSubmitReport = () => {
    if (!formData.title || !formData.description || !formData.location || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newIssue: WaterIssue = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      location: formData.location,
      reporterName: formData.reporterName || "Anonymous",
      reporterContact: formData.reporterEmail || formData.reporterPhone || "N/A",
      category: formData.category,
      priority: "medium",
      status: "submitted",
      submittedAt: "Just now",
      upvotes: 0
    };

    setReportedIssues([newIssue, ...reportedIssues]);
    setFormData({
      title: "",
      description: "",
      location: "",
      category: "",
      reporterName: "",
      reporterEmail: "",
      reporterPhone: ""
    });

    toast({
      title: "Report Submitted",
      description: "Thank you for reporting this water issue. Our team will investigate soon.",
    });
  };

  const handleUpvote = (id: string) => {
    setReportedIssues(reportedIssues.map(issue => 
      issue.id === id ? { ...issue, upvotes: issue.upvotes + 1 } : issue
    ));
    
    toast({
      title: "Support Added",
      description: "Your support has been recorded for this issue.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning-orange";
      case "low": return "text-health-green";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted": return <Clock className="h-4 w-4 text-warning-orange" />;
      case "investigating": return <AlertTriangle className="h-4 w-4 text-data-teal" />;
      case "resolved": return <CheckCircle className="h-4 w-4 text-health-green" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted": return <Badge variant="outline" className="text-warning-orange border-warning-orange">Submitted</Badge>;
      case "investigating": return <Badge variant="outline" className="text-data-teal border-data-teal">Investigating</Badge>;
      case "resolved": return <Badge variant="outline" className="text-health-green border-health-green">Resolved</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Water Issue Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Flag className="h-5 w-5 text-data-teal" />
            <span>Report a Water Issue</span>
          </CardTitle>
          <CardDescription>
            Help us improve water safety by reporting issues in your community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                placeholder="Brief description of the problem"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Location *</span>
            </Label>
            <Input
              id="location"
              placeholder="Specific location of the issue (e.g., Village Center, Near School)"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed information about the water issue, when it started, how many people are affected, etc."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
            />
          </div>

          {/* Reporter Information (Optional) */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Contact Information (Optional)</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Your Name</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Your name (optional)"
                  value={formData.reporterName}
                  onChange={(e) => setFormData({...formData, reporterName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.reporterEmail}
                  onChange={(e) => setFormData({...formData, reporterEmail: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.reporterPhone}
                  onChange={(e) => setFormData({...formData, reporterPhone: e.target.value})}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Providing contact information helps us follow up on your report. You can also report anonymously.
            </p>
          </div>

          <Button 
            onClick={handleSubmitReport}
            className="w-full bg-gradient-to-r from-data-teal to-secondary"
          >
            <Flag className="h-4 w-4 mr-2" />
            Submit Water Issue Report
          </Button>
        </CardContent>
      </Card>

      {/* Community Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-data-teal" />
            <span>Recent Community Reports</span>
          </CardTitle>
          <CardDescription>
            Water issues reported by community members. Support important issues by upvoting them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportedIssues.map((issue) => (
              <Card key={issue.id} className="border-l-4" style={{
                borderLeftColor: issue.priority === "high" ? "hsl(var(--destructive))" :
                                 issue.priority === "medium" ? "hsl(var(--warning-orange))" :
                                 "hsl(var(--health-green))"
              }}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-lg">{issue.title}</h4>
                        <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                          {issue.priority.toUpperCase()}
                        </Badge>
                        {getStatusBadge(issue.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{issue.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{issue.submittedAt}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{issue.reporterName}</span>
                        </div>
                      </div>
                      <p className="text-sm mb-3">{issue.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {categories.find(cat => cat.value === issue.category)?.label}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-center space-y-2 ml-4">
                      {getStatusIcon(issue.status)}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpvote(issue.id)}
                        className="flex items-center space-x-1"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>{issue.upvotes}</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-health-green" />
            <span>Community Impact</span>
          </CardTitle>
          <CardDescription>
            How community engagement is improving water safety
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-data-teal mb-1">47</div>
              <div className="text-sm text-muted-foreground">Issues Reported</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-health-green mb-1">32</div>
              <div className="text-sm text-muted-foreground">Issues Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning-orange mb-1">85%</div>
              <div className="text-sm text-muted-foreground">Community Satisfaction</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-card/50 rounded-lg">
            <h4 className="font-medium mb-2">Latest Success Story</h4>
            <p className="text-sm text-muted-foreground">
              Thanks to Priya Singh's report, the broken water pipe near Government School in District B was fixed within 48 hours, 
              ensuring safe drinking water for over 200 students. Community reporting makes a real difference!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};