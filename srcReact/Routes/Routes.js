import React from 'react';
import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router';


import Socket from '../components/Socket';
import App from '../components/App';
import Home from '../components/Pages/Home/Home';
import Play from '../components/Pages/Play/Play';
import Options from '../components/Pages/Options/Options';

const socket = new Socket();

const Routes = (
    <Route component={App} socket={socket}>
        <Route path="/" component={Home} socket={socket} />
        <Route path="/play" component={Play} socket={socket} />
        <Route path="/options" component={Options} socket={socket} />
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