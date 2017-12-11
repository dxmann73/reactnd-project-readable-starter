import React from 'react';
import './CategoryDetails.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CategoryType} from '../../types/Typedefs';
import Post from '../post/Post';

class CategoryDetails extends React.Component {
    render() {
        // console.log('CategoryDetails::render', this.props);
        let {category, postIds} = this.props;
        return <div className="category-details">
            <h4 className="category-heading">Posts for category '{category.name}':</h4>
            <ul className="category-posts">
                {postIds && postIds.map(postId =>
                    <li className="posts-item" key={postId}><Post postId={postId} detailedMode={false} /></li>
                )}
            </ul>
        </div>;
    }
}

CategoryDetails.propTypes = {
    category: CategoryType,
    postIds: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = (state, props) => {
    // console.log('CategoryDetails::mapStateToProps', state, props);
    return {
        category: state.categories.currentCategory,
        postIds: state.posts.ids,
    };
};

export default connect(
    mapStateToProps
)(CategoryDetails);
