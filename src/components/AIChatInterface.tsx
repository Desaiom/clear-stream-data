import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Bot, User, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
  hasChart?: boolean;
  chartData?: any[];
}

export const AIChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "🤖 Hello! I'm your AI assistant for water health analysis. Ask me about outbreak predictions, regional trends, or simulation scenarios. Try asking: 'Show me outbreak risk for Assam if rainfall continues next 10 days'",
      timestamp: "Just now"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const mockResponses = {
    "rainfall": {
      content: "Based on current data and predicted rainfall patterns, here's the outbreak risk forecast for Assam over the next 10 days:",
      hasChart: true,
      chartData: [
        { day: 'Day 1', risk: 25, rainfall: 15 },
        { day: 'Day 2', risk: 28, rainfall: 22 },
        { day: 'Day 3', risk: 35, rainfall: 35 },
        { day: 'Day 4', risk: 42, rainfall: 28 },
        { day: 'Day 5', risk: 38, rainfall: 18 },
        { day: 'Day 6', risk: 33, rainfall: 12 },
        { day: 'Day 7', risk: 30, rainfall: 8 },
        { day: 'Day 8', risk: 27, rainfall: 5 },
        { day: 'Day 9', risk: 24, rainfall: 3 },
        { day: 'Day 10', risk: 22, rainfall: 2 }
      ]
    },
    "cholera": {
      content: "Cholera outbreak analysis shows increasing risk in monsoon-affected areas. Here's the regional distribution:",
      hasChart: true,
      chartData: [
        { region: 'North', cases: 45, risk: 'High' },
        { region: 'South', cases: 23, risk: 'Medium' },
        { region: 'East', cases: 67, risk: 'High' },
        { region: 'West', cases: 12, risk: 'Low' }
      ]
    },
    "water quality": {
      content: "Water quality parameters are showing concerning trends in specific regions. pH levels and turbidity are the main factors affecting disease risk.",
      hasChart: true,
      chartData: [
        { week: 'Week 1', pH: 7.2, turbidity: 2.1 },
        { week: 'Week 2', pH: 6.9, turbidity: 2.8 },
        { week: 'Week 3', pH: 6.7, turbidity: 3.2 },
        { week: 'Week 4', pH: 6.5, turbidity: 3.8 }
      ]
    }
  };

  const getAIResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("rainfall") || message.includes("assam")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: mockResponses.rainfall.content,
        timestamp: "Just now",
        hasChart: true,
        chartData: mockResponses.rainfall.chartData
      };
    } else if (message.includes("cholera") || message.includes("outbreak")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: mockResponses.cholera.content,
        timestamp: "Just now",
        hasChart: true,
        chartData: mockResponses.cholera.chartData
      };
    } else if (message.includes("water") || message.includes("quality")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: mockResponses["water quality"].content,
        timestamp: "Just now",
        hasChart: true,
        chartData: mockResponses["water quality"].chartData
      };
    } else {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "I can help you analyze water health data and predict disease outbreaks. Try asking about:\n\n🌧️ Rainfall impact on disease risk\n🦠 Cholera outbreak patterns\n💧 Water quality trends\n📊 Regional health statistics\n🔮 Future outbreak predictions",
        timestamp: "Just now"
      };
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: "Just now"
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const renderChart = (message: Message) => {
    if (!message.chartData) return null;
    
    return (
      <div className="mt-4 p-4 bg-card rounded-lg">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={message.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(message.chartData[0])[0]} />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey={Object.keys(message.chartData[0])[1]} 
                stroke="#0ea5e9" 
                fill="#0ea5e9" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-data-teal" />
          <span>AI Health Forecast Simulator</span>
        </CardTitle>
        <CardDescription>
          Ask natural language queries about disease predictions and water health scenarios
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                  message.type === "user" 
                    ? "bg-primary text-white ml-4" 
                    : "bg-muted mr-4"
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === "ai" && (
                      <Bot className="h-4 w-4 text-data-teal mt-0.5 flex-shrink-0" />
                    )}
                    {message.type === "user" && (
                      <User className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      {message.hasChart && renderChart(message)}
                      <p className="text-xs opacity-70 mt-2">{message.timestamp}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-xs p-3 rounded-lg bg-muted mr-4">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-data-teal" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-data-teal rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-data-teal rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-data-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask about disease predictions, rainfall impact, regional trends..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-data-teal to-primary"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-muted"
              onClick={() => setInputMessage("Show outbreak risk if rainfall continues for Assam")}
            >
              Rainfall Impact
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-muted"
              onClick={() => setInputMessage("Cholera outbreak prediction for monsoon season")}
            >
              Disease Outbreaks
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-muted"
              onClick={() => setInputMessage("Water quality trends affecting health")}
            >
              Quality Trends
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};