import React from 'react';


function UserPost(props) {
    return (
        <div className="UserPost">
            <a href={`/`}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/1200px-Firefox_logo%2C_2019.svg.png" alt="post title" className="postShort"/>
                <p className="postDescription">
                    Some description here
                    Some description here
                    Some description hereSome description here
                    Some description here
                </p>
            </a>
        </div>
    )
}

export default UserPost;