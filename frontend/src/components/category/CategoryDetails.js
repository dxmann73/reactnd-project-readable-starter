import React from 'react';
import './CategoryDetails.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CategoryType, PostType} from '../../types/Typedefs';
import Post from '../post/Post';

class CategoryDetails extends React.Component {
    render() {
        // console.log('CategoryDetails::render', this.props);
        let {category, posts} = this.props;
        return <div className="category-details">
            <h4 className="category-heading">Posts for category '{category.name}':</h4>
            <ul className="category-posts">
                {posts && posts.map(post =>
                    <li className="posts-item" key={post.id}><Post post={post} detailedMode={false} /></li>
                )}
            </ul>
        </div>;
    }
}

CategoryDetails.propTypes = {
    category: CategoryType,
    posts: PropTypes.arrayOf(PostType),
};

const mapStateToProps = (state, props) => {
    // console.log('CategoryDetails::mapStateToProps', state, props);
    return {
        category: state.categories.currentCategory,
        posts: state.posts.all,
    };
};

export default connect(
    mapStateToProps
)(CategoryDetails);
