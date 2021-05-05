import React, {useContext, useState} from 'react';
import './UserDetails.css';
import {AuthContext} from '../../context/AuthContext';
import {useHttp} from '../../hooks/http.hook';
import UserInformation from '../../pages/UserInformation';
function UserDetails(props) {
    const {request} = useHttp();
    const [modal, setModal] = useState(false);
    const {logout, userId, token, login} = useContext(AuthContext);
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
            <img src={props.avatar || "../avatar.png"} alt="user avatar" />
            <div className="userLogin">{props.login}</div>
            <div className="userEmail">{props.email}</div>
            {
                props.isAuthor ? 
                    <div className="control">
                        <button className="changeInfo" onClick={()=>setModal(true)}>Change information</button>
                        <button onClick={Logout} className="logout">Log out</button>
                    </div>
                :
                    <div className="control">
                        <button className={follow ? "unfollow" : "follow"} onClick={Follow}>{follow ? "Unfollow" : "Follow"}</button>
                    </div>
            }
            {modal ? <UserInformation {...props} setModal={setModal} token={token} reLogin={login} /> : ""}
        </div>
    )
}

export default UserDetails;