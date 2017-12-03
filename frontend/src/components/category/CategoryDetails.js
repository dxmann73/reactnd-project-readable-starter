import React from 'react';
import './CategoryDetails.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class CategoryDetails extends React.Component {
    render() {
        // console.log('CategoryDetails::render', this.props);
        let {category, posts} = this.props;
        return <div className="category-details">
            <h4 className="category-heading">Posts for category '{category.name}':</h4>
            <ul className="category-posts">
                {posts && posts.map(post =>
                    /**
                     * {"id":"8xf0y6ziyjabvozdd253nd",
                     * "timestamp":1467166872634,
                     * "title":"Udacity is the best place to learn React",
                     * "body":"Everyone says so after all.",
                     * "author":"thingtwo",
                     * "category":"react",
                     * "voteScore":6,
                     * "deleted":false,
                     * "commentCount":2}
                     */
                    <li className="posts-item" key={post.id}>{JSON.stringify(post)}</li>
                )}
            </ul>
        </div>;
    }
}

CategoryDetails.propTypes = {
    category: PropTypes.shape({
            name: PropTypes.string.isRequired,
            path: PropTypes.string,// can be null for the default category
        }
    ),
    posts: PropTypes.arrayOf(
        PropTypes.shape({
                id: PropTypes.string.isRequired,
                timestamp: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                body: PropTypes.string.isRequired,
                author: PropTypes.string.isRequired,
                category: PropTypes.string.isRequired,
                voteScore: PropTypes.number.isRequired,
                deleted: PropTypes.bool.isRequired,
                commentCount: PropTypes.number.isRequired,
            }
        )),
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
