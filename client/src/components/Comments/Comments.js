import React, {useState, useCallback, useEffect, useContext} from 'react';
import {useHttp} from '../../hooks/http.hook';
import Comment from './Comment';
import './Comments.css';
import {CommentsContext} from '../../context/CommentsContext';

function Comments(props) {

    const {request} = useHttp();

    const {comments, setComments} = useContext(CommentsContext);

    const getComments = useCallback(async() => {
        try {
            const data = await request('/api/post/getcomments', 'POST', {
                postId: props.postId
            });
            data.loaded = true;
            console.log(data);
            setComments({...comments, ...data});
        } catch(e) {
            console.log(e);
        }
    });


    useEffect(() => {
        if (props.postId !== 0) {
            getComments();
        }
    }, [props.postId])
    return (
        <div className="Comments">
            {
                comments?.comments.map((el, index) => {
                    return <Comment content={el.text} author={el.author} publishDate={el.publishDate} key={index} />
                })
            }
        </div>
    )
}

export default Comments;