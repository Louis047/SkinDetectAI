
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';

export interface AnalysisResult {
  id: string;
  imageUrl: string;
  predictions: Array<{
    condition: string;
    confidence: number;
  }>;
  timestamp: Date;
  userId: string;
}

export const uploadImageAndAnalyze = async (
  file: File, 
  userId: string
): Promise<AnalysisResult> => {
  try {
    // Upload image to Firebase Storage
    const imageRef = ref(storage, `skin-images/${userId}/${Date.now()}_${file.name}`);
    const uploadResult = await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(uploadResult.ref);

    // Call your Google Cloud AutoML endpoint
    const autoMLResponse = await fetch('/api/analyze-skin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    const predictions = await autoMLResponse.json();

    // Store result in Firestore
    const analysisData = {
      imageUrl,
      predictions: predictions.predictions || [],
      timestamp: new Date(),
      userId,
    };

    const docRef = await addDoc(collection(db, 'skin-analyses'), analysisData);

    return {
      id: docRef.id,
      ...analysisData,
    };
  } catch (error) {
    console.error('Error analyzing skin image:', error);
    throw error;
  }
};

export const getAnalysisById = async (id: string): Promise<AnalysisResult | null> => {
  try {
    const docRef = doc(db, 'skin-analyses', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as AnalysisResult;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching analysis:', error);
    throw error;
  }
};
