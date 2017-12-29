import React from 'react';
import './CategoryDetails.css';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import PropTypes from 'prop-types';
import {CategoryType} from '../../types/Typedefs';
import Post from '../post/Post';

class CategoryDetails extends React.Component {
    render() {
        const {category, postIds, dispatchRouteToAddPost} = this.props;
        return <div className="category-details">
            <h4 className="category-heading">Posts for category '{category.name}':
                <button type="button" className="category-details-add-post-link"
                        onClick={dispatchRouteToAddPost}>Add new post
                </button>
            </h4>
            <ul className="category-posts">
                {postIds && postIds.map(postId =>
                    <li className="posts-item" key={postId}><Post postId={postId} /></li>
                )}
            </ul>
        </div>;
    }
}

CategoryDetails.propTypes = {
    category: CategoryType,
    postIds: PropTypes.arrayOf(PropTypes.string),
    dispatchRouteToAddPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        category: state.categories.currentCategory,
        postIds: state.posts.ids,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchRouteToAddPost: () => dispatch(push('/posts/add')),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryDetails);
