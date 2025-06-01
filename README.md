# SkinDetect AI – Dermatology Visual AI Application

An end-to-end, cloud-native web app that uses AI to analyze skin conditions from user-uploaded images. Built with React 18, TypeScript, Vite, Tailwind CSS, and Google Cloud services (Firebase Auth, Firestore, Cloud Storage, AutoML Vision).  

> **Why SkinDetect AI?**  
> Many existing solutions lack real-time inference, explainability, or fair-data practices. SkinDetect AI addresses these gaps by delivering:  
> 1. **Serverless scalability** – front-end to back-end fully managed on GCP.  
> 2. **Fairness & auditability** – logs every upload and prediction to Firestore; lifecycle rules for data retention.  
> 3. **Explainability pipeline (future)** – designed to plug in Grad-CAM or other saliency tools.  
> 4. **Cost control** – built to live within free-tier limits, with budget alerts.

---

## 📦 Tech Stack Overview

- **Frontend**  
  - **Framework**: React 18 + Vite + TypeScript  
  - **Styling/UI**: Tailwind CSS, shadcn/ui components  
  - **State Management**: TanStack Query (for caching + background fetch)  
  - **HTTP Client**: Axios (for calling Cloud Functions)  
  - **Authentication**: Firebase Auth (Email/Password + Google Sign-In)

- **Backend & Cloud Services**  
  - **Authentication & Database**: Firebase Auth + Firestore (NoSQL)  
  - **Object Storage**: Google Cloud Storage (user images, training data)  
  - **Serverless Compute**: Cloud Functions (Node.js 18)  
    - **Endpoint 1**: `/skinStub` – returns dummy or AutoML predictions  
    - **Endpoint 2**: `/uploadImage` – (future) stores raw image + metadata  
  - **AutoML Vision** (Cloud AutoML)  
    - Managed training & hosting of the skin-disease classification model  
  - **CI/CD & Deployment**: Vercel (frontend) + gcloud/Cloud Build (backend)

- **Monitoring & Budget Control**  
  - **Stackdriver Monitoring** – logs function errors, latency  
  - **Budget Alerts** – email/SMS when approaching free-tier limits  

---

## 📝 Project Architecture

