import React from 'react';
import { connect } from 'react-redux';
import Facebook from '../Facebook/Facebook';

@connect((store) => {
    return {
        user: store.user.user,
        accountData: store.accountData.accountData
    };
})
class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.user) {
            return (
                <div className="header">
                    <div className="portrait">
                        <img src={this.props.user.picture.data.url} />
                    </div>
                    <div className="signature">Witaj, <br /> {this.props.user.name}</div>
                    <div className="gold">kasiora: {this.props.accountData.resources.gold}</div>
                    <div className="diamonds">diamenciory: {this.props.accountData.resources.diamonds}</div>
                </div>
            )
        }
        return (
            <div className="header">
                <Facebook socket={this.props.socket} />
            </div>
        )
    };
};

export default Header;