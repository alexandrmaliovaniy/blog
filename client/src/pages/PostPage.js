import React, {useState, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import './PostPage.css';

function PostPage() {
    const {request} = useHttp();
    const [data, setData] = useState({
        title: "",
        description: "",
        img: "",
        content: "",
        authorLogin: "",
        publishDate: ""

    })
    const articleId = useParams().id;

    const getData = useCallback(async() => {
        try {
            const data = (await request('/api/post/get', 'POST', [articleId]))[0];
            setData({
                title: data.title,
                img: data.titleImage,
                description: data.description,
                content: data.content,
                authorLogin: data.authorLogin,
                publishDate: String(new Date(data.publishDate))
            })
        } catch(e) {
            console.log(e);
        }
    }, [request, articleId]);

    useEffect(() => {
        getData();
    }, [getData]);



    return (
        <article className="PostPage">
            <div className="vote">

            </div>
            <div className="mainInformation">
                <h1 className="title">{data.title}</h1>
                <p className="description">{data.description}</p>
                <div className="postInfo">
                    <div className="author"><i>written by <a href={`/user/${data.authorLogin}`}>{data.authorLogin}</a></i></div>
                    <div className="postTime">{data.publishDate}</div>
                </div>
            </div>
            <img src={data.img} alt="none" />
            <div className="content">
                {data.content}
            </div>
        </article>
    )
}

export default PostPage;