import React from 'react';
import {connect} from 'react-redux';
import {PostType} from '../../types/Typedefs';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Link} from 'react-router-dom';
import './Post.css';
import {votePostUp} from '../../actions/post-actions';

class Post extends React.Component {
    render() {
        const {post, categoryName, detailedMode, upVote} = this.props;
        /**
         * Still to implement:
         * "voteScore":6, TODO show score on post and interact directly, bypassing the post detail view
         */
        return <div className="post-main">
            <div className="post-vote-controls">
                <div>
                    <button type="button" className="post-vote-button post-vote-button-up" title="vote up"
                            onClick={() => upVote(post.id)}>+
                    </button>
                </div>
                <div>
                    <button type="button" className="post-vote-button" title="vote down"
                    >-
                    </button>
                </div>
            </div>
            <div className="post-main">
                <div className="post-title">
                    <Link className="post-title-link" to={`/${post.category}/${post.id}`}>{post.title}</Link>
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
                <div className="post-controls">
                    <Link className="post-permalink" to={`/${post.category}/${post.id}`}>{post.commentCount} comments</Link>
                </div>
            </div>
        </div>;
    }
}

Post.propTypes = {
    post: PostType,
    categoryName: PropTypes.string.isRequired,
    detailedMode: PropTypes.bool.isRequired,
    upVote: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    // console.log('Post::mapStateToProps', state, props);
    const categoryName = (state.categories.byPath && state.categories.byPath[props.post.category].name) || 'fetching...';
    return {
        post: props.post,
        categoryName: categoryName,
        detailedMode: props.detailedMode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        upVote: (postId) => dispatch(votePostUp(postId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Post);
