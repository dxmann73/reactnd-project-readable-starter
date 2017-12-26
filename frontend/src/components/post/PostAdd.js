import React from 'react';
import './PostAdd.css';
import {createPost} from '../../actions/post-actions';
import {connect} from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import {CategoryType} from '../../types/Typedefs';
import {addErrorFeedback, addInfoFeedback, resetFeedback} from '../../actions/feedback-actions';
import {defaultCategory} from '../../reducers/category-reducers';

class PostAdd extends React.Component {
    titleInput;
    categoryInput;
    bodyInput;

    addPost = () => {
        const post = {
            id: shortid.generate(),
            timestamp: Date.now(),
            title: this.titleInput.value,
            body: this.bodyInput.value,
            author: 'frontend',
            category: this.categoryInput.value,
        };
        if (!this.validate(post)) {
            return;
        }
        this.props.dispatchCreatePost(post);
        this.resetForm();
        this.props.dispatchAddInfoFeedback('Success! Your post has been created!');
    };

    validate = (post) => {
        this.props.dispatchResetFeedback();
        let valid = true;
        if (!post.title) {
            this.props.dispatchAddErrorFeedback('Please add a title');
            valid = false;
        }
        if (!post.body) {
            this.props.dispatchAddErrorFeedback('Please add some content to your post');
            valid = false;
        }
        return valid;
    };

    resetForm = () => {
        this.props.dispatchResetFeedback();
        this.titleInput.value = this.bodyInput.value = '';
    };

    render() {
        // console.log('PostAdd::render', this.props, this.state);
        const {categories, currentCategory} = this.props;
        return <div className="category-add">
            <h4 className="category-add-heading">Add a post:</h4>
            <div className="post-container">
                <input id="postTitle" className="post-title" type="text" placeholder="Post title" ref={(val) => this.titleInput = val} />
                <span className="post-category-span"> in category </span>
                <select id="postCategory" className="post-category"
                        value={currentCategory.path || undefined}
                        readOnly={!!currentCategory.path} disabled={!!currentCategory.path}
                        ref={(val) => this.categoryInput = val}>
                    {categories && categories.map(c => <option key={c.path} value={c.path}>{c.name}</option>)}
                </select>
                <textarea id="postBody" className="post-add-body" rows="6" placeholder="Post content" ref={(val) => this.bodyInput = val} />
            </div>
            <div className="post-add-controls">
                <button type="button" title="Add post" onClick={() => this.addPost()}>Add post</button>
                <button type="button" title="Reset" onClick={() => this.resetForm()}>Reset</button>
            </div>
        </div>;
    }
}

PostAdd.propTypes = {
    categories: PropTypes.arrayOf(CategoryType),
    currentCategory: CategoryType,
    dispatchCreatePost: PropTypes.func.isRequired,
    dispatchAddErrorFeedback: PropTypes.func.isRequired,
    dispatchResetFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    // console.log('Post::mapStateToProps', state, props);
    return {
        categories: state.categories.all.filter(c => !!c.path),// 'all' has no path and is not a valid category that users can post in
        currentCategory: state.categories.currentCategory || defaultCategory, // can be undefined when user bookmarks it
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchCreatePost: (post) => dispatch(createPost(post)),
        dispatchAddInfoFeedback: (msg) => dispatch(addInfoFeedback(msg)),
        dispatchAddErrorFeedback: (msg) => dispatch(addErrorFeedback(msg)),
        dispatchResetFeedback: () => dispatch(resetFeedback()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(PostAdd);
