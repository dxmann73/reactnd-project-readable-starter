import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';
import Categories from './Categories';
import Posts from './Posts';

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
                    <Categories />
                    <Posts />
                </div>
            </div>
        );
    }
}

export default App;
