import React from 'react';
import { connect } from 'react-redux';

@connect((store) => {
    return {
        user: store.user.user
    };
})
class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.user) {
            return (
                <div>
                    <img src={this.props.user.picture.data.url} />
                    <div>Witaj {this.props.user.name}</div>
                </div>
            )
        }
        return (
            <div>Jestem HEADER</div>
        )
    };
};

export default Header;