import React, {useState, useCallback, useEffect, useContext, Suspense}  from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import UserArticles from '../components/UserArticles/UserArticles';
import './UserPage.css';
import {AuthContext} from '../context/AuthContext';
import UserSection from '../components/UserDetails/UserDetails';
// const UserSection = React.lazy(() => import('../components/UserDetails/UserDetails'));

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
            console.log(e);
        }
    }, [userLogin, request]);

    useEffect(() => {
        getUser();
    }, [getUser])
    
    return (
        <div className="UserPage">
            {userData ? <UserSection {...userData} isAuthor={userData ? userData._id === vitisor.userId : false} /> : <div className="lazySection"><div className="img"></div><div className="login"></div><div className="email"></div></div>}
            {/* <Suspense fallback={<div className="lazySection"><div className="img"></div><div className="login"></div><div className="email"></div></div>}>
                <UserSection {...userData} isAuthor={userData ? userData._id === vitisor.userId : false} />
            </Suspense> */}
            {userData ?
                <UserArticles posts={userData.posts} isAuthor={userData._id === vitisor.userId}/>
            :
            ""
            }
        </div>
    )
}

export default UserPage;