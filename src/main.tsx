import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text">
      <h1 className="text-3xl font-bold">Omer Etrog</h1>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
