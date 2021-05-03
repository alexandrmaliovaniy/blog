import React, {useContext, useState} from 'react';
import './UserDetails.css';
import {AuthContext} from '../../context/AuthContext';
function UserDetails(props) {
    const {logout, userId} = useContext(AuthContext);
    const [follow, setFollow] = useState(props.followers.includes(userId));
    function Logout() {
        logout();
        window.location = '/home';
    }
    async function Follow() {
        if (follow) {

        } else {

        }
        setFollow(!follow);
    }
    return (
        <div className="UserDetails">
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
                    <div className="control">
                        <button className={follow ? "unfollow" : "follow"} onClick={Follow}>{follow ? "Unfollow" : "Follow"}</button>
                    </div>
            }
        </div>
    )
}

export default UserDetails;