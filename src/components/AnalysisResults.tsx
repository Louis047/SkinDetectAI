
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { AnalysisResult } from '@/services/skinAnalysis';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.8) return CheckCircle;
    if (confidence >= 0.6) return Info;
    return AlertTriangle;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Analysis Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img 
              src={result.imageUrl} 
              alt="Analyzed skin image"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Detected Conditions:</h3>
            {result.predictions.length > 0 ? (
              <div className="space-y-3">
                {result.predictions.map((prediction, index) => {
                  const ConfidenceIcon = getConfidenceIcon(prediction.confidence);
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <ConfidenceIcon className={`h-5 w-5 ${getConfidenceColor(prediction.confidence)}`} />
                        <span className="font-medium">{prediction.condition}</span>
                      </div>
                      <Badge variant="outline" className={getConfidenceColor(prediction.confidence)}>
                        {(prediction.confidence * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground">No specific conditions detected.</p>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Important Disclaimer
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  This AI analysis is for informational purposes only and should not replace professional medical advice. 
                  Please consult with a dermatologist for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
