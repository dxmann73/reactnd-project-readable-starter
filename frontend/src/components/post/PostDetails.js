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
import {fetchComments} from '../../actions/comment-actions';
import Comment from '../comment/Comment';
import CrudControls from '../shared/CrudControls';
import CommentAdd from '../comment/CommentAdd';

/** Possible to merge with Post.js, now that we have CRUD in the main view as well. */
class PostDetails extends React.Component {

    render() {
        // console.log('PostDetails::render', this.props);
        const {post, comments, categoryName, dispatchUpVote, dispatchDownVote, dispatchRouteToEditPost} = this.props;
        if (!post) {
            return <h4>fetching post... </h4>;
        }
        return <div className="post-details-wrapper">
            <h4 className="post-details-heading">Post details with comments:</h4>
            <VoteControls upVoteHandler={() => dispatchUpVote(post.id)} downVoteHandler={() => dispatchDownVote(post.id)} />
            <div className="post-details-main">
                <PostTitle post={post} />
                <CrudControls deleteHandler={() => this.deletePost(post)}
                              editHandler={() => dispatchRouteToEditPost(post.id)} />
                <div className="post-body">
                    {post.body}
                </div>
                <PostSubtitle post={post} categoryName={categoryName} />
                <div className="post-comments">
                    <CommentAdd postId={post.id} />
                    {comments && comments.map(id => <Comment key={id} commentId={id} />)}
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
        // console.log('PostDetails::componentWillMount', this.props);
        if (!this.props.post) {
            this.props.dispatchFetchPost(this.props.postId);
            this.props.dispatchFetchComments(this.props.postId);
        }
    }
}

PostDetails.propTypes = {
    post: PostType,
    postId: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.string),
    categoryName: PropTypes.string.isRequired,
    dispatchUpVote: PropTypes.func.isRequired,
    dispatchDownVote: PropTypes.func.isRequired,
    dispatchFetchPost: PropTypes.func.isRequired,
    dispatchFetchComments: PropTypes.func.isRequired,
    dispatchRouteToEditPost: PropTypes.func.isRequired,
    dispatchRouteToCategoryView: PropTypes.func.isRequired,
    dispatchDeletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    // console.log('PostDetails::mapStateToProps', state, props);
    const post = state.posts[props.postId];
    const categoryName = (post && state.categories.byPath && state.categories.byPath[post.category].name) || 'fetching...';
    return {
        post,
        postId: props.postId,
        comments: state.comments.ids,
        categoryName,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUpVote: (postId) => dispatch(upVote(postId)),
        dispatchDownVote: (postId) => dispatch(downVote(postId)),
        dispatchFetchPost: (postId) => dispatch(fetchPost(postId)),
        dispatchFetchComments: (postId) => dispatch(fetchComments(postId)),
        dispatchRouteToEditPost: (postId) => dispatch(push(`/posts/edit/${postId}`)),
        dispatchRouteToCategoryView: (post) => dispatch(push(`/${post.category}`)),
        dispatchDeletePost: (postId) => dispatch(deletePost(postId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(PostDetails);
