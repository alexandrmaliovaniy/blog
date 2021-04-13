import React, {Suspense} from 'react';
import './UserPosts.css';

const UserPost = React.lazy(() => import('./UserPost/UserPost'));

function UserPosts(props) {
    return (
        <div className="UserPosts">
            {props.isAuthor ? <div className="newPost"><a href={`/post/${props.login}`}>+</a></div> : ""}
            <Suspense fallback={<div className="lazyPost"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}>
                <UserPost />
            </Suspense>
        </div>
    )
}

export default UserPosts;