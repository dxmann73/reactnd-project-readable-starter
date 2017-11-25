import React, {Component} from 'react';
import './CategoryDetails.css';

export default class CategoryDetails extends Component {
    render() {
        let {categoryName} = this.props;
        return <div className="category-details">
            <h4 className="category-heading">Posts for category '{categoryName}':</h4>
            <ul className="category-posts">
                <li className="posts-item">post 1</li>
                <li className="posts-item">post 2</li>
            </ul>
        </div>;
    }
}
