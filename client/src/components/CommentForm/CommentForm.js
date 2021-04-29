import React, {useState} from 'react';
import {useHttp} from '../../hooks/http.hook';
import './CommentForm.css';


function CommentForm() {

    const {request} = useHttp();
    const [commnet, setComment] = useState('');

    function InputText(e) {
        setComment(e.target.innerText);
        console.log(commnet);
    }
    function SbmComment() {
        console.log("sbm");
    }
    return(
        <div className="CommentForm">
            <div contentEditable="true" className="commentText" onInput={InputText}></div>
            <button className="sbmComment" onClick={SbmComment}>Comment</button>
        </div>
    );
}

export default CommentForm;