import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <Router>
    <Switch>
      <Route path="/" render={matchProps => <App {...matchProps} />} />
    </Switch>
  </Router>
), document.getElementById("root"));
registerServiceWorker();

