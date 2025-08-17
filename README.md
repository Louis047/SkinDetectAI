> [!NOTE] 
> Due to high fee payment for the cloud backend services and not being able to pay it with the current financial status, I **UNFORTUNATELY** had to shut down Google Cloud's Vertex AI and Firebase Hosting in order to avoid payments. Decided to rewrite the whole project with a different architecture with the same scope if I find anything feasible enough. Sorry for the inconveience caused. 

# SkinDetect AI

Web-Based Skin Disease Detection using Google Cloud AutoML and Firestore

## Addressing Critical Healthcare Gaps

### **Current Healthcare System Limitations:**
1. **Limited Access**: Rural areas lack dermatology specialists
2. **Long Wait Times**: Average 4-6 weeks for dermatology appointments
3. **High Costs**: Specialist consultations cost $200-400
4. **Subjective Diagnosis**: Human error in visual assessment
5. **Lack of Documentation**: Poor tracking of skin condition progression

### **Our Solution:**
- **24/7 Availability**: Instant AI-powered analysis
- **Cost-Effective**: Free initial screening
- **Objective Analysis**: Consistent, data-driven results
- **Progress Tracking**: Historical analysis storage
- **Accessibility**: Web and mobile support

## Technical Innovation

### **Why Our Approach is Superior:**
1. **Google Cloud AutoML**: State-of-the-art transfer learning
2. **Serverless Architecture**: Infinite scalability
3. **Real-time Processing**: Sub-5-second analysis
4. **HIPAA Compliance**: Secure data handling
5. **Continuous Learning**: Model improves with usage

## ✨ Highlights

- **Instant results** – Vertex AI endpoint responds in < 5 s.
- **Camera capture** – Seamless mobile experience using `capture="environment"`.
- **Confidence threshold** – Only show predictions with ≥ 0.85 confidence.
- **Fully serverless** – Firebase Functions + Hosting + Storage.
- **Security first** – No images are persisted; keys kept outside the repo.



## 🏗 Architecture

```mermaid
flowchart LR
    User[User ‑ Web / Mobile]
    User -->|Image| Frontend[React + Vite App]
    Frontend -->|HTTPS callable| CF[Cloud Function<br/>analyzeSkin]
    CF -->|Base64 image| Vertex[Vertex AI Endpoint]
    Vertex --> CF --> Frontend -->|Results| User
```

---

## 💻 Tech Stack

| Layer          | Tech |
|----------------|------|
| Frontend       | React 18 • TypeScript • Vite • Tailwind CSS • shadcn/ui |
| Backend        | Firebase Cloud Functions (Node 20) |
| ML Inference   | Vertex AI (AutoML Vision) |
| Storage/CDN    | Firebase Hosting & Cloud Storage |

---

## 🚀 Quick Start

```bash
# 1. Clone
$ git clone https://github.com/Louis047/SkinDetectAI.git && cd SkinDetectAI
$ npm install

# 2. Configure Firebase (replace IDs below)
$ firebase login
$ firebase use <PROJECT_ID>
$ firebase functions:config:set vertex.endpointid="<ENDPOINT_ID>" vertex.region="us-central1"

# 3. Dev
$ npm run dev            # Vite dev server
$ firebase emulators:start --only functions,hosting

# 4. Deploy
$ npm run build
$ firebase deploy --only functions,hosting
```



## 🤝 Contributing

1. Fork ⇢ Create branch ⇢ Commit ⇢ Pull request.
2. Keep PRs focused; open an issue first for large changes.




