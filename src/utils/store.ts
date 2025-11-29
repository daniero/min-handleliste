export type Listener = () => void;
export type UnsubscribeFunction = () => void;

/**
 * Objekt som kan brukes sammen med useSyncExternalStore()
 */
export interface Store<T> {
  getState: () => T;
  subscribe: (listener: Listener) => UnsubscribeFunction;
}

/**
 * Lag en enkel, generisk store og en tilhørende update-funksjon.
 */
export function createStore<T>(initialState: T) {
  let state = initialState;
  let listeners: Listener[] = [];

  function update(updateFunction: (oldState: T) => T) {
    state = updateFunction(state);

    listeners.forEach((listener) => {
      listener();
    });
  }

  const store: Store<T> = {
    getState: () => state,
    subscribe: (listener: Listener) => {
      listeners = [...listeners, listener];
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };

  return { store, update };
}
