import React from 'react';
import './UserPosts.css';
import UserPost from './UserPost/UserPost';

function UserPosts(props) {
    return (
        <div className="UserPosts">
            <div className="newPost"><a href="/">+</a></div>
            <UserPost />
            <UserPost />
            <UserPost />
        </div>
    )
}

export default UserPosts;