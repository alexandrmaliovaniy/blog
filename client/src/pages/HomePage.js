import React, {useState, useCallback, useEffect} from 'react';
import {useHttp} from '../hooks/http.hook';
import ShortArticle from '../components/Article/ShortArticle/ShortArticle';
import './HomePage.css';

function HomePage() {

    const {request} = useHttp();
    const [offset, setOffset] = useState(0);
    const [posts, setPosts] = useState([]);
    const loadArticles = useCallback(async(offset) => {
        try {
            const data = await request('/api/post/getrecent/', 'POST', {
                offset,
                count: 20
            });
            console.log(data)
            setPosts([...posts, ...data]);
            setOffset(offset + 20);
            
        } catch(e) {
            console.log(e);
        }
    }, [request]);

    useEffect(() => {
        loadArticles(0);
    }, [loadArticles]);


    return (
        <div className="HomePage">
            {
                posts.map((el, index) => {
                    return <ShortArticle key={index} {...el} />
                })
            }
        </div>
    )
}

export default HomePage;