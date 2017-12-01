import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import config from './config';
import options from './options';
import user from './user';

export default combineReducers({
    config,
    options,
    user,
    routing: routerReducer
})