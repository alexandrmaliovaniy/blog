import React, {useState, useCallback, useEffect}  from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import UserSection from './UserSection/UserSection';

function UserPage() {
    const [userData, setUserData] = useState(null);
    const {request} = useHttp();
    const userLogin = useParams().login;
    const getUser = useCallback(async () => {
        try {
            const user = await request(`/api/user/${userLogin}`, 'GET', null);
            console.log(user);
            setUserData(user);
        } catch (e) {

        }
    }, [userLogin, request]);

    useEffect(() => {
        getUser();
    }, [getUser])

    return (
        <div className="UserPage">
            <UserSection {...userData} />
        </div>
    )
}

export default UserPage;