import { ReducerWithoutAction } from "react";

export const toggle: ReducerWithoutAction<boolean> = (vis: boolean) => !vis;