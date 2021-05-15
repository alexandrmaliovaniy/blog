import './ShortArticle.css';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import Votes from '../Votes/Votes';

function ShortArticle(props) {
    if (!props._id) return <div></div>;
    return (
        <div className="ShortArticle">
            <img src={props.titleImage} alt={props.title}/>
            <div className="info">
                <h1 className="title"><Link to={`/post/preview/${props._id}`}>{props.title}</Link></h1>
                <p className="description">{props.description}</p>
                <p className="author">written by <Link to={`/user/${props.authorLogin}`}>{props.authorLogin}</Link></p>
                <p className="publishDate"><FontAwesomeIcon icon={faClock} /> {(new Date(props.publishDate).toLocaleString())}</p>
            </div>
            <Votes {...props} />
        </div>
    );
}

export default ShortArticle;