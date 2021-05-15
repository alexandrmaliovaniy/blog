import './Comment.css';
import {Link} from 'react-router-dom';
function Comment(props) {
    return (
        <div className="Comment">
            <div className="text">{props.content}</div>
            <div className="author"><Link href={`/user/${props.authorLogin}`}>{props.authorLogin}</Link></div>
            <div className="publishDate">{new Date(props.publishDate).toLocaleString()}</div>
        </div>
    );
}

export default Comment;