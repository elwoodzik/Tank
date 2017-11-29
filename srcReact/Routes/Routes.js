import React from 'react';
import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router';

import App from '../components/App';

const Routes = (
    <Route component={App}>
        <Route path="/" component={App} />
        {/*<Route path="/stacje-radiowe" component={Site} />
        <Route path="/stacje-radiowe/:slug" component={Site} />
        <Route path="/kanaly" component={Site} />
        <Route path="/kanaly/:slug" component={Site} />
        <Route path="/stacje-lokalne" component={Site} />
        <Route path="/stacje-lokalne/:slug" component={Site} />
        <Route path="/stacje-zagraniczne" component={Site} />
        <Route path="/stacje-zagraniczne/:slug" component={Site} />
        <Route path="/video" component={Site} /> */}
        {/* <Route path="/wyszukiwarka" component={Search} />
        <Route path="*" component={Site} /> */}
    </Route>
)

export default Routes;