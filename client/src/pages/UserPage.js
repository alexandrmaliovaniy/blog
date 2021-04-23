import React, {useState, useCallback, useEffect, useContext, Suspense}  from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import UserArticles from '../components/UserArticles/UserArticles';
import './UserPage.css';
import {AuthContext} from '../context/AuthContext';

const UserSection = React.lazy(() => import('../components/UserDetails/UserDetails'));

function UserPage() {
    const vitisor = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState(null);
    const {request} = useHttp();
    const userLogin = useParams().login;
    const getUserPosts = useCallback(async(postsArr) => {
        try {
            const posts = await request('/api/post/get', 'post', postsArr);
            console.log(posts);
            setPosts(posts);
        } catch(e) {
            console.log(e);
        }
    }, [request])
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

    useEffect(() => {
        if (userData) getUserPosts(userData.posts);
    }, [userData, getUserPosts])


    return (
        <div className="UserPage">
            <Suspense fallback={<div className="lazySection"><div className="img"></div><div className="login"></div><div className="email"></div></div>}>
                <UserSection {...userData} isAuthor={userData ? userData._id === vitisor.userId : false} />
            </Suspense>
            {userData && posts ? 
            <UserArticles posts={posts} isAuthor={userData ? userData._id === vitisor.userId : false}/>
            :
            ""
            }
        </div>
    )
}

export default UserPage;