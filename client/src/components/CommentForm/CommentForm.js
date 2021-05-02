import React, {useState, useContext} from 'react';
import {useHttp} from '../../hooks/http.hook';
import {AuthContext} from '../../context/AuthContext';
import './CommentForm.css';
import {CommentsContext} from '../../context/CommentsContext';

function CommentForm(params) {
    const {token, userLogin} = useContext(AuthContext);
    const {comments, setComments} = useContext(CommentsContext);
    const {request} = useHttp();
    const [comment, setComment] = useState('');
    const [textError, serTextError] = useState('');
    function InputText(e) {
        setComment(e.target.innerText);
    }
    async function SbmComment() {
        if (comment.length < 10 || comment.length > 1500) {
            serTextError("Comment must contain more than 10 symbols and less than 1500");
            return;
        }
        serTextError("");
        try {
            const res = await request('/api/post/comment', 'POST', {
                postId: params.postId,
                text: comment
            }, {
                Authorization: `Bearer ${token}`
            })
            const arr = comments.comments;
            arr.push(res);
            setComments({...comments, comments: arr});
            setComment("");
            document.querySelector('.commentText').innerText = "";
        } catch(e) {
            console.log(e);
        }
    }
    return(
        <div className="CommentForm">
            <div contentEditable="true" className="commentText" onInput={InputText} value={comment}></div>
            <div className="warning">{textError}</div><button className="sbmComment" onClick={SbmComment}>Comment</button>
        </div>
    );
}

export default CommentForm;