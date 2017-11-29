import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { browserHistory, IndexRedirect, IndexRoute } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'

import reducer from "./reducers";

const middleware = applyMiddleware(promise(), thunk, routerMiddleware(browserHistory));

const initialData = {};

export default createStore(reducer, initialData, middleware);