export interface CounterState {
  counterA: number;
  counterB: number;
}

export type CounterAction =
  | { type: 'inc'; name: keyof CounterState }
  | { type: 'dec'; name: keyof CounterState };

export const COUNTER_INITIAL_STATE: CounterState = {
  counterA: 0,
  counterB: 0,
};

export function counterReducer(
  state = COUNTER_INITIAL_STATE,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case 'dec':
      return { ...state, [action.name]: state[action.name] - 1 };
    case 'inc':
      return { ...state, [action.name]: state[action.name] + 1 };
  }
}
