import React from 'react';
import './UserArticles.css';
import CirclePreloader from '../Preloaders/CirclePreloader';
import PreviewArticle from '../Article/PreviewArticle/PreviewArticle';

function UserArticles(props) {
    return (
        <div className="UserArticles">
            {props.isAuthor ? <div className="newPost"><a href={`/post/new`}>+</a></div> : ""}
            {
                props.posts?.map((el, index) => {
                    return el.title ? <PreviewArticle key={index} {...el} /> : <CirclePreloader key={index} className="lazyPost" />
                })
            }
            
        </div>
    )
}

export default UserArticles;