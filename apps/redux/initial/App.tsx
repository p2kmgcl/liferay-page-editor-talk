import { Dispatch, useReducer } from 'react';
import {
  CounterReducerContextProvider,
  useCounterReducerContext,
} from '../../../src/utils/CounterReducerContext';
import {
  COUNTER_INITIAL_STATE,
  CounterAction,
  CounterState,
  counterReducer,
} from '../../../src/utils/counterReducer';

function Counter({ name }: { name: keyof CounterState }) {
  const [state, dispatch] = useCounterReducerContext();

  return (
    <section>
      <p>
        {name}: {state[name]}
      </p>
      <button type="button" onClick={() => dispatch({ type: 'dec', name })}>
        ➖
      </button>
      <button type="button" onClick={() => dispatch({ type: 'inc', name })}>
        ➕
      </button>
    </section>
  );
}

function Sum() {
  const [state] = useCounterReducerContext();
  return <p>Sum: {state.counterA + state.counterB}</p>;
}

function useUndo([state, dispatch]: [CounterState, Dispatch<CounterAction>]) {
  return [state, dispatch] as const;
}

export function App() {
  const [state, dispatch] = useUndo(
    useReducer(counterReducer, COUNTER_INITIAL_STATE),
  );

  return (
    <CounterReducerContextProvider value={[state, dispatch]}>
      <Counter name="counterA" />
      <Counter name="counterB" />
      <Sum />
    </CounterReducerContextProvider>
  );
}
