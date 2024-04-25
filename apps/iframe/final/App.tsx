import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCounter } from '../../../src/utils/useCounter';

export function App() {
  const [iframeBody, setIframeBody] = useState<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [count, inc] = useCounter();

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    iframe.addEventListener('load', () => {
      setIframeBody(iframe.contentDocument!.body);
    });

    iframe.src = '/apps/iframe/iframe-content.html';
  }, []);

  return (
    <>
      <section>
        <p>Count value: {count}</p>
      </section>

      <section>
        <iframe ref={iframeRef}></iframe>
      </section>

      {iframeBody
        ? createPortal(
            <button type="button" onClick={inc}>
              ➕
            </button>,
            iframeBody,
          )
        : null}
    </>
  );
}
