import React, {Component} from 'react';
import './Categories.css';

export default class Categories extends Component {
    render() {
        return <div className="categories-header">
            <div className="categories-teaser">Categories:&nbsp;</div>
            <div className="categories-link">all</div>
            <div className="categories-link">newest</div>
            <div className="categories-link">react</div>
        </div>;
    }
}
