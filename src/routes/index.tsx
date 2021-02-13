import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import SignUp from '../pages/SignUp';
import ChangeData from '../pages/ChangeData';
import TicketGate from '../pages/TicketGate';
import Workouts from '../pages/Workouts';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/ticket" component={TicketGate} />
    <Route path="/signup" component={SignUp} />
    <Route path="/changedata" component={ChangeData} />
    <Route path="/workouts" component={Workouts} />
  </Switch>
);
export default Routes;
