import React, {Suspense} from 'react';
import './UserPosts.css';

const UserPost = React.lazy(() => import('./UserPost/UserPost'));

function UserPosts(props) {
    return (
        <div className="UserPosts">
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

export default UserPosts;