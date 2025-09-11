import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", flag: "🇮🇳" },
];

// Mock translations for demo
const translations = {
  en: {
    title: "AquaHealth",
    subtitle: "Unified Water Health Monitoring Platform for Disease Prevention & Public Health",
    adminPanel: "Admin Panel",
    publicPortal: "Public Portal",
    searchPlaceholder: "Search by location...",
    waterQualityStatus: "Water Quality Status",
    diseaseRiskLevel: "Disease Risk Level",
    lastUpdated: "Last Updated"
  },
  hi: {
    title: "एक्वाहेल्थ",
    subtitle: "रोग निवारण और सार्वजनिक स्वास्थ्य के लिए एकीकृत जल स्वास्थ्य निगरानी मंच",
    adminPanel: "प्रशासन पैनल",
    publicPortal: "सार्वजनिक पोर्टल",
    searchPlaceholder: "स्थान द्वारा खोजें...",
    waterQualityStatus: "जल गुणवत्ता स्थिति",
    diseaseRiskLevel: "रोग जोखिम स्तर",
    lastUpdated: "अंतिम अपडेट"
  },
  bn: {
    title: "অ্যাকুয়াহেলথ",
    subtitle: "রোগ প্রতিরোধ ও জনস্বাস্থ্যের জন্য একীভূত জল স্বাস্থ্য পর্যবেক্ষণ প্ল্যাটফর্ম",
    adminPanel: "অ্যাডমিন প্যানেল",
    publicPortal: "পাবলিক পোর্টাল",
    searchPlaceholder: "অবস্থান অনুসারে অনুসন্ধান করুন...",
    waterQualityStatus: "জলের গুণমান অবস্থা",
    diseaseRiskLevel: "রোগের ঝুঁকির মাত্রা",
    lastUpdated: "সর্বশেষ আপডেট"
  }
};

export const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleLanguageChange = (language: Language) => {
    setIsTranslating(true);
    
    // Simulate translation loading
    setTimeout(() => {
      setCurrentLanguage(language);
      setIsTranslating(false);
      
      // Mock translation of page content
      if (typeof window !== 'undefined') {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach((element) => {
          const key = element.getAttribute('data-translate') as keyof typeof translations.en;
          if (key && translations[language.code as keyof typeof translations]) {
            element.textContent = translations[language.code as keyof typeof translations][key] || element.textContent;
          }
        });
      }
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-background/90 backdrop-blur border-2 shadow-lg hover:shadow-xl transition-all"
            disabled={isTranslating}
          >
            <Globe className="h-4 w-4 mr-2" />
            <span className="mr-2">{currentLanguage.flag}</span>
            <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
            <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
            
            {isTranslating && (
              <div className="ml-2 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            )}
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="start" className="w-64">
          <div className="p-2">
            <div className="text-sm font-medium text-muted-foreground mb-2 px-2">
              Select Language / भाषा चुनें
            </div>
            
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className="flex items-center space-x-3 py-2 cursor-pointer"
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{language.nativeName}</div>
                  <div className="text-xs text-muted-foreground">{language.name}</div>
                </div>
                {currentLanguage.code === language.code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
          
          <div className="border-t p-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
              <span>Translation Coverage:</span>
              <Badge variant="outline" className="text-xs">
                {languages.length} Languages
              </Badge>
            </div>
            <div className="mt-1 text-xs text-muted-foreground px-2">
              🌍 Ready for rural India deployment
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Language Status Indicator */}
      {currentLanguage.code !== 'en' && (
        <div className="mt-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Globe className="h-3 w-3 mr-1" />
            Viewing in {currentLanguage.nativeName}
          </Badge>
        </div>
      )}
    </div>
  );
};