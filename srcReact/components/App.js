import React from 'react';
import Game from '../../src/index';

import { connect } from 'react-redux';
import { isPlaying } from '../actions/config';

@connect((store) => {
    return {
        config: store.config
    };
})
class App extends React.Component {

    constructor(props) {
        super(props);
    }

    onStart = (e) => {
        this.props.dispatch(isPlaying(true)).then(() => {
            new Game();

            const canvas = document.querySelector('canvas');
            const req = canvas.requestFullScreen || canvas.webkitRequestFullScreen || canvas.mozRequestFullScreen || canvas.msRequestFullScreen;

            if (req) { // Native full screen.
                req.call(canvas);
            }
        })
    }

    render() {
        return (
            <div className="ss" style={{ fontSize: '55px', textAlign: 'center' }} onClick={this.onStart}>
                {!this.props.config.isPlaying ? 'Start' : null}
            </div>
        )
    };
};

export default App;