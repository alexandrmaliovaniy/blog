import React, {useState, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import ShortArticle from '../components/Article/ShortArticle/ShortArticle';
import './ArticlePage.css';

function ArticlePage() {
    const {request} = useHttp();
    const [data, setData] = useState({
        title: "",
        description: "",
        titleImage: "",
        content: "",
        authorLogin: "",
        publishDate: "",
        votes: null

    })
    const articleId = useParams().id;

    const getData = useCallback(async() => {
        try {
            const data = (await request('/api/post/get', 'POST', [articleId]))[0];
            setData({
                title: data.title,
                titleImage: data.titleImage,
                description: data.description,
                content: data.content,
                authorLogin: data.authorLogin,
                publishDate: data.publishDate,
                votes: data.votes
            })
        } catch(e) {
            console.log(e);
        }
    }, [request, articleId]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <article className="ArticlePage">
            <ShortArticle {...data} />
            <div className="content">
                {data.content}
            </div>
            <div className="comments">
                
            </div>
        </article>
    )
}

export default ArticlePage;