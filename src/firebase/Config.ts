import type { FirebaseOptions } from "firebase/app"

export const config: FirebaseOptions = {
  appId: process.env.REACT_APP_APP_ID!,
  apiKey: process.env.REACT_APP_API_KEY!,
  databaseURL: process.env.REACT_APP_DATABASE_URL!,
  projectId: process.env.REACT_APP_PROJECT_ID!,
};