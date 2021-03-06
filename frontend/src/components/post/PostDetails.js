import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {PostType} from '../../types/Typedefs';
import PropTypes from 'prop-types';
import './PostDetails.css';
import {deletePost, downVote, fetchPost, upVote} from '../../actions/post-actions';
import VoteControls from '../shared/VoteControls';
import PostTitle from './subcomponents/PostTitle';
import Subtitle from '../shared/Subtitle';
import {fetchComments, resetComments} from '../../actions/comment-actions';
import Comment from '../comment/Comment';
import CrudControls from '../shared/CrudControls';
import CommentAdd from '../comment/CommentAdd';

/** Possible to merge with Post.js, but there are many subtle differences */
class PostDetails extends React.Component {

    deletePost = (post) => {
        this.props.dispatchDeletePost(post.id);
        this.props.dispatchRouteToCategoryView(post);
    };

    render() {
        const {post, comments, categoryName, dispatchUpVote, dispatchDownVote, dispatchRouteToEditPost} = this.props;
        if (!post) {
            return <h4>This post does not seem to exist.</h4>;
        }
        return <div className="post-details-wrapper">
            <h4 className="post-details-heading">Post details with comments:</h4>
            <VoteControls upVoteHandler={() => dispatchUpVote(post.id)} downVoteHandler={() => dispatchDownVote(post.id)} />
            <div className="post-details-main">
                <PostTitle post={post} />
                <CrudControls deleteHandler={() => this.deletePost(post)}
                              editHandler={() => dispatchRouteToEditPost(post.id)} />
                <pre className="post-body">
                    {post.body}
                </pre>
                <Subtitle item={post} category={{path: post.category, name: categoryName}} />
                <div className="post-comments">
                    <CommentAdd postId={post.id} />
                    {comments && comments.map(id => <Comment key={id} commentId={id} />)}
                </div>
            </div>
        </div>;
    }

    componentWillMount() {
        if (!this.props.post) {
            // support F5 and bookmarked post URLs
            this.props.dispatchFetchPost(this.props.postId);
        }
        this.props.dispatchFetchComments(this.props.postId);

    }

    componentWillUnmount() {
        this.props.dispatchResetComments();// clean up state, or comments will live until the next post is shown
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
    dispatchResetComments: PropTypes.func.isRequired,
    dispatchRouteToEditPost: PropTypes.func.isRequired,
    dispatchRouteToCategoryView: PropTypes.func.isRequired,
    dispatchDeletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    const post = state.posts[props.postId];
    // make sure the post has been fetched
    const categoryName = (post && state.categories.byPath[post.category].name) || 'fetching...';
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
        dispatchResetComments: () => dispatch(resetComments()),
        dispatchRouteToEditPost: (postId) => dispatch(push(`/posts/edit/${postId}`)),
        dispatchRouteToCategoryView: (post) => dispatch(push(`/${post.category}`)),
        dispatchDeletePost: (postId) => dispatch(deletePost(postId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(PostDetails);
