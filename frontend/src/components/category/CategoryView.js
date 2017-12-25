import React from 'react';
import CategoryHeader from './CategoryHeader';
import CategoryDetails from './CategoryDetails';
import {connect} from 'react-redux';
import {changeToCategory} from '../../actions/category-actions';
import PropTypes from 'prop-types';
import PostEditCreate from '../post/PostEditCreate';

class CategoryView extends React.Component {

    render() {
        // console.log('CategoryView::render', this.props);
        return <div className="category-main">
            <CategoryHeader />
            <PostEditCreate />
            <CategoryDetails />
        </div>;
    }

    /** this is called when we mount the first time, e.g. when coming from F5 or a bookmark */
    componentWillMount() {
        // console.log('CategoryView::componentWillMount', this.props);
        this.props.dispatchChangeToCategory(this.props.categoryPath);
    }

    /** this is called when the route changes */
    componentWillReceiveProps(props) {
        // console.log('CategoryView::componentWillReceiveProps', props);
        this.props.dispatchChangeToCategory(props.categoryPath);
    }
}

CategoryView.propTypes = {
    categoryPath: PropTypes.string,// can be null for the "all" category
    dispatchChangeToCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
    // console.log('CategoryView::mapStateToProps', state, props);
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
