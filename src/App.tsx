import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Topbar } from './components/Topbar';
import { RoutesPages } from './routes';
import { mirageMockServer } from './services/mirage';
import './App.css';

mirageMockServer();

export function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <RoutesPages />
    </BrowserRouter>
  );
}
