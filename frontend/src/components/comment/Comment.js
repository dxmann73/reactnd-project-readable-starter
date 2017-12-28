import React from 'react';
import {connect} from 'react-redux';
import {CommentType} from '../../types/Typedefs';
import PropTypes from 'prop-types';
import './Comment.css';
import {downVote, upVote} from '../../actions/comment-actions';
import VoteControls from '../shared/VoteControls';

class Comment extends React.Component {
    render() {
        // console.log('Comment::render', this.props);
        const {comment, dispatchUpVote, dispatchDownVote} = this.props;
        return <div className="comment-main">
            <VoteControls upVoteHandler={() => dispatchUpVote(comment.id)} downVoteHandler={() => dispatchDownVote(comment.id)} />
            <div className="comment-body">
                <span>{comment.body}</span>
            </div>
        </div>;
    }
}

Comment.propTypes = {
    comment: CommentType,
    dispatchUpVote: PropTypes.func.isRequired,
    dispatchDownVote: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    // console.log('Comment::mapStateToProps', state, props);
    return {
        comment: state.comments[props.commentId],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUpVote: (commentId) => dispatch(upVote(commentId)),
        dispatchDownVote: (commentId) => dispatch(downVote(commentId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Comment);
