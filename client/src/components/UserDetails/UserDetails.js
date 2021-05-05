import React, {useContext, useState} from 'react';
import './UserDetails.css';
import {AuthContext} from '../../context/AuthContext';
import {useHttp} from '../../hooks/http.hook';
function UserDetails(props) {
    const {request} = useHttp();
    const {logout, userId, token} = useContext(AuthContext);
    const [follow, setFollow] = useState(props.followers.includes(userId));
    function Logout() {
        logout();
        window.location = '/home';
    }
    async function Follow() {
        try {
            let prefix = ""
            if (follow) {
                prefix = "un";   
            }
            await request(`/api/user/${prefix}follow`, 'POST', {
                userId: props._id
            }, {
                Authorization: `Bearer ${token}`
            })
            setFollow(!follow);
        } catch(e) {
            console.log(e);
        }
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