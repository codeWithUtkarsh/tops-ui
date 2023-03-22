import React from 'react';
import companyLogo from '../../TOPS_NASA_logos.png';

const Header = () => {
    return (
        <div className="is-sticky">
            <img className="Logo" src={companyLogo} alt="Transform to Open Science logo" width="100" height="80"/>

            <h3 id="siteTitle">Transform to Open Science</h3>
            <nav className="Navbar">
                <ul className="nav">
                <li><a href="https://nasa.github.io/Transform-to-Open-Science/">About Us</a></li>
                </ul>
            </nav>
        </div>
    ) 
}

export default Header;