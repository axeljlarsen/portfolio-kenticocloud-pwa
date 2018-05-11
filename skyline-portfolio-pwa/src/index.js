import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import ReactGA from 'react-ga';
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()
history.listen((location, action) => {
  ReactGA.pageview(window.location.pathname);
});
ReactGA.initialize('UA-5933713-2');

ReactDOM.render((
  <Router history={history}>
    <Switch>
      <Route path="/" render={matchProps => <App {...matchProps} />} />
    </Switch>
  </Router>
), document.getElementById("root"));
//registerServiceWorker();

