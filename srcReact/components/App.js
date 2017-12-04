import React from 'react';


import Socket from './Socket';
import Game from '../../src/index';

import { connect } from 'react-redux';
import { isPlaying } from '../actions/config';


import Chat from './Chat/Chat';
import Header from './Header/Header';
import Facebook from './Facebook/Facebook';
import GameOptions from './GameOptions/GameOptions';

@connect((store) => {
    return {
        config: store.config,
        options: store.options,
        user: store.user.user,
        accountData: store.accountData.accountData
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

    getConntent() {
        if (this.props.config.isPlaying) {
            return null;
        } else {
            if (this.props.user) {
                return (
                    <div>
                        <Header />
                        <div className="content" style={{ width: '986px', margin: 'auto' }}>
                            <div className="start" style={{ fontSize: '55px', textAlign: 'center' }} onClick={this.onStart}>
                                Start
                            </div>
                            <GameOptions />
                            <Chat socket={this.socket} />
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Header />
                        <Facebook socket={this.socket} />
                    </div>
                )
            }
        }
    }

    render() {
        return (
            this.getConntent()
        )
    };
};

export default App;