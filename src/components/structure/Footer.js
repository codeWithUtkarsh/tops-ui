import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        
        <div className="Footer">
            {`Copyright © Transform to Open Science ${year}`}
        </div>
    )
}

export default Footer;