import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import { observer } from 'mobx-react-lite';

import { Dashboard } from './ui/Dashboard';
import { Character } from './ui/Character';

export default observer(() => {
  return (
    <Router>
      <Switch>
        <Route path="/character/:id">
          <Character />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
});
