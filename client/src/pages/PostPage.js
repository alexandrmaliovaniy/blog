import React, {useState, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';

function PostPage() {
    const {request} = useHttp();
    const [data, setData] = useState({
        title: "",
        description: "",
        img: "",
        content: ""
    })
    const articleId = useParams().id;

    const getData = useCallback(async() => {
        try {
            const data = (await request('/api/post/get', 'POST', [articleId]))[0];
            console.log(data);
            setData({
                title: data.title,
                img: data.titleImage,
                description: data.description,
                content: data.content
            })
        } catch(e) {
            console.log(e);
        }
    }, [request, articleId]);

    useEffect(() => {
        getData();
    }, [getData]);



    return (
        <article>
            <div className="mainInformation">
                <h1>{data.title}</h1>
                <p>{data.description}</p>
                {/* <img src={data.img} alt="none" /> */}
            </div>
            <div className="content">
                {data.content}
            </div>
        </article>
    )
}

export default PostPage;