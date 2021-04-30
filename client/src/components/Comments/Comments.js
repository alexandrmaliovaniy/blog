import React, {useState, useCallback, useEffect} from 'react';
import {useHttp} from '../../hooks/http.hook';


function Comments(props) {

    const {request} = useHttp();

    const [comments, setComments] = useState([]);


    const getComments = useCallback(async() => {
        try {
            const data = await request('/api/post/getcomments', 'POST', {
                postId: props.postId
            });
            console.log(data);
        } catch(e) {
            console.log(e);
        }
    });


    useEffect(() => {
        if (props.postId !== 0) {
            console.log(1);
            getComments();
        }
    }, [props.postId])


    return (
        <div className="Comments">

        </div>
    )
}

export default Comments;