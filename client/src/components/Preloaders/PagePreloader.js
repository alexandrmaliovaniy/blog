import React from 'react';
import './PagePreloader.css';

function Preloader() {
    return (
        <div className="Preloader">
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
    )
}

export default Preloader;