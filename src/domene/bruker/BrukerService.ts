import { Dispatch } from "react";
import { Bruker } from "./Bruker";

export interface BrukerService {
  registerHandler: (dispatcher: Dispatch<Bruker | null>) => void
  unregisterHandler: (dispatcher: Dispatch<Bruker | null>) => void

  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}