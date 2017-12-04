import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import config from './config';
import options from './options';
import user from './user';
import accountData from './account';

export default combineReducers({
    config,
    options,
    user,
    accountData,
    routing: routerReducer
})