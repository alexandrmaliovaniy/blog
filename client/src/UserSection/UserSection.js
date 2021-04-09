import React, {useContext} from 'react';
import './UserSection.css';
import {AuthContext} from '../context/AuthContext';
function UserSection(props) {
    const user = useContext(AuthContext);
    return (
        <div className="UserSection">
            <img src={props.image || "../avatar.png"} alt="user avatar" />
            <div className="userLogin">{props.login}</div>
            <div className="userEmail">{props.email}</div>
            {
                user.id === props.id ? 
                    <a className="changeInfo" href="/">Change information</a>
                :
                    ""
            }
        </div>
    )
}

export default UserSection;