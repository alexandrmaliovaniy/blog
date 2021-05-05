import react, {useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import './UserInformation.css';

function UserInformation(props) {
    const {request} = useHttp();
    console.log(props.bio);
    const [data, setData] = useState({
        _id: props._id,
        login: props.login,
        email: props.email,
        avatar: props.avatar,
        bio: props.bio
    });
    function stopPropagation(e) {
        e.stopPropagation();
    }
    function LoadImage(e) {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setData({
                ...data,
                avatar: reader.result
            });
        }
        reader.readAsDataURL(file);
    }

    function InputData(e) {
        setData({...data, [e.target.name]: e.target.value});
    }

    async function UpdateData() {
        try {
            const res = await request('/api/user/update', 'POST', data, {
                Authorization: `Bearer ${props.token}`
            })
            props.setModal(false);
            props.reLogin(res.token, res.userId, res.userLogin);
            window.location.reload();
        }catch(e) {
            console.log(e);
        }
    }
    return (

        <div className="UserInformation" onClick={()=>props.setModal(false)}>
            <div className="personalData" onClick={stopPropagation}>
                <div className="mainData">
                    <label for="userAvatar" className="avatarPlaceholder">
                        <img src={data.avatar ? data.avatar : "../avatar.png"} alt="user avatar placeholder" />
                    </label>
                    <input type="text" className="login" name="login" value={data.login} onChange={InputData} />
                    <input type="text" className="email" name="email" value={data.email} onChange={InputData} />
                    <input id="userAvatar" type='file' onChange={LoadImage}/>
                </div>
                <textarea className="bio" name="bio" onChange={InputData} value={data.bio} />
                <button onClick={UpdateData}>Update</button>
            </div>
        </div>
    )
}

export default UserInformation;