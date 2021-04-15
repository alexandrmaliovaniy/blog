import React, {useContext} from 'react';
import './UserSection.css';
import {AuthContext} from '../context/AuthContext';
function UserSection(props) {
    const {logout} = useContext(AuthContext);
    function Logout() {
        logout();
        window.location = '/home';
    }
    return (
        <div className="UserSection">
            <img src={props.image || "../avatar.png"} alt="user avatar" />
            <div className="userLogin">{props.login}</div>
            <div className="userEmail">{props.email}</div>
            {
                props.isAuthor ? 
                    <div className="control">
                        <a className="changeInfo" href="/">Change information</a>
                        <button onClick={Logout} className="logout">Log out</button>
                    </div>
                :
                    ""
            }
        </div>
    )
}

export default UserSection;