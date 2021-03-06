import './Comment.css';
import {Link} from 'react-router-dom';
function Comment(props) {
    console.log(props.author.login)
    return (
        <div className="Comment">
            <div className="text">{props.content}</div>
            <div className="author"><Link to={`/user/${props.author.login}`}>{props.author.login}</Link></div>
            <div className="publishDate">{new Date(props.publishDate).toLocaleString()}</div>
        </div>
    );
}

export default Comment;