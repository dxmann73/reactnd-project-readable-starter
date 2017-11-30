import React from 'react';
import logo from '../logo.svg';
import './App.css';
import CategoryView from './CategoryView';
import {Route} from 'react-router';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCategories} from '../actions/category-actions';
import {defaultCategory} from '../reducers/category-reducers';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <div className="app-header-container">
                        <img src={logo} className="app-logo" alt="logo" />
                    </div>
                    <div className="app-header-container">Welcome to Reddix</div>
                </header>
                <div className="app-main">
                    <Route exact path="/" render={() =>
                        <CategoryView forCategory={defaultCategory} />
                    } />
                    <Route exact path="/:category" render={(props) =>
                        <CategoryView forCategory={{name: props.match.params.category, path: props.match.params.category}} />
                    } />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.initCategories();
    }
}

const mapStateToProps = (state, props) => {
    // console.log('App::mapStateToProps ', state, props);
    return {};// no mapping needed for now
};

const mapDispatchToProps = (dispatch) => {
    return {
        initCategories: () => dispatch(fetchCategories()),
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App));
