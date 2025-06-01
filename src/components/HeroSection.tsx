
import { useState } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ImageUpload';
import { AnalysisResults } from '@/components/AnalysisResults';
import { AnalysisResult } from '@/services/skinAnalysis';

export function HeroSection() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-200/20 to-gray-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-gray-300/20 to-gray-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="gradient-text">Detect Skin Diseases</span>
                <br />
                <span className="text-foreground">in Seconds</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                AI-powered skin disease detection using advanced machine learning. 
                Upload an image and get instant, accurate analysis powered by Google Cloud AutoML.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {analysisResult && (
                <Button size="lg" className="hover-lift group" onClick={handleNewAnalysis}>
                  <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Analyze Another Image
                </Button>
              )}
              <Button variant="outline" size="lg" className="hover-lift group">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Google Cloud AI</span>
              </div>
            </div>
          </div>

          {/* Right content - Upload area or Results */}
          <div className="animate-slide-in-right">
            {analysisResult ? (
              <AnalysisResults result={analysisResult} />
            ) : (
              <ImageUpload onAnalysisComplete={handleAnalysisComplete} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
