import React from 'react';
import CategoryHeader from './CategoryHeader';
import CategoryDetails from './CategoryDetails';
import {connect} from 'react-redux';
import {changeToCategory} from '../../actions/category-actions';
import PropTypes from 'prop-types';

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
        // console.log('CategoryView::componentWillMount', this.props);
        this.props.initCategory(this.props.forCategory);
    }

    /** this is called when the route changes */
    componentWillReceiveProps(props) {
        // console.log('CategoryView::componentWillReceiveProps', props);
        this.props.initCategory(props.forCategory);
    }
}

CategoryView.propTypes = {
    forCategory: PropTypes.shape({
            name: PropTypes.string.isRequired,
            path: PropTypes.string,// can be null for the default category
        }
    ),
};

const mapStateToProps = (state, props) => {
    // console.log('CategoryHeader::render', this.props);
    return {forCategory: props.forCategory};
};

const mapDispatchToProps = (dispatch) => ({
    initCategory: (category) => dispatch(changeToCategory(category, dispatch)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps)(CategoryView);
