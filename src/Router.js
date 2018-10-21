import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Router = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
  </Switch>
);

export default Router;
