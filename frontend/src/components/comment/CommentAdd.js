import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './Comment.css';
import {createComment} from '../../actions/comment-actions';
import {addErrorFeedback, addInfoFeedback, resetFeedback} from '../../actions/feedback-actions';
import shortid from 'shortid';

class CommentAdd extends React.Component {
    authorInput;
    bodyInput;

    addComment = () => {
        const comment = {
            id: shortid.generate(),
            parentId: this.props.postId,
            timestamp: Date.now(),
            author: this.authorInput.value,
            body: this.bodyInput.value,
        };
        if (!this.validate(comment)) {
            return;
        }
        this.props.dispatchCreateComment(comment);
        this.resetForm();
    };

    resetForm = () => {
        this.props.dispatchResetFeedback();
        this.authorInput.value = this.bodyInput.value = '';
    };
    validate = (comment) => {
        this.props.dispatchResetFeedback();
        let valid = true;
        if (!comment.author) {
            this.props.dispatchAddErrorFeedback('Please add an author');
            valid = false;
        }
        if (!comment.body) {
            this.props.dispatchAddErrorFeedback('Please add some content to your comment');
            valid = false;
        }
        return valid;
    };

    render() {
        return <div className="comment-main">
            <h4 className="comment-add-heading">Add a comment:</h4>
            <div className="comment-body">
                <input type="text" placeholder="Author" ref={(val) => this.authorInput = val} />
                <textarea rows="3" placeholder="Comment" ref={(val) => this.bodyInput = val} />
            </div>
            <div className="comment-add-controls">
                <button type="button" title="Add comment" onClick={this.addComment}>Add comment</button>
                <button type="button" title="Reset" onClick={this.resetForm}>Reset</button>
            </div>
        </div>;
    }
}

CommentAdd.propTypes = {
    postId: PropTypes.string.isRequired,
    dispatchCreateComment: PropTypes.func.isRequired,
    dispatchAddInfoFeedback: PropTypes.func.isRequired,
    dispatchAddErrorFeedback: PropTypes.func.isRequired,
    dispatchResetFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    return {
        postId: props.postId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchCreateComment: (commentId) => dispatch(createComment(commentId)),
        dispatchAddInfoFeedback: (msg) => dispatch(addInfoFeedback(msg)),
        dispatchAddErrorFeedback: (msg) => dispatch(addErrorFeedback(msg)),
        dispatchResetFeedback: () => dispatch(resetFeedback()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(CommentAdd);
