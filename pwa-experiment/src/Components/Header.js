import React from 'react';
import logo from '../Images/logo-skyline.png';
import Link from '../Components/LowerCaseUrlLink';

const Header = () => {
  return (
    <header className="noRowMargin container">
      <div className="row">
        <nav className="col-120">
          <ul className="list-unstyled">
            <li>
              <Link to={`/portfolio`}>Portfolio</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;