import firebase from 'firebase/app';
import 'firebase/auth';

export const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(config);
const firebaseAuth = firebase.auth();

export const auth = {
  onAuthStateChanged: callback => firebaseAuth.onAuthStateChanged(callback),
  signUp: (email, password) => firebaseAuth.createUserWithEmailAndPassword(email, password),
  signIn: (email, password) => firebaseAuth.signInWithEmailAndPassword(email, password),
  signOut: () => firebaseAuth.signOut()
};