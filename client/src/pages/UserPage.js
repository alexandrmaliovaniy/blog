import React, {useState, useCallback, useEffect, useContext, Suspense}  from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
// import UserSection from '../UserSection/UserSection';
import UserPosts from '../UserPosts/UserPosts';
import './UserPage.css';
import {AuthContext} from '../context/AuthContext';

const UserSection = React.lazy(() => import('../UserSection/UserSection'));

function UserPage() {
    const vitisor = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const {request} = useHttp();
    const userLogin = useParams().login;
    const getUser = useCallback(async () => {
        try {
            const user = await request(`/api/user/${userLogin}`, 'GET', null);
            setUserData(user);
        } catch (e) {

        }
    }, [userLogin, request]);

    useEffect(() => {
        getUser();
    }, [getUser])

    return (
        <div className="UserPage">
            <Suspense fallback={<div className="lazySection"><div className="img"></div><div className="login"></div><div className="email"></div></div>}>
                <UserSection {...userData} isAuthor={userData ? userData._id === vitisor.userId : false} />
            </Suspense>
            <UserPosts {...userData} isAuthor={userData ? userData._id === vitisor.userId : false}/>
        </div>
    )
}

export default UserPage;