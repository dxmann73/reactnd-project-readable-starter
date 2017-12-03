import React from 'react';
import {connect} from 'react-redux';
import {PostType} from '../../types/Typedefs';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './Post.css';

class Post extends React.Component {
    render() {
        const {post, detailedMode} = this.props;
        /**
         * Still to implement:
         * "timestamp":1467166872634, TODO use moment from Learn Pure React pg. 51
         * "voteScore":6, TODO show score on post and interact directly, bypassing the post detail view
         * "deleted":false, TODO maybe filter deleted posts
         */
        return <div>
            <div className="post-title">
                <Link className="post-title-link" to={`/${post.category}/${post.id}`}>{post.title}</Link>
            </div>
            <div className="post-subtitle">
                <span>posted {post.timestamp} by </span>
                <span className="post-author">{post.author}</span>
                <span> in category </span>
                <Link className="post-category-link" to={`/${post.category}`}>{post.category}</Link>
            </div>
            {detailedMode && <div className="post-body">
                {post.body}
            </div>}
            <div className="post-controls">
                <Link className="post-permalink" to={`/${post.category}/${post.id}`}>{post.commentCount} comments</Link>
            </div>
        </div>;
    }
}

Post.propTypes = {
    post: PostType,
    detailedMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => {
    // console.log('Post::mapStateToProps', state, props);
    // TODO use normalizr to map categories by path, because the category we get here is the path, but we want to be able to show the category *name*
    // TODO using the path, select for the category here and pass it to props
    return {
        post: props.post,
        detailedMode: props.detailedMode
    };
};

export default connect(mapStateToProps)(Post);