import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import config from './config';
import options from './options';

export default combineReducers({
    config,
    options,
    routing: routerReducer
})