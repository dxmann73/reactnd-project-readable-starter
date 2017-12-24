import React from 'react';
import './PostAdd.css';
import {createPost} from '../../actions/post-actions';
import {connect} from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import {CategoryType} from '../../types/Typedefs';

class PostAdd extends React.Component {
    titleInput;
    categoryInput;
    bodyInput;

    addPost = () => {
        console.log('PostAdd::addPost');
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
        console.log('PostAdd::addPost -- about to add post', post);
        this.props.createPost(post);
        this.resetForm();
    };

    validate = (post) => {
        this.resetErrors();
        let valid = true;
        if (!post.title) {
            // this.titleInput.valid = false; TODO show validation state on field
            this.addError('Please add a title');
            valid = false;
        }
        if (!post.body) {
            this.addError('Please add some content to your post');
            valid = false;
        }
        if (!post.category) {
            this.addError('Internal error: Post needs a category! Please reload the page.');
            valid = false;
        }
        return valid;
    };

    addError = (message) => {
        // TODO actually state should get merged, so no need to use spread, but double check this
        this.setState((prev) => ({
            ...prev,
            errors: [...prev.errors, message]
        }));
    };

    resetForm = () => {
        console.log('PostAdd::resetForm');
        this.resetErrors();
        this.titleInput.value = this.bodyInput.value = '';
    };

    resetErrors = () => {
        this.setState({errors: {}});
    };

    constructor(props) {
        super(props);
        this.state = {errors: []};
    }

    render() {
        // console.log('PostAdd::render', this.props, this.state);
        const {categories, currentCategory} = this.props;
        return <div className="category-add">
            <h4 className="category-add-heading">Add a post:</h4>
            {this.state.errors && this.state.errors.length > 0 &&
            <div className="post-validation-errors">
                <ul>
                    {this.state.errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
            </div>
            }
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
    createPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    // console.log('Post::mapStateToProps', state, props);
    return {
        categories: state.categories.all.filter(c => !!c.path),// 'all' has no path and is not a valid category that users can post in
        currentCategory: state.categories.currentCategory
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(createPost(post)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(PostAdd);