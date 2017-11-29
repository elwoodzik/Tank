import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import config from './config';

export default combineReducers({
    config,
    routing: routerReducer
})