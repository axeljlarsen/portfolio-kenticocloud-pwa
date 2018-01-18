import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll';
import App from './App';
import PortfolioItemsPage from './Pages/PortfolioItems';
import PortfolioItemPage from './Pages/PortfolioItem';

import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();

ReactDOM.render((
    <Router history={hashHistory} render={applyRouterMiddleware(useScroll())}>
        <Route path="/" component={App}>
            <IndexRoute component={PortfolioItemsPage} />
            <Route path="portfolioItems" component={PortfolioItemsPage} />
            <Route path="portfolioItems/:urlSlug" component={PortfolioItemPage} />
        </Route>
    </Router>
), document.getElementById("root"));

