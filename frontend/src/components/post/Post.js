import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {PostType} from '../../types/Typedefs';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './Post.css';
import {deletePost, downVote, upVote} from '../../actions/post-actions';
import VoteControls from '../shared/VoteControls';
import PostTitle from './subcomponents/PostTitle';
import Subtitle from '../shared/Subtitle';
import CrudControls from '../shared/CrudControls';

class Post extends React.Component {
    render() {
        // console.log('Post::render', this.props);
        const {post, categoryName, dispatchUpVote, dispatchDownVote, dispatchRouteToEditPost, dispatchDeletePost} = this.props;
        return <div className="post-main">
            <VoteControls upVoteHandler={() => dispatchUpVote(post.id)} downVoteHandler={() => dispatchDownVote(post.id)} />
            <div className="post-inline">
                <PostTitle post={post} />
                <CrudControls deleteHandler={() => dispatchDeletePost(post.id)}
                              editHandler={() => dispatchRouteToEditPost(post.id)} />
                <Subtitle item={post} category={{path: post.category, name: categoryName}} />
                <div className="post-comments">
                    <Link className="post-permalink" to={`/post-details/${post.id}`}>
                        {post.commentCount ? `see all ${post.commentCount} comments` : `be the first to add a comment`}
                    </Link>
                </div>
            </div>
        </div>;
    }
}

Post.propTypes = {
    post: PostType,
    categoryName: PropTypes.string.isRequired,
    dispatchUpVote: PropTypes.func.isRequired,
    dispatchDownVote: PropTypes.func.isRequired,
    dispatchRouteToEditPost: PropTypes.func.isRequired,
    dispatchDeletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    // console.log('Post::mapStateToProps', state, props);
    const post = state.posts[props.postId];
    const categoryName = (state.categories.byPath && state.categories.byPath[post.category].name) || 'fetching...';
    return {
        post,
        categoryName,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUpVote: (postId) => dispatch(upVote(postId)),
        dispatchDownVote: (postId) => dispatch(downVote(postId)),
        dispatchRouteToEditPost: (postId) => dispatch(push(`/posts/edit/${postId}`)),
        dispatchDeletePost: (postId) => dispatch(deletePost(postId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Post);
