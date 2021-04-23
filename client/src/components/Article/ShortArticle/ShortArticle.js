import './ShortArticle.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faArrowUp, faClock} from '@fortawesome/free-solid-svg-icons';
import Votes from '../Votes/Votes';

function ShortArticle(props) {
    return (
        <div className="ShortArticle">
            <img src={props.img} alt={props.title}/>
            <div className="info">
                <h1 className="title">{props.title}</h1>
                <p className="description">{props.description}</p>
                <p className="author">written by <a href={`/user/${props.authorLogin}`}>{props.authorLogin}</a></p>
                <p className="publishDate"><FontAwesomeIcon icon={faClock} />{props.publishDate}</p>
            </div>
            <Votes />
        </div>
    );
}

export default ShortArticle;