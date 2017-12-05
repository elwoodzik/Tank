import React from 'react';
import { connect } from 'react-redux';

import GameOptions from '../../GameOptions/GameOptions';

@connect((store) => {
    return {

    };
})
class Options extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GameOptions />
        )
    };
};

export default Options;