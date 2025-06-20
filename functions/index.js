const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const { PredictionServiceClient } = require('@google-cloud/automl');

admin.initializeApp();

const client = new PredictionServiceClient();
const projectId = process.env.GOOGLE_CLOUD_PROJECT;
const location = 'us-central1'; // or your preferred location
const modelId = 'YOUR_AUTOML_MODEL_ID'; // Replace with your trained model ID

// Analyze skin condition using AutoML
exports.analyzeSkin = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const { imageUrl } = req.body;
      
      if (!imageUrl) {
        return res.status(400).json({ error: 'Image URL is required' });
      }

      // Download image from Firebase Storage
      const response = await fetch(imageUrl);
      const imageBuffer = await response.buffer();
      const imageBase64 = imageBuffer.toString('base64');

      // Prepare the request for AutoML
      const request = {
        name: client.modelPath(projectId, location, modelId),
        payload: {
          image: {
            imageBytes: imageBase64,
          },
        },
      };

      // Get prediction from AutoML
      const [response_automl] = await client.predict(request);
      
      // Format predictions
      const predictions = response_automl.payload.map(payload => ({
        condition: payload.displayName,
        confidence: payload.classification.score
      }));

      // Sort by confidence (highest first)
      predictions.sort((a, b) => b.confidence - a.confidence);

      res.json({ predictions });
    } catch (error) {
      console.error('Error analyzing skin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Upload and store image metadata
exports.uploadImage = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const { imageUrl, userId, metadata } = req.body;
      
      // Store metadata in Firestore
      const docRef = await admin.firestore().collection('uploaded-images').add({
        imageUrl,
        userId,
        metadata: metadata || {},
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      res.json({ id: docRef.id, message: 'Image metadata stored successfully' });
    } catch (error) {
      console.error('Error storing image metadata:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});