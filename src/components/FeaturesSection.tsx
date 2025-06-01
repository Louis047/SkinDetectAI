
import { Clock, Shield, Cpu, Camera, FileText, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Zap,
    title: 'Instant Analysis',
    description: 'Get immediate results with our AI-powered detection system trained on thousands of skin images.',
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'No more waiting for appointments. Upload your image and receive analysis in seconds.',
  },
  {
    icon: Cpu,
    title: 'AI-Powered',
    description: 'Built with Google Cloud AutoML for accurate and reliable skin condition detection.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your images are encrypted and processed securely. We prioritize your privacy and data protection.',
  },
  {
    icon: Camera,
    title: 'High Accuracy',
    description: 'Advanced computer vision algorithms provide 99%+ accuracy in detecting various skin conditions.',
  },
  {
    icon: FileText,
    title: 'Detailed Reports',
    description: 'Receive comprehensive analysis reports with recommendations and confidence scores.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SkinDetect AI makes skin disease detection simple, fast, and accurate with cutting-edge technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title} 
                className="hover-lift glass-effect animate-scale-in border-0 shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
