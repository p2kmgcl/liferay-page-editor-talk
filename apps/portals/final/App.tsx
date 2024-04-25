import { createPortal } from "react-dom";
import { useCounter } from "../../../src/utils/useCounter";

/**
 * 1. Create a portal and render some content inside it.
 * 2. Render a different component inside portal.
 * 3. Add a click event handler to a component inside portal, and check event propagation.
 */
export function App() {
  const [count, inc] = useCounter();

  return (
    <section id="internal-wrapper" onClick={inc}>
      <p>Internal wrapper clicked {count} times</p>
      <button type="button">Inside root</button>

      {createPortal(
        <button type="button">Outside root</button>,
        document.getElementById("external-wrapper")!,
      )}
    </section>
  );
}
