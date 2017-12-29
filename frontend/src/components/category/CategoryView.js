import React from 'react';
import CategoryHeader from './CategoryHeader';
import CategoryDetails from './CategoryDetails';
import {connect} from 'react-redux';
import {changeToCategory} from '../../actions/category-actions';
import PropTypes from 'prop-types';

class CategoryView extends React.Component {

    render() {
        return <div className="category-main">
            <CategoryHeader showSort={true} />
            <CategoryDetails />
        </div>;
    }

    componentWillMount() {
        this.props.dispatchChangeToCategory(this.props.categoryPath);// support F5 and bookmarked post URLs
    }

    componentWillReceiveProps(props) {
        this.props.dispatchChangeToCategory(props.categoryPath);// on route changes within the same component
    }
}

CategoryView.propTypes = {
    categoryPath: PropTypes.string,// can be null for the "all" category
    dispatchChangeToCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    return {
        categoryPath: props.categoryPath,
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatchChangeToCategory: (categoryPath) => dispatch(changeToCategory(categoryPath, dispatch)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(CategoryView);
