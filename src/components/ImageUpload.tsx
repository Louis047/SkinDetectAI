
import { useState, useCallback } from 'react';
import { Upload, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { uploadImageAndAnalyze, AnalysisResult } from '@/services/skinAnalysis';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export function ImageUpload({ onAnalysisComplete }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const { toast } = useToast();

  const handleFileUpload = useCallback(async (file: File) => {

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a valid image file.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const result = await uploadImageAndAnalyze(file);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        onAnalysisComplete(result);
        setIsAnalyzing(false);
        setProgress(0);
      }, 500);

      toast({
        title: "Analysis Complete",
        description: "Your skin image has been successfully analyzed.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      setIsAnalyzing(false);
      setProgress(0);
      
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your image. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast, onAnalysisComplete]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  return (
    <Card 
      className={`
        relative p-8 border-2 border-dashed transition-all duration-300 hover-lift
        ${isDragOver 
          ? 'border-primary bg-primary/5 scale-105' 
          : 'border-muted-foreground/25 hover:border-primary/50'
        }
        ${isAnalyzing ? 'pointer-events-none opacity-75' : ''}
      `}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragOver(false);
      }}
      onDrop={handleDrop}
    >
      {isAnalyzing ? (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">Analyzing Image...</h3>
            <p className="text-muted-foreground">
              Our AI is processing your skin image
            </p>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">{progress}% complete</p>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center animate-glow">
            <Upload className="h-12 w-12 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">Upload Skin Image</h3>
            <p className="text-muted-foreground">
              Drag and drop your image here or click to browse
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
              id="camera-upload"
            />
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => document.getElementById('camera-upload')?.click()}
              >
                📷 Take Photo
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Supports JPG, PNG files up to 10MB
          </p>
        </div>
      )}
    </Card>
  );
}
