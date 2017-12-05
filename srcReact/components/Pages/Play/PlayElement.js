import React from 'react';
import { connect } from 'react-redux';

import { isPlaying } from '../../../actions/config';
import Game from '../../../../src/index';

@connect((store) => {
    return {
        options: store.options,
    };
})
class PlayElement extends React.Component {

    constructor(props) {
        super(props);
    }

    onElementClick = (e) => {
        e.preventDefault();
        if (!this.props.data.disabled) {
            this.props.dispatch(isPlaying(true)).then(() => {
                new Game(this.props.options, this.props.socket);

                if (this.props.options.fullScreen) {
                    const canvas = document.querySelector('canvas');
                    const req = canvas.requestFullScreen || canvas.webkitRequestFullScreen || canvas.mozRequestFullScreen || canvas.msRequestFullScreen;

                    if (req) { // Native full screen.
                        req.call(canvas);
                    }
                }
            })
        }
    }

    render() {
        return (
            <div className="flex-item" onClick={this.onElementClick}>
                <img src={this.props.data.img} />
                <div className="signature">
                    <p className="title">{this.props.data.title}</p>
                    <p className="description">{this.props.data.description}</p>
                </div>
            </div>
        )
    };
};

export default PlayElement;