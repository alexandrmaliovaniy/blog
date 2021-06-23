import React, {useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import './NewArticlePage.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {useHttp} from '../hooks/http.hook';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

function NewArticlePage() {
    const {token, logout} = useContext(AuthContext);
    const history = useHistory();
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
    function TextInput(e) {
        setData({
            ...data,
            [e.target.attributes.name.value]: e.target.innerText
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
            history.push(`/post/preview/${id}`);
        } catch (e) {
            console.log(e);
            // logout();
            // window.location = '/auth';
        }
    }

    return (
        <div className="NewArticlePage">
            <form className="postForm">

                <div className="mainData">
                    <div className="headers">
                        <input type="text" placeholder="Title" name="title" className="title" onChange={Input} />
                        <input type="text" placeholder="Description" name="description" className="description" onChange={Input} />
                    </div>
                    <div className="imgHeadline">
                        <label for="imgContainer" className="imgPrev">{data.titleImage ? <img src={data.titleImage} alt="head" /> : <div><FontAwesomeIcon icon={faDownload}/>  Upload Image</div>}</label>
                        <input type="file" accept="image" id="imgContainer" onChange={LoadImage} />
                    </div>
                </div>
                <div name="content" className="mainContent" contentEditable="true" onInput={TextInput}></div>
                {/* <textarea name="content" className="mainContent" onChange={Input}></textarea> */}
                <input type="submit" value="Publish" className="sbm" onClick={Submit} />
            </form>
        </div>
    )
}


export default NewArticlePage;