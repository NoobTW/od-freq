import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import List from './List';
import dApp from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
	dApp,
	applyMiddleware(thunk)
  );

ReactDOM.render((
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Route exact path={`${process.env.PUBLIC_URL}/`} component={List} />
				{/* <Route exact path="/" component={Home} /> */}
				<Route exact path={`${process.env.PUBLIC_URL}/treemap/:year/:month`} component={App} />
				<Route exact path={`${process.env.PUBLIC_URL}/treemap/:year/:month/:city`} component={App} />
				<Route exact path={`${process.env.PUBLIC_URL}/treemap/:year/:month/:city/:bureau`} component={App} />
				</div>
		</BrowserRouter>
	</Provider>
), document.getElementById('root'));
registerServiceWorker();
