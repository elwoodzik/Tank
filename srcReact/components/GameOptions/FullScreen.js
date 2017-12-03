import React from 'react';

import { connect } from 'react-redux';
import { isFullScreen } from '../../actions/options';

@connect((store) => {
    return {
        
    };
})
class FullScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    onFullscreen = (e) => {
        this.props.dispatch(isFullScreen(e.target.checked))
    }

    render() {
        return (
            <label>
                <span style={{ fontSize: '25px' }}> Pełny ekran </span>
                <input type="checkbox" onChange={this.onFullscreen} />
            </label>
        )
    };
};

export default FullScreen;