import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import './Votes.css';
function Votes() {
    return (
        <div className="Votes">
            <FontAwesomeIcon icon={faArrowUp} className="voteArrow voteUp" />
            <span className="count">0</span>
            <FontAwesomeIcon icon={faArrowDown} className="voteArrow voteDown" />
        </div>
    )
}

export default Votes;