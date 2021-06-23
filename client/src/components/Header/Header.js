import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import {AuthContext} from '../../context/AuthContext';

function Header() {
    const auth = useContext(AuthContext);
    return (
        <header className='Header'>
            <Link className='Home tab' to="/home" >Home</Link>
            {auth.isAuth ? <Link className="tab" to="/subscribes">Subscribes</Link> : ""}
            <Link className='auth tab' to={auth.isAuth ? `/user/${auth.userLogin}` : `/auth`}>
                <FontAwesomeIcon icon={auth.isAuth ? faUserCircle : faSignInAlt} />
            </Link>
        </header>
    )
}

export default Header;