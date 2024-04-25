import { useCallback, useState } from "react";

export function useCounter() {
  const [count, setCount] = useState(0);
  const inc = useCallback(() => setCount((c) => c + 1), []);
  return [count, inc] as const;
}
