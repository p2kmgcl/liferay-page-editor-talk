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
  return <section>{html}</section>;
}

export function App() {
  return <DangerousSection />;
}
