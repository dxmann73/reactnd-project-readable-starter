import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Subtitle.css';
import {Link} from 'react-router-dom';
import {CategoryType, CommentType, PostType} from '../../types/Typedefs';

class Subtitle extends React.Component {
    render() {
        const {timestamp, author, voteScore, commentCount} = this.props.item;// post or comment
        const {category} = this.props;// category (only given for posts)
        return <div className="subtitle-wrapper">
            <span>score {voteScore} | </span>
            <span>posted {moment(timestamp).fromNow()} by </span>
            <span className="subtitle-author">{author}</span>
            {category && <span> in </span>}
            {category && <Link to={`/${category.path}`}>{category.name}</Link>}
            {(commentCount !== 0) && <span> | {commentCount} comments </span>}
        </div>;
    }
}

Subtitle.propTypes = {
    item: PropTypes.oneOfType([PostType, CommentType]).isRequired,
    category: CategoryType,// can be empty, e.g. for comments
};

export default Subtitle;
