import React from 'react';
import CategoryHeader from './CategoryHeader';
import CategoryDetails from './CategoryDetails';
import {connect} from 'react-redux';
import {changeToCategory} from '../actions/index';

class CategoryView extends React.Component {

    render() {
        // console.log('CategoryView::render', this.props);
        return <div className="category-main">
            <CategoryHeader />
            <CategoryDetails />
        </div>;
    }

    /** this is called when we mount the first time, e.g. when coming from F5 or a bookmark */
    componentWillMount() {
        console.log('CategoryView::componentWillMount', this.props);
        this.props.initCategory(this.props.forCategory);
    }

    /** this is called when the route changes */
    componentWillReceiveProps(props) {
        console.log('CategoryView::componentWillReceiveProps', props);
        this.props.initCategory(props.forCategory);
    }
}

const mapStateToProps = (state, props) => ({
    forCategory: props.forCategory
});

const mapDispatchToProps = (dispatch) => ({
    initCategory: (categoryName) => dispatch(changeToCategory(categoryName)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps)(CategoryView);
