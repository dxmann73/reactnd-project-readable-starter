import React from 'react';
import {connect} from 'react-redux';
import './CategoryHeader.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class CategoryHeader extends React.Component {
    render() {
        let {categoryName, categories} = this.props;
        return <div className="category-header">
            <div className="category-teaser">Categories:&nbsp;</div>
            {categories && categories.map(
                cat =>
                    <div className={categoryName === cat.name ? 'category-link-active' : 'category-link'} key={cat.path}>
                        <Link to={'/category/' + cat.path}>{cat.name}</Link>
                    </div>
            )}
        </div>;
    }
}

CategoryHeader.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
                name: PropTypes.string.isRequired,
                path: PropTypes.string.isRequired,
            }
        )),
    categoryName: PropTypes.string.isRequired,
};

/** categories live in the store, but the current category names comes with the router props, to allow for bookmarking */
const mapStateToProps = (state, props) => {
    // console.log('CategoryHeader::mapStateToProps', state, props);
    return {
        categories: state.categories.all,
        categoryName: props.categoryName,
    };
};

export default connect(
    mapStateToProps
)(CategoryHeader);
