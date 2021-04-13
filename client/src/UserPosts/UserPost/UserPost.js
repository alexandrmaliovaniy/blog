import React from 'react';


function UserPost(props) {
    return (
        <div className="UserPost">
            <a href={`/post/preview/${props._id}`}>
                <img src={props.titleImage} alt="post title" className="postShort"/>
                <p className="postDescription">
                    {props.description}
                </p>
            </a>
        </div>
    )
}

export default UserPost;