import React from 'react';
import PropTypes from 'prop-types';
import './VoteControls.css';

class VoteControls extends React.Component {
    render() {
        const {upVoteHandler, downVoteHandler} = this.props;
        return <div className="vote-controls">
            <div>
                <button type="button" className="vote-button vote-button-up" title="vote up"
                        onClick={() => upVoteHandler()}>+
                </button>
            </div>
            <div>
                <button type="button" className="vote-button" title="vote down"
                        onClick={() => downVoteHandler()}>-
                </button>
            </div>
        </div>;
    }
}

VoteControls.propTypes = {
    upVoteHandler: PropTypes.func.isRequired,
    downVoteHandler: PropTypes.func.isRequired,
};

export default VoteControls;