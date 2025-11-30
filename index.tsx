
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// When using Vite, CSS imports usually go here, but we are using CDN for Tailwind to keep it simple.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
