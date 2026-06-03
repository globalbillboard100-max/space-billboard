# Space Billboard Deployment Guide

This guide walks you through deploying the Space Billboard project to Vercel and configuring your environment for production.

## Prerequisites

1. A Vercel account (linked to your GitHub account is easiest).
2. The code pushed to a GitHub repository.
3. Your Firebase configuration keys.

## Deployment Readiness

- The project uses Vite, which Vercel detects automatically.
- TypeScript compilation is strict, and all checks must pass before deployment.
- Environment variables are required at runtime to connect to Firebase.

## Step 1: Vercel Setup

1. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository containing the Space Billboard code.
4. Leave the Framework Preset as **Vite** (Vercel should auto-detect this).
5. Open the **Environment Variables** section.

## Step 2: Environment Variables

You must add the following environment variables to your Vercel project before deploying. **Do not skip this step, or the build will succeed but the app will crash on load.**

Add these EXACT variables (you can find these in your Firebase Project Settings -> General -> Web App):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=universe-billboard.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=universe-billboard
VITE_FIREBASE_STORAGE_BUCKET=universe-billboard.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_DEV_MODE=true
```

*(Note: Keep `VITE_DEV_MODE=true` for now so you can use the DEV TOOLS to seed the database in production and test the bypasses. You can change this to `false` later when integrating Razorpay.)*

## Step 3: Deploy

1. Click **Deploy**.
2. Vercel will run `npm run build` which executes `tsc -b && vite build`.
3. Once finished, Vercel will provide you with a live URL (e.g., `https://space-billboard.vercel.app`).

## Step 4: Firebase Authentication Domain

Since you are deploying to a new Vercel URL, Google Sign-In will fail with an "Unauthorized Domain" error unless you whitelist it.

1. Go to your [Firebase Console](https://console.firebase.google.com/).
2. Select **Authentication** from the left menu.
3. Click the **Settings** tab.
4. Go to **Authorized domains**.
5. Click **Add domain**.
6. Enter your new Vercel domain (e.g., `space-billboard.vercel.app`) without the `https://`.

## Troubleshooting

- **White Screen on Load**: Open browser DevTools (F12) -> Console. Check for missing Firebase environment variables.
- **Google Sign-In Fails (Cross-Origin Error)**: You forgot to add your Vercel URL to the Firebase Authorized Domains (Step 4).
- **Tiles Not Loading**: Ensure your Firestore database rules allow reads (`allow read: if true;`) and that you have seeded the database.
