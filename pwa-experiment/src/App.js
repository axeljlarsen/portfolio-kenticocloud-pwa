// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Redirect, Route, Switch } from 'react-router-dom';

// import Header from './Components/Header.js';
// import PortfolioItems from './Pages/PortfolioItems';
// import PortfolioItem from './Pages/PortfolioItem';
// import './Styles/App.css';

// const Page = ({ title }) => (
//   <div className="App">
//     <Header />
//   </div>
// );

// const App = (props) => {
//   return (
//     <div>
//       <Header />
//       <Switch>
//         <Route path="/portfolioItems" render={(matchProps) => <PortfolioItems {...matchProps} language={props.language} />} />
//         <Route path="/portfolioItems/:urlSlug" render={(matchProps) => <PortfolioItem {...matchProps} language={props.language} />} />
//         <Route exact path="/" render={(matchProps) => <PortfolioItems  {...matchProps} language={props.language} />} />
//         <Route path="*" render={(props) => { return <Redirect to="/" push /> }} />
//       </Switch>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Components/Header.js';
import PortfolioItems from './Pages/PortfolioItems';
import PortfolioItem from './Pages/PortfolioItem';
import './Styles/App.css';

const App = (props) => {
  return (
    <div>
      <Header language={props.language} changeLanguage={props.changeLanguage} />
      <Switch>
        <Route exact path="/" render={(matchProps) => <PortfolioItems  {...matchProps} language={props.language} />} />
        <Route path="/portfolioItems/:urlSlug" render={(matchProps) => <PortfolioItem {...matchProps} language={props.language} />} />
        <Route path="*" render={(props) => { return <Redirect to="/" push /> }} />
      </Switch>
    </div>
  );
}

export default App;