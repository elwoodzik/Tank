import React from 'react';

import { connect } from 'react-redux';
import Bots from './Bots';
import FullScreen from './FullScreen';

@connect((store) => {
    return {

    };
})
class GameOptions extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="options">
                <FullScreen />
                <br />
                <Bots />
            </div>
        )
    };
};

export default GameOptions;