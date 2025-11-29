import type { HandlelisteMetoder } from './handlelisteMetoder';
import type { Store } from '../../utils/store.ts';
import type { Ting } from './Ting.ts';

export type HandlelisteService = Store<Ting[]> & HandlelisteMetoder;
