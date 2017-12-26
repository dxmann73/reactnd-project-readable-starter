import React from 'react';
import './PostCrud.css';
import {editPost, fetchPost} from '../../../actions/post-actions';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
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
        this.props.dispatchAddInfoFeedback('Success! Your post has been saved!');// TODO but this would fail if backend is gone
        this.props.dispatchRouteToPostDetails(this.props.post);
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

    cancel = () => {
        this.props.dispatchRouteToPostDetails(this.props.post);
    };

    render() {
        // console.log('PostEdit::render', this.props, this.state);
        const {post} = this.props;
        if (!post) {
            return <h4>fetching post... </h4>;
        }
        return <div className="category-add">
            <h4 className="category-add-heading">Edit post:</h4>
            <div className="post-container">
                <input className="post-title" type="text" placeholder="Post title" ref={(val) => this.titleInput = val} defaultValue={post.title} />
                <textarea className="post-add-body" rows="6" placeholder="Post content" ref={(val) => this.bodyInput = val} defaultValue={post.body} />
            </div>
            <div className="post-add-controls">
                <button type="button" title="Save post" onClick={() => this.editPost()}>Save post</button>
                <button type="button" title="Cancel" onClick={() => this.cancel()}>Cancel</button>
            </div>
        </div>;
    }

    /** when the component is mounted, and the post is not yet in the state, this means we come from a bookmark or F5 */
    componentWillMount() {
        // console.log('PostEdit::componentWillMount', this.props);
        if (!this.props.post) {
            this.props.dispatchFetchPost(this.props.postId);
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
    dispatchRouteToPostDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    // console.log('PostEdit::mapStateToProps', state, props);
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
        dispatchRouteToPostDetails: (post) => dispatch(push(`/post-details/${post.id}`)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(PostEdit);
