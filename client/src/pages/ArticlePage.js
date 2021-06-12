import React, {useState, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import ShortArticle from '../components/Article/ShortArticle/ShortArticle';
import './ArticlePage.css';
import CommentForm from '../components/CommentForm/CommentForm';
import Comments from "../components/Comments/Comments";
import {CommentsContext} from '../context/CommentsContext';

function ArticlePage() {
    const {request} = useHttp();
    const [comments, setComments] = useState({loaded:false, comments: []});
    const [data, setData] = useState({
        loaded: false,
        _id: 0,
        title: "",
        description: "",
        titleImage: "",
        content: "",
        authorLogin: "",
        publishDate: "",
        votes: 0,
        records: {}

    })
    const articleId = useParams().id;

    const getData = useCallback(async() => {
        try {
            const data = (await request('/api/post/get', 'POST', [articleId]))[0];
            setData({
                loaded: true,
                _id: data._id,
                title: data.title,
                titleImage: data.titleImage,
                description: data.description,
                content: data.content,
                author: data.author,
                publishDate: data.publishDate,
                votes: data.votes,
                records: data.records
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
            {data.loaded ? <ShortArticle {...data} /> : ""}
            <div className="content">
                {data.content}
            </div>
            <CommentsContext.Provider value={{comments, setComments}}>
                <Comments postId={data._id} />
                <CommentForm postId={articleId} />
            </CommentsContext.Provider>
        </article>
    )
}

export default ArticlePage;