import React from 'react';
import FacebookLogin from 'react-facebook-login';

import { connect } from 'react-redux';
import { setUser } from '../../actions/user';

@connect((store) => {
    return {

    };
})
class Facebook extends React.Component {

    constructor(props) {
        super(props);
    }

    responseFacebook = (response) => {
        console.log(response)
        this.props.socket.initialize();
        if (response) {
            this.props.dispatch((setUser(response)));
        }
    }

    render() {
        return (
            <FacebookLogin
                appId="117065765743318"
                autoLoad={false}
                fields="name,email,picture"
                reAuthenticate={true}
                scope="public_profile,user_friends,user_actions.books"
                callback={this.responseFacebook}
            />
        )
    };
};

export default Facebook;