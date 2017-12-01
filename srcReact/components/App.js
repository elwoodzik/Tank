import React from 'react';
import FacebookLogin from 'react-facebook-login';

import Socket from './Socket';
import Game from '../../src/index';

import { connect } from 'react-redux';
import { isPlaying } from '../actions/config';
import { isFullScreen, setBots } from '../actions/options';
import Chat from './Chat/Chat';

@connect((store) => {
    return {
        config: store.config,
        options: store.options
    };
})
class App extends React.Component {

    constructor(props) {
        super(props);

        this.socket = new Socket();
    }

    onStart = (e) => {
        this.props.dispatch(isPlaying(true)).then(() => {
            new Game(this.props.options, this.socket);

            if (this.props.options.fullScreen) {
                const canvas = document.querySelector('canvas');
                const req = canvas.requestFullScreen || canvas.webkitRequestFullScreen || canvas.mozRequestFullScreen || canvas.msRequestFullScreen;

                if (req) { // Native full screen.
                    req.call(canvas);
                }
            }
        })
    }

    onFullscreen = (e) => {
        this.props.dispatch(isFullScreen(e.target.checked))
    }

    onChangeBots = (e) => {
        this.props.dispatch(setBots(e.target.value))
    }

    responseFacebook(response) {
        console.log(response);
    }

    render() {
        return (
            !this.props.config.isPlaying
                ? <div className="content" style={{ width: '986px', margin: 'auto' }}>
                    <div className="start" style={{ fontSize: '55px', textAlign: 'center' }} onClick={this.onStart}>
                        Start
                    </div>
                    <div className="options">
                        <label>
                            <span style={{ fontSize: '25px' }}> Pełny ekran </span>
                            <input type="checkbox" onChange={this.onFullscreen} />
                        </label>
                        <br />
                        <label>
                            <span style={{ fontSize: '25px', display: 'inline-block', width: '70px' }}>Boty:  </span><span style={{ fontSize: '25px', width: '40px', display: 'inline-block' }}>  {this.props.options.bots} </span>
                            <input id="test" type="range" value={this.props.options.bots} min="0" max="130" step="1" onChange={this.onChangeBots} />
                        </label>
                    </div>
                    <Chat socket={this.socket} />
                    <FacebookLogin
                        appId="117065765743318"
                        autoLoad={true}
                        fields="name,email,picture"
                        scope="public_profile,user_friends,user_actions.books"
                        callback={this.responseFacebook}
                    />
                </div>
                : null
        )
    };
};

export default App;