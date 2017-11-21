import React, {Component} from 'react';
import './Posts.css';

export default class Posts extends Component {
    render() {
        return <div className="posts-view">
            <ul className="posts-list">
                <li className="posts-item">post 1</li>
                <li className="posts-item">post 2</li>
            </ul>
        </div>;
    }
}