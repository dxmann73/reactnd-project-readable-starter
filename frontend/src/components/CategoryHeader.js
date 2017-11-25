import React, {Component} from 'react';
import './CategoryHeader.css';
import {Link} from 'react-router-dom';

export default class CategoryHeader extends Component {
    render() {
        let {categoryName} = this.props;
        let categories = ['all', 'newest', 'react'];
        return <div className="category-header">
            <div className="category-teaser">Categories:&nbsp;</div>
            {categories.map(
                cat =>
                    <div className={categoryName === cat ? 'category-link-active' : 'category-link'} key={cat}>
                        <Link to={"/category/" + cat}>{cat}</Link>
                    </div>
            )}
        </div>;
    }
}
