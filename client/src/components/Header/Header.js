import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import {AuthContext} from '../../context/AuthContext';

function Header() {
    const auth = useContext(AuthContext);
    return (
        <header className='Header'>
            <a className='Home tab' href="/home" >Home</a>
            {auth.isAuth ? <a className="tab" href="/subscribes">Subscribes</a> : ""}
            <a className='auth tab' href={auth.isAuth ? `/user/${auth.userLogin}` : `/auth`}>
                <FontAwesomeIcon icon={auth.isAuth ? faUserCircle : faSignInAlt} />
            </a>
        </header>
    )
}

export default Header;