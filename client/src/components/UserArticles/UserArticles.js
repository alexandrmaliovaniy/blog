import React, {Suspense} from 'react';
import './UserArticles.css';

const UserPost = React.lazy(() => import('../Article/PreviewArticle/PreviewArticle'));

function UserArticles(props) {
    return (
        <div className="UserArticles">
            {props.isAuthor ? <div className="newPost"><a href={`/post/new`}>+</a></div> : ""}
            {
                props.posts.map((el, index) => {
                    return (
                        <Suspense key={index} fallback={<div className="lazyPost"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}>
                            <UserPost key={index} {...el} />
                        </Suspense>
                    )
                })
            }
            
        </div>
    )
}

export default UserArticles;