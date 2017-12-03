import React from 'react';

import { connect } from 'react-redux';
import { setBots } from '../../actions/options';

@connect((store) => {
    return {
        options: store.options,
    };
})
class Bots extends React.Component {

    constructor(props) {
        super(props);
    }
    
    onChangeBots = (e) => {
        this.props.dispatch(setBots(e.target.value))
    }

    render() {
        return (
            <label>
                <span style={{ fontSize: '25px', display: 'inline-block', width: '70px' }}>Boty:  </span><span style={{ fontSize: '25px', width: '40px', display: 'inline-block' }}>  {this.props.options.bots} </span>
                <input id="test" type="range" value={this.props.options.bots} min="0" max="130" step="1" onChange={this.onChangeBots} />
            </label>
        )
    };
};

export default Bots;