import { useEffect, useRef } from 'react';

const html = `
  <h1>🐼 Sobre los pandas</h1>
  <p>
    Los pandas son animales <strong>increíbles</strong>,
    aunque no saben bailar claqué demasiado bien.
  </p>
  <style>
    h1 { text-decoration: underline double; margin-top: 0; }
    strong { color: hotpink; }
  </style>
  <script>
    console.log('hello from section');
  </script>
`;

/**
 * 1. Render HTML inside this element.
 * 2. Check that the CSS is being applied.
 * 3. Run the JS.
 */
function DangerousSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const script = section.querySelector('script');
    if (!script) return;

    const scriptCopy = document.createElement('script');
    scriptCopy.appendChild(document.createTextNode(script.innerHTML));
    document.body.appendChild(scriptCopy);

    return () => {
      document.body.removeChild(scriptCopy);
    };
  }, []);

  return (
    <section ref={sectionRef} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export function App() {
  return <DangerousSection />;
}
