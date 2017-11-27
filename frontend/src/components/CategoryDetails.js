import React from 'react';
import './CategoryDetails.css';
import {connect} from 'react-redux';

class CategoryDetails extends React.Component {
    render() {
        // console.log('CategoryDetails::render', this.props);
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

const mapStateToProps = (state, props) => {
    // console.log('CategoryDetails::mapStateToProps', state, props);
    return {
        categoryName: state.categories.currentCategoryName
    };
};

export default connect(
    mapStateToProps
)(CategoryDetails);
