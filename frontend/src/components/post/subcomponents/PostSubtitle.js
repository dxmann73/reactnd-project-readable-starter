import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './PostSubtitle.css';
import {PostType} from '../../../types/Typedefs';
import {Link} from 'react-router-dom';

class PostSubtitle extends React.Component {
    render() {
        const {voteScore, timestamp, author, category} = this.props.post;
        return <div className="post-subtitle">
            <span>score {voteScore} | </span>
            <span>posted {moment(timestamp).fromNow()} by </span>
            <span className="post-author">{author}</span>
            <span> in </span>
            <Link to={`/${category}`}>{this.props.categoryName}</Link>
        </div>;
    }
}

PostSubtitle.propTypes = {
    post: PostType,
    categoryName: PropTypes.string.isRequired,
};

export default PostSubtitle;