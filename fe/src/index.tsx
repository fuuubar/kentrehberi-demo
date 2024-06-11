import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './app/assets/styles/main.css';
import MapView from './app/pages/map/MapView';

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MapView} />
        <Route path="/assets/icons/*" />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

