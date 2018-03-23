import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <Router onUpdate={() => window.scrollTo(0, 0)}>
    <Switch>
      <Route path="/" render={matchProps => <App {...matchProps} />} />
    </Switch>
  </Router>
), document.getElementById("root"));
//registerServiceWorker();

