import './Comment.css';
function Comment(props) {
    return (
        <div className="Comment">
            <div className="text">{props.content}</div>
            <div className="author"><a href={`/user/${props.authorLogin}`}>{props.authorLogin}</a></div>
            <div className="publishDate">{props.publishDate}</div>
        </div>
    );
}

export default Comment;