// API
// ----------------------------------------------------------------------

console.log(process.env.PLASMO_PUBLIC_ASSETS_API)

export const HOST_API = process.env.PLASMO_PUBLIC_HOST_API;
export const ASSETS_API = process.env.PLASMO_PUBLIC_ASSETS_API;

export const FIREBASE_API = {
  apiKey: process.env.PLASMO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PLASMO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PLASMO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PLASMO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PLASMO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PLASMO_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.PLASMO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const AMPLIFY_API = {
  userPoolId: process.env.PLASMO_PUBLIC_AWS_AMPLIFY_USER_POOL_ID,
  userPoolWebClientId: process.env.PLASMO_PUBLIC_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID,
  region: process.env.PLASMO_PUBLIC_AWS_AMPLIFY_REGION,
};

export const AUTH0_API = {
  clientId: process.env.PLASMO_PUBLIC_AUTH0_CLIENT_ID,
  domain: process.env.PLASMO_PUBLIC_AUTH0_DOMAIN,
  callbackUrl: process.env.PLASMO_PUBLIC_AUTH0_CALLBACK_URL,
};

export const MAPBOX_API = process.env.PLASMO_PUBLIC_MAPBOX_API;
