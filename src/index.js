import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { Router, Route, browserHistory } from 'react-router';
import Animals from './components/animals/animals';
import './global.css';
import defaultReducer from './store/reducers';

const logger = createLogger();
const devtoolsMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(defaultReducer, devtoolsMiddleware, applyMiddleware(promiseMiddleware, logger, thunk));

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Animals}/>
		</Router>
	</Provider>,
	document.getElementById('root')
);
