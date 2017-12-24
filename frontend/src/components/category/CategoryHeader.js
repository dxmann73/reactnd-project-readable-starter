import React from 'react';
import {connect} from 'react-redux';
import './CategoryHeader.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {CategoryType} from '../../types/Typedefs';
import {ORDER_BY_SCORE_HIGHEST_FIRST, ORDER_BY_SCORE_LOWEST_FIRST, ORDER_NEWEST_FIRST, reorderPosts} from '../../actions/post-actions';

class CategoryHeader extends React.Component {
    sort = (sortMethod) => {
        // console.log('CategoryHeader::sort', sortMethod.target.value);
        this.props.dispatchReorderPosts(sortMethod.target.value);
    };

    render() {
        // console.log('CategoryHeader::render', this.props);
        let {currentCategory, categories} = this.props;
        return <div className="category-header">
            <div className="category-teaser">Categories:&nbsp;</div>
            {categories && categories.map(
                cat =>
                    <div className={currentCategory.path === cat.path ? 'category-link-active' : 'category-link'} key={cat.path}>
                        <Link to={'/' + (cat.path || '')}>{cat.name}</Link>
                    </div>
            )}
            <div className="category-sort">
                <span>sort by</span>
                <select ref={(val) => this.categoryInput = val} onChange={(val) => this.sort(val)}>
                    <option value={ORDER_NEWEST_FIRST}>newest</option>
                    <option value={ORDER_BY_SCORE_HIGHEST_FIRST}>top score</option>
                    <option value={ORDER_BY_SCORE_LOWEST_FIRST}>bottom score</option>
                </select>
            </div>
        </div>;
    }
}

CategoryHeader.propTypes = {
    categories: PropTypes.arrayOf(CategoryType),
    currentCategory: CategoryType,
    dispatchReorderPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    // console.log('CategoryHeader::mapStateToProps', state, props);
    return {
        categories: state.categories.all,
        currentCategory: state.categories.currentCategory
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchReorderPosts: (sortMethod) => dispatch(reorderPosts(sortMethod))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryHeader);
