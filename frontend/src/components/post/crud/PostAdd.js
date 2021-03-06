import React from 'react';
import './PostCrud.css';
import {createPost} from '../../../actions/post-actions';
import {connect} from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import {CategoryType} from '../../../types/Typedefs';
import {addErrorFeedback, addInfoFeedback, resetFeedback} from '../../../actions/feedback-actions';
import {defaultCategory} from '../../../reducers/category-reducers';
import {goBack} from 'react-router-redux';

class PostAdd extends React.Component {
    authorInput;
    titleInput;
    categoryInput;
    bodyInput;

    addPost = () => {
        const post = {
            id: shortid.generate(),
            timestamp: Date.now(),
            author: this.authorInput.value,
            title: this.titleInput.value,
            body: this.bodyInput.value,
            category: this.categoryInput.value,
        };
        if (!this.validate(post)) {
            return;
        }
        this.props.dispatchCreatePost(post);
        this.resetForm();
        this.props.dispatchAddInfoFeedback('Success! Your post has been created!');
        this.props.dispatchGoBack();
    };

    validate = (post) => {
        this.props.dispatchResetFeedback();
        let valid = true;
        if (!post.author) {
            this.props.dispatchAddErrorFeedback('Please add an author');
            valid = false;
        }
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
        this.authorInput.value = this.titleInput.value = this.bodyInput.value = '';
    };

    render() {
        const {categories, currentCategory, dispatchGoBack} = this.props;
        return <div className="category-add">
            <h4 className="category-add-heading">Add a post:</h4>
            <div className="post-container">
                <input className="post-author-add" type="text" placeholder="Author" ref={(val) => this.authorInput = val} />
                <input className="post-title-add" type="text" placeholder="Post title" ref={(val) => this.titleInput = val} />
                <span className="post-category-span"> in category </span>
                <select className="post-category"
                        value={currentCategory.path || undefined}
                        readOnly={!!currentCategory.path} disabled={!!currentCategory.path}
                        ref={(val) => this.categoryInput = val}>
                    {categories && categories.map(c => <option key={c.path} value={c.path}>{c.name}</option>)}
                </select>
                <textarea className="post-add-body" rows="6" placeholder="Post content" ref={(val) => this.bodyInput = val} />
            </div>
            <div className="post-add-controls">
                <button type="button" title="Add post" onClick={this.addPost}>Add post</button>
                <button type="button" title="Reset" onClick={this.resetForm}>Reset</button>
                <button type="button" title="Cancel" onClick={dispatchGoBack}>Cancel</button>
            </div>
        </div>;
    }
}

PostAdd.propTypes = {
    categories: PropTypes.arrayOf(CategoryType),
    currentCategory: CategoryType,
    dispatchCreatePost: PropTypes.func.isRequired,
    dispatchAddInfoFeedback: PropTypes.func.isRequired,
    dispatchAddErrorFeedback: PropTypes.func.isRequired,
    dispatchResetFeedback: PropTypes.func.isRequired,
    dispatchGoBack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
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
        dispatchGoBack: () => dispatch(goBack()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(PostAdd);
