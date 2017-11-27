import React from 'react';
import CategoryHeader from './CategoryHeader';
import CategoryDetails from './CategoryDetails';
import {connect} from 'react-redux';

class Category extends React.Component {
    render() {
        let {categoryName} = this.props;
        return <div className="category-main">
            <CategoryHeader categoryName={categoryName} />
            <CategoryDetails categoryName={categoryName} />
        </div>;
    }
}

const mapStateToProps = (state, props) => {
    // console.log('Category::mapStateToProps ', state, props);
    return {};// no mapping needed for now
};

export default connect(
    mapStateToProps
)(Category);
