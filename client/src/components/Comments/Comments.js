import React, {useState, useCallback, useEffect} from 'react';
import {useHttp} from '../../hooks/http.hook';
import Comment from './Comment';

function Comments(props) {

    const {request} = useHttp();

    const [comments, setComments] = useState({loaded:false, comments: []});

    const getCommentsText = useCallback(async(data) => {
        try {
            const text = await request('/api/post/commentsText', 'POST', {
                comments: data.comments
            });
            setComments({...comments, ...data, comments: text, loaded: true});
        } catch(e) {
            console.log(e);
        }
    });

    const getComments = useCallback(async() => {
        try {
            const data = await request('/api/post/getcomments', 'POST', {
                postId: props.postId
            });
            setComments({...comments, ...data});
            getCommentsText(data);
        } catch(e) {
            console.log(e);
        }
    });


    useEffect(() => {
        if (props.postId !== 0) {
            getComments();
        }
    }, [props.postId])

    console.log(comments);
    return (
        <div className="Comments">
            {
                comments?.comments.map((el, index) => {
                    return comments.loaded ? <Comment content={el.text} authorLogin={el.authorLogin} publishDate={el.publishDate} key={index} /> : "";
                })
            }
        </div>
    )
}

export default Comments;