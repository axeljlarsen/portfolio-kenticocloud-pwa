import React from 'react';
import { Link, IndexLink } from 'react-router'

const Header = () => {
  return (
    <header className="header" role="banner">
      <div className="menu">
        <div className="container">
          <nav>
            <ul>
              <li>
                <Link to="/portfolioItems">Portfolio Items</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="header-row">
        <div className="container">
          <div className="col-xs-8 col-md-8 col-lg-4 logo">
            <h1 className="logo">
              <IndexLink to="/" className="logo-link">Dancing Goat</IndexLink>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;