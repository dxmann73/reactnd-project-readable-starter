import React from 'react';
import './PostCrud.css';
import {editPost, fetchPost} from '../../../actions/post-actions';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import PropTypes from 'prop-types';
import {PostType} from '../../../types/Typedefs';
import {addErrorFeedback, addInfoFeedback, resetFeedback} from '../../../actions/feedback-actions';

class PostEdit extends React.Component {
    titleInput;
    bodyInput;

    editPost = () => {
        const patchedPost = {
            title: this.titleInput.value,
            body: this.bodyInput.value,
        };
        if (!this.validate(patchedPost)) {
            return;
        }
        this.props.dispatchEditPost(this.props.post.id, patchedPost);
        this.props.dispatchAddInfoFeedback('Success! Your post has been saved!');
        this.props.dispatchGoBack();
    };

    validate = (post) => {
        this.props.dispatchResetFeedback();
        let valid = true;
        if (!post.title) {
            this.props.dispatchAddErrorFeedback('Please add a title');
            valid = false;
        }
        if (!post.body) {
            this.props.dispatchAddErrorFeedback('Please add some content to your post');
            valid = false;
        }
        return valid;
    };

    render() {
        const {post, dispatchGoBack} = this.props;
        if (!post) {
            return <h4>This post does not seem to exist.</h4>;
        }
        return <div className="category-add">
            <h4 className="category-add-heading">Edit post:</h4>
            <div className="post-container">
                <input className="post-title" type="text" placeholder="Post title" ref={(val) => this.titleInput = val} defaultValue={post.title} />
                <textarea className="post-add-body" rows="6" placeholder="Post content" ref={(val) => this.bodyInput = val} defaultValue={post.body} />
            </div>
            <div className="post-add-controls">
                <button type="button" title="Save post" onClick={() => this.editPost()}>Save post</button>
                <button type="button" title="Cancel" onClick={dispatchGoBack}>Cancel</button>
            </div>
        </div>;
    }

    componentWillMount() {
        if (!this.props.post) {
            this.props.dispatchFetchPost(this.props.postId);// support F5 and bookmarked post URLs
        }
    }
}

PostEdit.propTypes = {
    postId: PropTypes.string.isRequired,
    post: PostType,
    dispatchFetchPost: PropTypes.func.isRequired,
    dispatchEditPost: PropTypes.func.isRequired,
    dispatchAddInfoFeedback: PropTypes.func.isRequired,
    dispatchAddErrorFeedback: PropTypes.func.isRequired,
    dispatchResetFeedback: PropTypes.func.isRequired,
    dispatchGoBack: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    return {
        postId: props.postId,
        post: state.posts[props.postId],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchPost: (postId) => dispatch(fetchPost(postId)),
        dispatchEditPost: (postId, post) => dispatch(editPost(postId, post)),
        dispatchAddInfoFeedback: (msg) => dispatch(addInfoFeedback(msg)),
        dispatchAddErrorFeedback: (msg) => dispatch(addErrorFeedback(msg)),
        dispatchResetFeedback: () => dispatch(resetFeedback()),
        dispatchGoBack: () => dispatch(goBack()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(PostEdit);
