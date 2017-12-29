import React from 'react';
import logo from '../logo.svg';
import './App.css';
import CategoryView from './category/CategoryView';
import {Route} from 'react-router';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchCategories} from '../actions/category-actions';
import {defaultCategory} from '../reducers/category-reducers';
import PostDetails from './post/PostDetails';
import {CategoryType} from '../types/Typedefs';
import Feedback from './feedback/Feedback';
import PostAdd from './post/crud/PostAdd';
import CategoryHeader from './category/CategoryHeader';
import PostEdit from './post/crud/PostEdit';

class App extends React.Component {
    render() {
        const {categories} = this.props;
        return (
            <div className="app">
                <header className="app-header">
                    <div className="app-header-container">
                        <img src={logo} className="app-logo" alt="logo" />
                    </div>
                    <div className="app-header-container">Welcome to Reddix</div>
                </header>
                <div className="app-feedback-container">
                    <Feedback />
                </div>
                {categories && <div className="app-main">
                    <Route exact path="/:categoryPath?" render={(props) =>
                        <CategoryView categoryPath={props.match.params.categoryPath || defaultCategory.path} />
                    } />
                    <Route exact path="/post-details/:id" render={(props) =>
                        <div className="category-main">
                            <CategoryHeader />
                            <PostDetails postId={props.match.params.id} />
                        </div>
                    } />
                    <Route exact path="/posts/add" render={(props) =>
                        <div className="category-main">
                            <CategoryHeader />
                            <PostAdd />
                        </div>
                    } />
                    <Route exact path="/posts/edit/:id" render={(props) =>
                        <div className="category-main">
                            <CategoryHeader />
                            <PostEdit postId={props.match.params.id} />
                        </div>
                    } />
                </div>
                }
            </div>
        );
    }

    componentWillMount() {
        this.props.dispatchFetchCategories();// app init => can't really do anything without the categories
    }
}

App.propTypes = {
    categories: PropTypes.arrayOf(CategoryType),
    dispatchFetchCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories.all,// we don't actually need them here, but want to wait for them to appear before we render the children
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchFetchCategories: () => dispatch(fetchCategories()),
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App));
