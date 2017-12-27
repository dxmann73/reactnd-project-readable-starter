import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {PostType} from '../../types/Typedefs';
import PropTypes from 'prop-types';
import './PostDetails.css';
import {deletePost, downVote, fetchPost, upVote} from '../../actions/post-actions';
import VoteControls from '../shared/VoteControls';
import PostTitle from './subcomponents/PostTitle';
import PostSubtitle from './subcomponents/PostSubtitle';

class PostDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            deleteConfirmationShowing: false,
        };
    }

    showDeleteConfirmation(show) {
        this.setState({
            deleteConfirmationShowing: show,
        });
    }

    render() {
        // console.log('Post::render', this.props);
        const {post, categoryName, dispatchUpVote, dispatchDownVote, dispatchRouteToEditPost} = this.props;
        if (!post) {
            return <h4>fetching post... </h4>;
        }
        if (this.state.deleteConfirmationShowing) {
            return <h4 className="post-details-heading">Are you sure you want to delete the post?
                <button type="button" className="post-details-button"
                        onClick={() => this.deletePost(post)}>Yes
                </button>
                <button type="button" className="post-details-button"
                        onClick={() => this.showDeleteConfirmation(false)}>No
                </button>
            </h4>;
        }
        return <div className="post-details-wrapper">
            <h4 className="post-details-heading">Post details with comments:
                <button type="button" className="post-details-button"
                        onClick={() => dispatchRouteToEditPost(post.id)}>Edit post
                </button>
                <button type="button" className="post-details-button"
                        onClick={() => this.showDeleteConfirmation(true)}>Delete post
                </button>
            </h4>
            <VoteControls upVoteHandler={() => dispatchUpVote(post.id)} downVoteHandler={() => dispatchDownVote(post.id)} />
            <div className="post-details-main">
                <PostTitle post={post} />
                <div className="post-body">
                    {post.body}
                </div>
                <PostSubtitle post={post} categoryName={categoryName} />
                <div className="post-comments">
                    <h5>comments here</h5>
                </div>
            </div>
        </div>;
    }

    deletePost = (post) => {
        this.props.dispatchDeletePost(post.id);
        this.props.dispatchRouteToCategoryView(post);
    };

    /** when the component is mounted, and the post is not yet in the state, this means we come from a bookmark or F5 */
    componentWillMount() {
        // console.log('Post::componentWillMount', this.props);
        if (!this.props.post) {
            this.props.dispatchFetchPost(this.props.postId);
        }
    }
}

PostDetails.propTypes = {
    post: PostType,
    postId: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    dispatchUpVote: PropTypes.func.isRequired,
    dispatchDownVote: PropTypes.func.isRequired,
    dispatchFetchPost: PropTypes.func.isRequired,
    dispatchRouteToEditPost: PropTypes.func.isRequired,
    dispatchRouteToCategoryView: PropTypes.func.isRequired,
    dispatchDeletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    // console.log('Post::mapStateToProps', state, props);
    const post = state.posts[props.postId];
    const categoryName = (post && state.categories.byPath && state.categories.byPath[post.category].name) || 'fetching...';
    return {
        post,
        postId: props.postId,
        categoryName,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUpVote: (postId) => dispatch(upVote(postId)),
        dispatchDownVote: (postId) => dispatch(downVote(postId)),
        dispatchFetchPost: (postId) => dispatch(fetchPost(postId)),
        dispatchRouteToEditPost: (postId) => dispatch(push(`/posts/edit/${postId}`)),
        dispatchRouteToCategoryView: (post) => dispatch(push(`/${post.category}`)),
        dispatchDeletePost: (postId) => dispatch(deletePost(postId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(PostDetails);
