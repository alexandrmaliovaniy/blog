import React from 'react';
import './Preloader.css';

function Preloader() {
    return (
        <div className="Preloader">
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
    )
}

export default Preloader;