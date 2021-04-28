import {useState, useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {AuthContext} from '../../../context/AuthContext';
import {useHttp} from '../../../hooks/http.hook';
import './Votes.css';
function Votes(props) {
    const {request} = useHttp();
    const {userId, token} = useContext(AuthContext);
    const [voteStatus, setVoteStatus] = useState(props?.records[userId] || null);
    const [votesCount, setVotesCount] = useState(props.votes || 0);
    async function Vote(v) {
        if (voteStatus * v > 0) return;
        let k = v - voteStatus;
        try {
            const res = await request('/api/post/rate', 'POST', {
                postId: props._id,
                vote: k,
                userId
            }, {
                Authorization: `Bearer ${token}`
            });
            if (res.msg === "success") {
                setVoteStatus(v);
                setVotesCount(votesCount + k);
            }
        } catch(e) {
            console.log(e);
        }
    }
    return (
        <div className="Votes">
            <FontAwesomeIcon icon={faArrowUp} onClick={()=>Vote(1)}  className={`voteArrow voteUp ${voteStatus > 0 ? "active" : ""}`} />
            <span className="count">{votesCount || 0}</span>
            <FontAwesomeIcon icon={faArrowDown} onClick={()=>Vote(-1)} className={`voteArrow voteDown ${voteStatus < 0 ? "active" : ""}`} />
        </div>
    )
}

export default Votes;