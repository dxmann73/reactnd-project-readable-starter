import React from 'react';
import {connect} from 'react-redux';
import {PostType} from '../../types/Typedefs';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Link} from 'react-router-dom';
import './Post.css';
import {fetchPost, votePostDown, votePostUp} from '../../actions/post-actions';

class Post extends React.Component {
    render() {
        // console.log('Post::render', this.props);
        const {post, categoryName, detailedMode, dispatchUpVote, dispatchDownVote} = this.props;
        if (!post) {
            return <h4>fetching post... </h4>;
        }
        return <div className="post-main">
            <div className="post-vote-controls">
                <div>
                    <button type="button" className="post-vote-button post-vote-button-up" title="vote up"
                            onClick={() => dispatchUpVote(post.id)}>+
                    </button>
                </div>
                <div>
                    <button type="button" className="post-vote-button" title="vote down"
                            onClick={() => dispatchDownVote(post.id)}>-
                    </button>
                </div>
            </div>
            <div className="post-main">
                <div className="post-title">
                    <Link className="post-title-link" to={`/posts/${post.id}`}>{post.title}</Link>
                </div>
                <div className="post-subtitle">
                    <span>score {post.voteScore} | </span>
                    <span>posted {moment(post.timestamp).fromNow()} by </span>
                    <span className="post-author">{post.author}</span>
                    <span> in </span>
                    <Link className="post-category-link" to={`/${post.category}`}>{categoryName}</Link>
                </div>
                {detailedMode &&
                <div className="post-body">
                    {post.body}
                </div>}
                <div className="post-comments">
                    <Link className="post-permalink" to={`/posts/${post.id}`}>{post.commentCount} comments</Link>
                </div>
            </div>
        </div>;
    }

    /** when we mount the first time, and the post is not yet in the state, this means we come from a bookmark */
    componentWillMount() {
        // console.log('Post::componentWillMount', this.props);
        if (!this.props.post) {
            this.props.dispatchFetchPost(this.props.postId);
        }
    }
}

Post.propTypes = {
    post: PostType,
    postId: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    detailedMode: PropTypes.bool.isRequired,
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
        detailedMode: props.detailedMode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUpVote: (postId) => dispatch(votePostUp(postId)),
        dispatchDownVote: (postId) => dispatch(votePostDown(postId)),
        dispatchFetchPost: (postId) => dispatch(fetchPost(postId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Post);
