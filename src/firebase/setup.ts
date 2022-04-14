import { initializeApp } from "firebase/app"
import { config } from "./Config";

export const setup = () => {
  return initializeApp(config);
};