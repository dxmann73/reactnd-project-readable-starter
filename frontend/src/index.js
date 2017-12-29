import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerMiddleware, routerReducer} from 'react-router-redux';

import './index.css';
import App from './components/App';
import reducers from './reducers';

// As per https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
const history = createHistory();
const reduxRouterMiddleware = routerMiddleware(history);

// enable redux devtools chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        ...reducers,
        routerReducer
    }),
    composeEnhancers(
        applyMiddleware(thunk),
        applyMiddleware(reduxRouterMiddleware)
    )
);

/** App is wrapped in react store provider; redux router has access to the store */
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
