import { header } from 'express-validator';
import React, {useContext} from 'react';
import './Header.css';
import {AuthContext} from '../context/AuthContext';

function Header() {
    const auth = useContext(AuthContext);
    return (
        <header className='Header'>
            <a className='Home tab' href="/home" >Home</a>
            <a className='Search tab' href="/">Search</a>
            <a className='auth tab' href={auth.isAuth ? `/user/${auth.userLogin}` : `/auth`}>
                profile
            </a>
        </header>
    )
}

export default Header;