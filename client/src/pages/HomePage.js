import React, {useState, useCallback, useEffect} from 'react';
import {useHttp} from '../hooks/http.hook';

function HomePage() {

    const {request} = useHttp();
    const [offset, setOffset] = useState(0);

    const loadArticles = useCallback(async(offset) => {
        try {
            const data = await request('/api/post/getrecent/', 'POST', {
                offset,
                count: 20
            });
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
            
        </div>
    )
}

export default HomePage;