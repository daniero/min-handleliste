import { FirebaseConfig } from "./Config";
import { Setup } from "./types";

const config: () => FirebaseConfig = () => ({
  appId: process.env.REACT_APP_APP_ID!,
  apiKey: process.env.REACT_APP_API_KEY!,
  databaseURL: process.env.REACT_APP_DATABASE_URL!,
  projectId: process.env.REACT_APP_PROJECT_ID!,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN!,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET!,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID!,
  // measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

export const setup: () => Promise<Setup> = () => {
  return Promise.all([
    import(/* webpackChunkName: 'firebase' */ 'firebase/app'),
    import(/* webpackChunkName: 'firebase' */ 'firebase/auth'),
    import(/* webpackChunkName: 'firebase' */ 'firebase/database')
  ]).then((imports) => {
    const firebase = imports[0].default
    const app = firebase.initializeApp(config());

    return {
      auth: app.auth(),
      database: app.database()
    } as Setup
  });
};