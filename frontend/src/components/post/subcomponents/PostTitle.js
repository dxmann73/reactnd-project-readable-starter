import React from 'react';
import './PostTitle.css';
import {PostType} from '../../../types/Typedefs';
import {Link} from 'react-router-dom';

class PostTitle extends React.Component {
    render() {
        const {id, title} = this.props.post;
        return <div className="post-title">
            <Link className="post-title-link" to={`/post-details/${id}`}>{title}</Link>
        </div>;
    }
}

PostTitle.propTypes = {
    post: PostType,
};

export default PostTitle;