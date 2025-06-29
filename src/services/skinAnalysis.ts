
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, analyzeSkinFn } from '@/lib/firebase';
// NOTE: Firestore (`db`) is available from `firebase.ts` but is not
// used in this public-demo build. Uncomment the following line and
// the code inside `uploadImageAndAnalyze` if you later want to persist
// each analysis.
// import { collection, addDoc } from 'firebase/firestore';

export interface AnalysisResult {

  imageUrl: string;
  predictions: Array<{
    condition: string;
    confidence: number;
  }>;
  timestamp: Date;

}

export const uploadImageAndAnalyze = async (
  file: File
): Promise<AnalysisResult> => {
  try {
    // Upload image to Firebase Storage
    const imageRef = ref(storage, `skin-images/public/${Date.now()}_${file.name}`);
    const uploadResult = await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(uploadResult.ref);

    // Invoke the Cloud Function via Firebase callable
    const { data } = await analyzeSkinFn({ imageUrl });
    const predictions = (data as any)?.predictions ?? [];

    // Build result object (not persisted in public demo)
    const analysisData = {
      imageUrl,
      predictions,
      timestamp: new Date(),
    } as AnalysisResult;

    return analysisData;
  } catch (error) {
    console.error('Error analyzing skin image:', error);
    throw error;
  }
}
