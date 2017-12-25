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
import Post from './post/Post';
import {CategoryType, MessageType} from '../types/Typedefs';

class App extends React.Component {
    render() {
        // console.log('App::render', this.props);
        const {categories, messages} = this.props;
        return (
            <div className="app">
                <header className="app-header">
                    <div className="app-header-container">
                        <img src={logo} className="app-logo" alt="logo" />
                    </div>
                    <div className="app-header-container">Welcome to Reddix</div>
                </header>
                {messages && <div className="app-feedback-container">
                    <ul>
                        {messages.map(m => <li key={m.message}>{m.message}</li>)}
                    </ul>
                </div>}
                {categories && <div className="app-main">
                    <Route exact path="/:categoryPath?" render={(props) =>
                        <CategoryView categoryPath={props.match.params.categoryPath || defaultCategory.path} />
                    } />
                    <Route exact path="/posts/:id" render={(props) =>
                        <Post postId={props.match.params.id} detailedMode={true} />
                    } />
                </div>
                }
            </div>
        );
    }

    componentWillMount() {
        this.props.dispatchFetchCategories();
    }
}

App.propTypes = {
    messages: PropTypes.arrayOf(MessageType),
    categories: PropTypes.arrayOf(CategoryType),
    dispatchFetchCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    // console.log('App::mapStateToProps ', state, props);
    return {
        messages: state.feedback.messages,
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
