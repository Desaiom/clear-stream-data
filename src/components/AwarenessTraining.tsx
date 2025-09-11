import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Video, 
  Users, 
  Award,
  Play,
  Download,
  Share2,
  Heart,
  Droplets,
  Waves
} from "lucide-react";

interface TrainingModule {
  id: string;
  title: string;
  type: "video" | "guide" | "infographic";
  duration: string;
  level: "basic" | "intermediate" | "advanced";
  completions: number;
  rating: number;
  language: string[];
  description: string;
}

export const AwarenessTraining = () => {
  const trainingModules: TrainingModule[] = [
    {
      id: "1",
      title: "Safe Water Storage at Home",
      type: "video",
      duration: "5 min",
      level: "basic",
      completions: 2847,
      rating: 4.8,
      language: ["English", "Hindi", "Bengali"],
      description: "Learn proper techniques for storing drinking water safely at home to prevent contamination."
    },
    {
      id: "2",
      title: "Hand Hygiene Best Practices",
      type: "infographic",
      duration: "2 min read",
      level: "basic",
      completions: 3921,
      rating: 4.9,
      language: ["English", "Hindi", "Tamil", "Telugu"],
      description: "Visual guide showing proper handwashing techniques and when to wash hands."
    },
    {
      id: "3",
      title: "Recognizing Waterborne Disease Symptoms",
      type: "guide",
      duration: "8 min read",
      level: "intermediate",
      completions: 1456,
      rating: 4.7,
      language: ["English", "Hindi"],
      description: "Complete guide for ASHA workers to identify early symptoms of common waterborne diseases."
    },
    {
      id: "4",
      title: "Community Water Quality Testing",
      type: "video",
      duration: "12 min",
      level: "advanced",
      completions: 892,
      rating: 4.6,
      language: ["English", "Hindi", "Marathi"],
      description: "Training for community health workers on using basic water testing kits and interpreting results."
    },
    {
      id: "5",
      title: "Emergency Response During Outbreaks",
      type: "guide",
      duration: "15 min read",
      level: "advanced",
      completions: 543,
      rating: 4.8,
      language: ["English", "Hindi"],
      description: "Comprehensive protocol for healthcare workers during waterborne disease outbreaks."
    },
    {
      id: "6",
      title: "Children's Water Safety Education",
      type: "infographic",
      duration: "3 min read",
      level: "basic",
      completions: 4123,
      rating: 4.9,
      language: ["English", "Hindi", "Bengali", "Gujarati"],
      description: "Fun, colorful guide for teaching children about water safety and hygiene habits."
    }
  ];

  const getTypeIcon = (type: TrainingModule["type"]) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />;
      case "guide": return <BookOpen className="h-4 w-4" />;
      case "infographic": return <Heart className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: TrainingModule["level"]) => {
    switch (level) {
      case "basic": return "secondary";
      case "intermediate": return "outline";
      case "advanced": return "destructive";
    }
  };

  const getModuleIcon = (title: string) => {
    if (title.includes("Water") || title.includes("Storage")) return <Droplets className="h-8 w-8 text-water-blue" />;
    if (title.includes("Hand") || title.includes("Hygiene")) return <Waves className="h-8 w-8 text-health-green" />;
    if (title.includes("Community") || title.includes("Testing")) return <Users className="h-8 w-8 text-data-teal" />;
    return <BookOpen className="h-8 w-8 text-primary" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-health-green" />
          <span>Community Awareness & Training Hub</span>
        </CardTitle>
        <CardDescription>
          Educational resources for communities, healthcare workers, and families
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="infographics">Infographics</TabsTrigger>
          </TabsList>
          
          {/* All Resources */}
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {trainingModules.map((module) => (
                <Card key={module.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getModuleIcon(module.title)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{module.title}</h3>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(module.type)}
                            <Badge variant={getLevelColor(module.level)}>
                              {module.level}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{module.duration}</span>
                          <span>•</span>
                          <span>{module.completions.toLocaleString()} completions</span>
                          <span>•</span>
                          <span>⭐ {module.rating}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {module.language.map((lang) => (
                            <Badge key={lang} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" className="bg-gradient-to-r from-health-green to-secondary">
                            <Play className="h-4 w-4 mr-2" />
                            Start Learning
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {trainingModules.filter(m => m.type === "video").map((module) => (
                <Card key={module.id} className="group hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-3 flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                      <Play className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{module.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{module.duration}</span>
                      <Badge variant="secondary">Video</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-4">
            {trainingModules.filter(m => m.type === "guide").map((module) => (
              <Card key={module.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <BookOpen className="h-6 w-6 text-data-teal mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{module.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                      <Progress value={75} className="mb-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{module.duration}</span>
                        <Button size="sm" variant="outline">
                          Continue Reading
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          {/* Infographics Tab */}
          <TabsContent value="infographics" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {trainingModules.filter(m => m.type === "infographic").map((module) => (
                <Card key={module.id} className="group hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-health-green/10 to-warning-orange/10 rounded-lg mb-3 flex items-center justify-center group-hover:from-health-green/20 group-hover:to-warning-orange/20 transition-colors">
                      <Heart className="h-12 w-12 text-health-green" />
                    </div>
                    <h3 className="font-semibold mb-2">{module.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{module.duration}</span>
                      <Badge variant="outline">Infographic</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Impact Statistics */}
        <Card className="mt-6 bg-gradient-to-r from-health-green/10 to-secondary/10">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 text-center">Training Impact & Reach</h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-health-green">50,000+</div>
                <div className="text-sm text-muted-foreground">People Trained</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-data-teal">12</div>
                <div className="text-sm text-muted-foreground">Languages Supported</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning-orange">85%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};