import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';
import Category from './Category';
import {Route} from 'react-router-dom';

class App extends Component {
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
                    <Route exact path="/" render={
                        (props) => <Category categoryName={'all'} />} />
                    <Route exact path="/category/:categoryName" render={
                        (props) => <Category categoryName={props.match.params.categoryName} />} />
                </div>
            </div>
        );
    }
}

export default App;
