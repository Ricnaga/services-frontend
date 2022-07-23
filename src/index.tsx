import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { mockServer } from './application/mocks/msw/rest';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('app') as HTMLElement);

async function createMockedServer() {
  return process.env.NODE_ENV === 'development' && mockServer.start();
}

root.render(<App />);

createMockedServer();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
