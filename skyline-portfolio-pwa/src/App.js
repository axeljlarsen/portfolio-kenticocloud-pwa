import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Components/Header.js';
import Test from './Pages/Test';
import PortfolioItems from './Pages/PortfolioItems';
import PortfolioItem from './Pages/PortfolioItem';
import './Styles/App.css';

const App = (props) => {
  return (
    <div>
      <Header language={props.language} changeLanguage={props.changeLanguage} />
      <Switch>
        <Route exact path="/webportfolio/" render={(matchProps) => <PortfolioItems  {...matchProps} language={props.language} />} />
        <Route path="/webportfolio/:urlSlug" render={(matchProps) => <PortfolioItem {...matchProps} language={props.language} />} />
        <Route path="*" render={(props) => { return <Redirect to="/webportfolio/" push /> }} />
      </Switch>
    </div>
  );
}

export default App;