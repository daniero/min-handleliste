import type firebase from "firebase";

export type Auth = firebase.auth.Auth;
export type Database = firebase.database.Database;

export interface Setup {
  auth: Auth
  database: Database
}

export type Unsubscribe = firebase.Unsubscribe;

export type User = firebase.User
export type DatabaseRef = firebase.database.Reference;
