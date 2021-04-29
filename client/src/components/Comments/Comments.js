import React, {useState, useCallback, useEffect} from 'react';
import {useHttp} from '../../hooks/http.hook';


function Comments(props) {

    const {request} = useHttp();

    const [comments, setComments] = useState([]);


    const getComments = useCallback(async() => {
        try {
            const data = request('/api/post/comments', 'POST', {
                postId: props.postId
            });
            console.log(data);
        } catch(e) {
            console.log(e);
        }
    });


    useEffect(() => {
        getComments();
    }, [getComments])


    return (
        <div className="Comments">

        </div>
    )
}

export default Comments;