import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Topbar } from './components/Topbar';
import { RoutesPages } from './routes';
import { mirageMockServer } from './services/mirage';

mirageMockServer();

export function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <RoutesPages />
    </BrowserRouter>
  );
}
