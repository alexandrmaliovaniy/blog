import {useState, useEffect, useCallback, useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import ShortArticle from '../components/Article/ShortArticle/ShortArticle';
import {AuthContext} from '../context/AuthContext';
import './SubscribePage.css';

function SubscribePage() {
    const {request} = useHttp();
    const {token} = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    const loadArticlesId = useCallback(async() => {
        try {
            const sequence = await request('/api/user/subscribecontent', 'POST', null, {
                Authorization: `Bearer ${token}`
            });
            setPosts(sequence);
        } catch(e) {
            console.log(e);
        }
    }, [request]);

    useEffect(() => {
        loadArticlesId();
    }, [loadArticlesId])


    return (
        <div className="SubscribePage">
            {
                posts.map((el, index) => {
                    return <ShortArticle {...el} key={index} />
                })
            }
        </div>
    )
}

export default SubscribePage;