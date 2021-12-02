import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { CreateUsers } from '../pages/Users/Create';
import { UpdateUsers } from '../pages/Users/Update';
import { TicketGate } from '../pages/TicketGate';
import { Workouts } from '../pages/Workouts';

export function RoutesPages() {
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
