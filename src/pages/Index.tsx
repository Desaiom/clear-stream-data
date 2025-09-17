import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Shield, Users, BarChart3, Search, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { RealTimeAlerts } from "@/components/RealTimeAlerts";
import { LanguageToggle } from "@/components/LanguageToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-clean-blue to-background">
      {/* Header */}
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Droplets className="h-8 w-8 text-water-blue" />
          <span className="text-xl font-bold" data-translate="title">GramSwasthya</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Droplets className="h-12 w-12 text-water-blue" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-water-blue to-data-teal bg-clip-text text-transparent" data-translate="title">
              GramSwasthya
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-translate="subtitle">
            Unified Rural Health Monitoring Platform for Disease Prevention & Public Health
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Nationwide Coverage • Real-time Data • AI-Powered Predictions
          </Badge>
        </div>
      </header>

      {/* Access Portals */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Admin Panel */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-deep-blue rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-primary">Admin Panel</CardTitle>
              <CardDescription className="text-base">
                Data validation & management for administrators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-data-teal" />
                  <span>IoT Sensor Data Monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-data-teal" />
                  <span>PDF Report Processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-data-teal" />
                  <span>Data Validation & Correction</span>
                </div>
              </div>
              <Button asChild className="w-full bg-gradient-to-r from-primary to-deep-blue hover:opacity-90 transition-opacity">
                <Link to="/admin">Access Admin Dashboard</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Public Portal */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/20">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary to-health-green rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-secondary">Public Portal</CardTitle>
              <CardDescription className="text-base">
                Open access for healthcare workers & citizens
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Search className="h-5 w-5 text-health-green" />
                  <span>Location-based Search</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-health-green" />
                  <span>Interactive Data Visualization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-health-green" />
                  <span>Disease Risk Predictions</span>
                </div>
              </div>
              <Button asChild variant="secondary" className="w-full bg-gradient-to-r from-secondary to-health-green hover:opacity-90 transition-opacity">
                <Link to="/public">Search Water Health Data</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-water-blue">500+</div>
              <div className="text-sm text-muted-foreground">IoT Sensors</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-data-teal">1000+</div>
              <div className="text-sm text-muted-foreground">Locations Covered</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-health-green">95%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">24/7</div>
              <div className="text-sm text-muted-foreground">Real-time Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>&copy; 2024 GramSwasthya Platform. Protecting rural health through community monitoring.</p>
      </footer>

      {/* Innovative Features Components */}
      <RealTimeAlerts />
      <LanguageToggle />
    </div>
  );
};

export default Index;