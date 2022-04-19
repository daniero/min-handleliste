import { config } from "./Config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseBrukerServiceImpl } from "./FirebaseBrukerServiceImpl";
import type { BrukerService } from "../domene/bruker/BrukerService";

export const firebaseApp = initializeApp(config);
export const auth = getAuth(firebaseApp)
export const brukerService: BrukerService = firebaseBrukerServiceImpl(auth);