// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { PredictionServiceClient } = require('@google-cloud/automl');
const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

admin.initializeApp();

const client = new PredictionServiceClient();
const projectId = process.env.GOOGLE_CLOUD_PROJECT;
const location = process.env.LOCATION || 'us-central1';
const modelId = process.env.MODEL_ID; // set in functions/.env

exports.analyzeSkin = functions
  .region(location)
  .https.onCall(async (data, _ctx) => {
    const imageUrl = data?.imageUrl;
    if (!imageUrl) {
      throw new functions.https.HttpsError('invalid-argument', 'imageUrl is required');
    }

    // download image bytes
    const resp = await fetch(imageUrl);
    const buffer = await resp.arrayBuffer();
    const imageBase64 = Buffer.from(buffer).toString('base64');

    // call AutoML
    const [predRes] = await client.predict({
      name: client.modelPath(projectId, location, modelId),
      payload: { image: { imageBytes: imageBase64 } },
    });

    const predictions = predRes.payload
      .map(p => ({ condition: p.displayName, confidence: p.classification.score }))
      .sort((a, b) => b.confidence - a.confidence);

    return { predictions };
  });