import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Main from '../pages/Main';
import Profile from '../pages/Profile';
import History from '../pages/History';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Schedule from '../pages/Schedule';
import Payments from '../pages/Payments';
import Contract from '../pages/Contract';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />

      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/history" component={History} isPrivate />
      <Route path="/schedule" component={Schedule} isPrivate />
      <Route path="/payments" component={Payments} isPrivate />
      <Route path="/contract" component={Contract} isPrivate />
    </Switch>
  );
}
