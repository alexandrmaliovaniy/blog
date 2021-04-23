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
        img: "",
        content: "",
        authorLogin: "",
        publishDate: "",
        votes: 0

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
                publishDate: String(new Date(data.publishDate)),
                votes: data.votes
            })
        } catch(e) {
            console.log(e);
        }
    }, [request, articleId]);

    useEffect(() => {
        getData();
    }, [getData]);


    function Vote(index) {
        setData({
            ...data,
            votes: data.votes+index
        })
    }


    return (
        <article className="ArticlePage">
            <ShortArticle {...data} />
            {/* <div className="vote">
                <FontAwesomeIcon icon={faArrowUp} className="voteUp" onClick={()=>Vote(1)} />
                <span className="count">{data.votes}</span>
                <FontAwesomeIcon icon={faArrowDown} className="voteDown" onClick={()=>Vote(-1)} />
            </div>
            <div className="mainInformation">
                <h1 className="title">{data.title}</h1>
                <p className="description">{data.description}</p>
                <div className="postInfo">
                    <div className="author"><i>written by <a href={`/user/${data.authorLogin}`}>{data.authorLogin}</a></i></div>
                    <div className="postTime"><FontAwesomeIcon icon={faClock} /> {data.publishDate}</div>
                </div>
            </div>
            <img src={data.img} alt="none" /> */}
            <div className="content">
                {data.content}
            </div>
            <div className="comments">
                
            </div>
        </article>
    )
}

export default ArticlePage;