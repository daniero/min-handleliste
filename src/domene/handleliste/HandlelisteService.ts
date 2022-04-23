import { Dispatch } from "react";
import type { HandlelisteAction } from "./handlelisteActions";
import type { HandlelisteMetoder } from "./handlelisteMetoder";


export interface HandlelisteService extends HandlelisteMetoder {
  registerHandler: (dispatcher: Dispatch<HandlelisteAction>) => void
  unregisterHandler: (dispatcher: Dispatch<HandlelisteAction>) => void
}

