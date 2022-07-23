import React, { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  CreateUsers,
  Home,
  TicketGate,
  UpdateUsers,
  Workouts,
} from '../../pages';

function RoutesPages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ticket" element={<TicketGate />} />
      <Route path="/create" element={<CreateUsers />} />
      <Route path="/update" element={<UpdateUsers />} />
      <Route path="/workouts" element={<Workouts />} />
    </Routes>
  );
}
type ProviderRouterProps = {
  children: ReactNode;
};

export function ProviderRouter({ children }: ProviderRouterProps) {
  return (
    <BrowserRouter>
      {children}
      <RoutesPages />
    </BrowserRouter>
  );
}
