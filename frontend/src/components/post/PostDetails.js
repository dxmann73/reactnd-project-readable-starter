import React from 'react';
import {connect} from 'react-redux';
import {PostType} from '../../types/Typedefs';
import PropTypes from 'prop-types';
import './Post.css';
import {downVote, fetchPost, upVote} from '../../actions/post-actions';
import VoteControls from '../shared/VoteControls';
import PostTitle from './subcomponents/PostTitle';
import PostSubtitle from './subcomponents/PostSubtitle';

class PostDetails extends React.Component {
    render() {
        // console.log('Post::render', this.props);
        const {post, categoryName, dispatchUpVote, dispatchDownVote} = this.props;
        if (!post) {
            return <h4>fetching post... </h4>;
        }
        return <div className="post-main">
            <h4 className="category-heading">Post details with comments:</h4>
            <VoteControls upVoteHandler={() => dispatchUpVote(post.id)} downVoteHandler={() => dispatchDownVote(post.id)} />
            <div className="post-main">
                <PostTitle post={post} />
                <PostSubtitle post={post} categoryName={categoryName} />
                <div className="post-body">
                    {post.body}
                </div>
                <div className="post-comments">
                    <h5>comments here</h5>
                </div>
            </div>
        </div>;
    }

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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(PostDetails);
