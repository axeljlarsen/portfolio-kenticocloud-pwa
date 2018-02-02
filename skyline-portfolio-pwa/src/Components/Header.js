import React from 'react';
import logo from '../Images/skyline-logo-silver-text-blue-arc.svg';
import Link from '../Components/LowerCaseUrlLink';

const Header = () => {
  return (
    <header className="noRowMargin container-fluid">
      <div className="row">
        <nav className="col-120">
          <ul className="list-unstyled">
            <li className="img">
              <a className="logo" href="https://skylinetechnologies.com" target="_blank" title="go to Skyline's website"><img className="logo" src={logo} alt="A thin arc extends from the letter K within the word 'Skyline', resembling the curvature of the Earth's horizon." /></a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;