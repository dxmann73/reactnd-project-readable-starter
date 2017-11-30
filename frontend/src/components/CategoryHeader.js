import React from 'react';
import {connect} from 'react-redux';
import './CategoryHeader.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class CategoryHeader extends React.Component {
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
        </div>;
    }
}

CategoryHeader.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
                name: PropTypes.string.isRequired,
                path: PropTypes.string,// can be null for the default category
            }
        )),
    currentCategory: PropTypes.shape({
            name: PropTypes.string.isRequired,
            path: PropTypes.string,// can be null for the default category
        }
    ),
};

const mapStateToProps = (state, props) => {
    // console.log('CategoryHeader::mapStateToProps', state, props);
    return {
        categories: state.categories.all,
        currentCategory: state.categories.currentCategory
    };
};

export default connect(
    mapStateToProps
)(CategoryHeader);
