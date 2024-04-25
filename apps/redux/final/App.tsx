import { Dispatch, useCallback, useMemo, useReducer } from 'react';
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
  const actionList = useMemo<CounterAction[]>(() => [], []);

  const undoDispatch = useCallback(
    (action: CounterAction) => {
      actionList.push(action);
      dispatch(action);
    },
    [actionList, dispatch],
  );

  const goBack = useCallback(() => {
    const lastAction = actionList.pop();
    if (!lastAction) return;

    if (lastAction.type === 'inc') {
      dispatch({ type: 'dec', name: lastAction.name });
    } else {
      dispatch({ type: 'inc', name: lastAction.name });
    }
  }, [actionList, dispatch]);

  return [state, undoDispatch, goBack] as const;
}

export function App() {
  const [state, dispatch, goBack] = useUndo(
    useReducer(counterReducer, COUNTER_INITIAL_STATE),
  );

  return (
    <CounterReducerContextProvider value={[state, dispatch]}>
      <Counter name="counterA" />
      <Counter name="counterB" />
      <Sum />

      <button type="button" onClick={goBack}>
        🔙
      </button>
    </CounterReducerContextProvider>
  );
}
