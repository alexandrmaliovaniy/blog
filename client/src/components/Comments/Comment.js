import './Comment.css';
function Comment(props) {
    return (
        <div className="Comment">
            <div className="text">{props.content}</div>
            <div className="author"><a href={`/user/${props.authorLogin}`}>{props.authorLogin}</a></div>
            <div className="publishDate">{new Date(props.publishDate).toLocaleString()}</div>
        </div>
    );
}

export default Comment;