import React from 'react';
import './UserSection.css';
function UserSection(props) {
    return (
        <div className="UserSection">
            <img src={props.image || "../avatar.png"} alt="user avatar" />
            <div className="userLogin">{props.login}</div>
            <div className="userEmail">{props.email}</div>
            {
                props.isAuthor ? 
                    <a className="changeInfo" href="/">Change information</a>
                :
                    ""
            }
        </div>
    )
}

export default UserSection;