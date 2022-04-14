import { initializeApp } from "firebase/app"
import { FirebaseConfig } from "./Config";

const config: FirebaseConfig = {
  appId: process.env.REACT_APP_APP_ID!,
  apiKey: process.env.REACT_APP_API_KEY!,
  databaseURL: process.env.REACT_APP_DATABASE_URL!,
  projectId: process.env.REACT_APP_PROJECT_ID!,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN!,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET!,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID!,
  // measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

export const setup = () => {
  return initializeApp(config);
};