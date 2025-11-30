export type Listener = () => void;
export type UnsubscribeFunction = () => void;

export interface Store<T> {
  getState: () => T;
  subscribe: (listener: Listener) => UnsubscribeFunction;
}

export type Updater<State, Action> = (state: State, action: Action) => State;

/**
 * Creates a new Store with a custom updater.
 * @param initialState
 * @param updateFn custom updater
 */
export function createStore<State, Action>(
  initialState: State,
  updateFn: (state: State, action: Action) => State,
): { store: Store<State>; update: (action: Action) => void };

/**
 * Creates a new Store with the default updater.
 * @param initialState
 */
export function createStore<State>(initialState: State): {
  store: Store<State>;
  update: (fn: (s: State) => State) => void;
};

export function createStore<State, Action>(
  initialState: State,
  updateFn?: Updater<State, Action>,
) {
  return createStoreImpl(
    initialState,
    updateFn ?? (update<State> as Updater<State, Action>),
  );
}

function createStoreImpl<State, Action>(
  initialState: State,
  updateFn: Updater<State, Action>,
): {
  store: Store<State>;
  update: (action: Action) => void;
} {
  let state = initialState;
  let listeners: Listener[] = [];

  return {
    store: {
      getState: () => state,
      subscribe: (listener: Listener) => {
        listeners = [...listeners, listener];
        return () => {
          listeners = listeners.filter((l) => l !== listener);
        };
      },
    },
    update: (action: Action) => {
      state = updateFn(state, action);

      listeners.forEach((listener) => {
        listener();
      });
    },
  };
}

// Updater functions

export function update<State>(oldState: State, callback: (n: State) => State) {
  return callback(oldState);
}

export function set<State>(_oldValue: State, newValue: State) {
  return newValue;
}
