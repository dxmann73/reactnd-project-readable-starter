import React, {Component} from 'react';
import CategoryHeader from './CategoryHeader';
import CategoryDetails from './CategoryDetails';

export default class Category extends Component {
    render() {
        let {categoryName} = this.props;
        return <div className="category-main">
            <CategoryHeader categoryName={categoryName} />
            <CategoryDetails categoryName={categoryName} />
        </div>;
    }
}
