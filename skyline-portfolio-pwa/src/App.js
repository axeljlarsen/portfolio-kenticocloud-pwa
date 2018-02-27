import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Components/Header.js';
import Test from './Pages/Test';
import Portfolio from './Pages/Portfolio';
import PortfolioItem from './Pages/PortfolioItem';
import './Styles/SkylinePortfolio-Embedded/App.css';

const App = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/portfolio-embed/" render={(matchProps) => <Portfolio  {...matchProps} language={props.language} />} />
        <Route path="/portfolio-embed/:urlSlug" render={(matchProps) => <PortfolioItem {...matchProps} language={props.language} />} />
        <Route path="*" render={(props) => { return <Redirect to="/portfolio-embed/" push /> }} />
      </Switch>
    </div>
  );
}

export default App;