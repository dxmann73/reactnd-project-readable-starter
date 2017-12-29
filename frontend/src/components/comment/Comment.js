import React from 'react';
import {connect} from 'react-redux';
import {CommentType} from '../../types/Typedefs';
import PropTypes from 'prop-types';
import './Comment.css';
import {deleteComment, downVote, editComment, upVote} from '../../actions/comment-actions';
import {addErrorFeedback, resetFeedback} from '../../actions/feedback-actions';
import VoteControls from '../shared/VoteControls';
import CrudControls from '../shared/CrudControls';
import Subtitle from '../shared/Subtitle';

class Comment extends React.Component {
    bodyInput;

    constructor() {
        super();
        this.state = {
            isEditing: false
        };
    }

    toggleEditMode = () => this.setState((prev) => ({
        isEditing: !prev.isEditing
    }));

    saveComment = () => {
        const patched = {
            body: this.bodyInput.value,
        };
        if (!this.validate(patched)) {
            return;
        }
        this.props.dispatchEditComment(this.props.comment.id, patched);
        this.toggleEditMode();
    };

    validate = (comment) => {
        this.props.dispatchResetFeedback();
        let valid = true;
        if (!comment.body) {
            this.props.dispatchAddErrorFeedback('Please add some content to your comment');
            valid = false;
        }
        return valid;
    };

    render() {
        // console.log('Comment::render', this.props);
        const {comment, dispatchUpVote, dispatchDownVote, dispatchDeleteComment} = this.props;
        return <div className="comment-main comment-panel">
            <VoteControls upVoteHandler={() => dispatchUpVote(comment.id)} downVoteHandler={() => dispatchDownVote(comment.id)} />
            <CrudControls
                deleteHandler={() => dispatchDeleteComment(comment.id)}
                editHandler={this.toggleEditMode}
                cancelHandler={this.toggleEditMode}
                saveHandler={() => this.saveComment()}
                isEditing={this.state.isEditing} />
            <div className="comment-body">
                {this.state.isEditing
                    ? <textarea rows="3" placeholder="Comment" ref={(val) => this.bodyInput = val} defaultValue={comment.body} />
                    : <span>{comment.body}</span>
                }
            </div>
            <Subtitle item={comment} />
        </div>;
    }
}

Comment.propTypes = {
    comment: CommentType,
    dispatchUpVote: PropTypes.func.isRequired,
    dispatchDownVote: PropTypes.func.isRequired,
    dispatchDeleteComment: PropTypes.func.isRequired,
    dispatchEditComment: PropTypes.func.isRequired,
    dispatchAddErrorFeedback: PropTypes.func.isRequired,
    dispatchResetFeedback: PropTypes.func.isRequired,
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
        dispatchDeleteComment: (commentId) => dispatch(deleteComment(commentId)),
        dispatchEditComment: (commentId, comment) => dispatch(editComment(commentId, comment)),
        dispatchAddErrorFeedback: (msg) => dispatch(addErrorFeedback(msg)),
        dispatchResetFeedback: () => dispatch(resetFeedback()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Comment);
