import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Components/Header.js';
import Test from './Pages/Test';
import Portfolio from './Pages/Portfolio';
import PortfolioItem from './Pages/PortfolioItem';
import './Styles/SkylinePortfolio-Embedded/App.css';

const App = (props) => {
  let isSafari =  (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor));
  if (isSafari) {
    document.body.classList.add('pwa-safari');
  }
  else {
    document.body.classList.add('pwa-not-safari');
  }
  return (
    <div>
      <Switch>
        <Route exact path="/portfolio" render={(matchProps) => <Portfolio  {...matchProps} language={props.language} />} />
        <Route path="/portfolio/:urlSlug" render={(matchProps) => <PortfolioItem {...matchProps} language={props.language} />} />
        <Route path="*" render={(props) => { return <Redirect to="/portfolio" push /> }} />
      </Switch>
    </div>
  );
}

export default App;