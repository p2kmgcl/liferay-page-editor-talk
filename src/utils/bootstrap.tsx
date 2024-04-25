import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

export function bootstrap(reactNode: ReactNode) {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
  ReactDOM.createRoot(root).render(
    <React.StrictMode>{reactNode}</React.StrictMode>,
  );
}
