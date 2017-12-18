import React from 'react';
import './PostAdd.css';

class PostAdd extends React.Component {
    titleInput;
    categoryInput;
    bodyInput;

    constructor(props) {
        super(props);
        this.state = {errors: []};
    }

    render() {
        console.log('PostAdd::render', this.props, this.state);
        return <div className="category-add">
            <h4>Add a post:</h4>
            {this.state.errors && this.state.errors.length > 0 &&
            <div className="post-validation-errors">
                <ul>
                    {this.state.errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
            </div>
            }
            <div className="post-container">
                <input id="postTitle" className="post-title" type="text" placeholder="Post title" ref={(val) => this.titleInput = val} />
                <input id="postCategory" className="post-category" type="text" placeholder="Category path" ref={(val) => this.categoryInput = val} />
                <textarea id="postBody" className="post-body" rows="6" placeholder="Post content" ref={(val) => this.bodyInput = val} />
            </div>
            <div className="post-add-controls">
                <button type="button" title="Add post" onClick={() => this.addPost()}>Add post</button>
                <button type="button" title="Reset" onClick={() => this.resetForm()}>Reset</button>
            </div>
        </div>;
    }

    addPost = () => {
        console.log('PostAdd::addPost');
        const post = {
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
        // TODO API call
        this.resetForm();
    };

    validate = (post) => {
        this.resetErrors();
        let valid = true;
        if (!post.title) {
            // this.titleInput.valid = false; TODO show validation state on field
            this.setState((prev) => ({
                errors: [...prev.errors, 'Please add a title']
            }));
            valid = false;
        }
        if (!post.body) {
            this.setState((prev) => ({
                errors: [...prev.errors, 'Please add some content to your post']
            }));
            valid = false;
        }
        if (!post.category) {
            this.setState((prev) => ({
                errors: [...prev.errors, 'Internal error: Post needs a category! Please reload the page.']
            }));
            valid = false;
        }
        return valid;
    };

    resetForm = () => {
        console.log('PostAdd::resetForm');
        this.resetErrors();
        this.titleInput.value = this.bodyInput.value = this.categoryInput.value = '';
    };

    resetErrors = () => {
        this.setState({errors: {}});
    };
}

export default PostAdd;