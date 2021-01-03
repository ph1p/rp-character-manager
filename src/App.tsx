import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import { observer } from 'mobx-react-lite';

import { Dashboard } from './ui/Dashboard';
import { Character } from './ui/Character';
import { StoreProvider } from './store';

export default observer(() => {
  return (
    <Router>
      <Switch>
        <Route path="/character/:id">
          <StoreProvider>
            <Character />
          </StoreProvider>
        </Route>
        <Route path="/">
          <StoreProvider>
            <Dashboard />
          </StoreProvider>
        </Route>
      </Switch>
    </Router>
  );
});
