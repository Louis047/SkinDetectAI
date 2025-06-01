
import { Upload, Brain, FileCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    icon: Upload,
    title: 'Upload Image',
    description: 'Upload a clear photo of the skin area you want to analyze. Our system accepts JPG and PNG formats.',
    step: '01',
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Our Google Cloud AutoML model processes the image using advanced computer vision algorithms.',
    step: '02',
  },
  {
    icon: FileCheck,
    title: 'Get Results',
    description: 'Receive detailed analysis with condition predictions, confidence scores, and recommendations.',
    step: '03',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="absolute inset-0 gradient-bg"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get skin disease detection in three simple steps. Our AI-powered system makes it fast and easy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary/50 to-primary/25 transform -translate-y-1/2"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary/25 to-primary/50 transform -translate-y-1/2"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={step.title} 
                className="relative hover-lift glass-effect border-0 shadow-lg animate-scale-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 text-center space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center animate-glow">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
