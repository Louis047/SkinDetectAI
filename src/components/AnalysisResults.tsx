import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Info } from 'lucide-react';
import { AnalysisResult } from '@/services/skinAnalysis';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const CONFIDENCE_THRESHOLD = 0.85; // below this treated as no detection
  const topPredictionRaw = result.predictions.length > 0
    ? result.predictions.reduce((max, curr) => curr.confidence > max.confidence ? curr : max, result.predictions[0])
    : null;
  const topPrediction = topPredictionRaw && topPredictionRaw.confidence >= CONFIDENCE_THRESHOLD ? topPredictionRaw : null;

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
            <h3 className="text-lg font-semibold">Detected Condition:</h3>
            {topPrediction ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">{topPrediction.condition}</span>
                  <span className="text-sm text-muted-foreground">{(topPrediction.confidence * 100).toFixed(1)}%</span>
                </div>
                <Progress value={Math.round(topPrediction.confidence * 100)} className="h-2" />
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
