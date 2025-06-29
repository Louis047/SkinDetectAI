// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { GoogleAuth } = require('google-auth-library');

admin.initializeApp();

const auth = new GoogleAuth({ scopes: 'https://www.googleapis.com/auth/cloud-platform' });
const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || admin.app().options.projectId;
const location = process.env.PREDICTION_REGION || 'us-central1';
const endpointId = process.env.PREDICTION_ENDPOINT_ID;

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

    // Validate IDs
    console.log('analyzeSkin input', { projectId, location, endpointId, imageUrlLength: imageUrl.length });
    if (!projectId || !endpointId) {
      throw new functions.https.HttpsError('internal', 'Project ID or Endpoint ID not resolved');
    }
    // Build full endpoint resource path
    const endpoint = `projects/${projectId}/locations/${location}/endpoints/${endpointId}`;

    // Obtain access token
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    // Call Vertex Prediction REST API
    const response = await fetch(`https://${location}-aiplatform.googleapis.com/v1/${endpoint}:predict`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.token || accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instances: [{ content: imageBase64, mimeType: 'image/jpeg' }],
        parameters: { confidenceThreshold: 0.0, maxPredictions: 5 }
      })
    });
    if (!response.ok) {
      const text = await response.text();
      console.error('Vertex API error', text);
      throw new functions.https.HttpsError('internal', 'Vertex prediction failed');
    }
    const predRes = await response.json();
    console.log('Vertex raw response', JSON.stringify(predRes));

    let predictions = [];
    for (const p of predRes.predictions || []) {
      const names = p.displayNames || [];
      const scores = p.confidences || [];
      names.forEach((name, idx) => {
        predictions.push({ condition: name, confidence: scores[idx] || 0 });
      });
    }
    predictions.sort((a, b) => b.confidence - a.confidence);

    return { predictions };
  });