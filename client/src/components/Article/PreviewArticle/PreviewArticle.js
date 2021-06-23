import React from 'react';
import {Link} from 'react-router-dom';
import './PreviewArticle.css';
function UserPost(props) {
    return (
        <div className="UserPost">
            <Link to={`/post/preview/${props._id}`}>
                <img src={props.titleImage} alt="post title" className="postShort"/>
                <p className="postDescription">
                    {props.description}
                </p>
            </Link>
        </div>
    )
}

export default UserPost;