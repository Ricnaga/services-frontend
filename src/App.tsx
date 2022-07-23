import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Topbar } from './components/Topbar';
import { ProviderRouter } from './application/routes';
import './App.css';

export function App() {
  return (
    <ProviderRouter>
      <Topbar />
    </ProviderRouter>
  );
}
