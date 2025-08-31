import type { FirebaseOptions } from 'firebase/app';

export const config: FirebaseOptions = {
  appId: import.meta.env.VITE_APP_ID as string,
  apiKey: import.meta.env.VITE_API_KEY as string,
  databaseURL: import.meta.env.VITE_DATABASE_URL as string,
  projectId: import.meta.env.VITE_PROJECT_ID as string,
};
