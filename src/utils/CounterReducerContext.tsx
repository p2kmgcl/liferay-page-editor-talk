import { Dispatch, ReactNode, createContext, useContext } from 'react';
import { CounterAction, CounterState } from './counterReducer';

type ContextValue = Readonly<[CounterState, Dispatch<CounterAction>]>;
const Context = createContext<ContextValue | null>(null);

export function CounterReducerContextProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: ContextValue;
}) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useCounterReducerContext() {
  const value = useContext(Context);
  if (!value) throw new Error('Using store outside of context');
  return value;
}
