import { type ReducerWithoutAction } from 'react';

export const toggle: ReducerWithoutAction<boolean> = (on: boolean) => !on;
