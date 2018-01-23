import React from 'react';
import logo from '../Images/logo-skyline.png';
import Link from '../Components/LowerCaseUrlLink';

const Header = () => {
  return (
    <header className="noRowMargin container">
      <div className="row">
        <nav className="col-120">
          <ul className="list-unstyled">
            <li className="img">
              <a href="https://skylinetechnologies.com" target="_blank" title="go to Skyline's website"><img className="logo" src={logo} alt="A thin arc extends from the letter K within the word 'Skyline', resembling the curvature of the Earth's horizon." /></a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;