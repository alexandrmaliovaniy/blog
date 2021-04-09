import React from 'react';
import './UserSection.css';
function UserSection(props) {
    return (
        <div className="UserSection">
            <img src={props.image} alt="user avatar" />
            <div className="userLogin">@{props.login}</div>
            <div className="userEmail">{props.email}</div>
        </div>
    )
}

export default UserSection;