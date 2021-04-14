import React, {useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import './NewPostPage.css';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';

function NewPostPage() {
    const {token, logout} = useContext(AuthContext);
    const {request} = useHttp();
    const [data, setData] = useState({
        title: "",
        titleImage: "",
        description: "",
        content: ""
    });

    function Input(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    function LoadImage(e) {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setData({
                ...data,
                titleImage: reader.result
            });
        }
        reader.readAsDataURL(file);
    }

    async function Submit(e) {
        e.preventDefault();
        try {
            const {id} = await request("/api/post/new", 'POST', data, {
                Authorization: `Bearer ${token}`
            })
            window.location = `/post/${id}`;
        } catch (e) {
            logout();
            window.location = '/auth';
        }
    }

    return (
        <div className="NewPostPage">
            <form className="postForm">

                <h1>Headline</h1>
                <hr />

                <input type="text" placeholder="Title" name="title" className="title" onChange={Input} />
                <input type="file" accept=".png, .jpg, .jpeg" name="titleImage" className="titleImage" onChange={LoadImage} />
                <input type="text" placeholder="Short description" name="description" className="description" onChange={Input} />
                <h1>Main content</h1>
                <hr />

                <textarea name="content" onChange={Input}></textarea>

                <input type="submit" value="Publish" className="sbm" onClick={Submit} />
            </form>
        </div>
    )
}


export default NewPostPage;