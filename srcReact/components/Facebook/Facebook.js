import React from 'react';
import FacebookLogin from 'react-facebook-login';

import { connect } from 'react-redux';
import { setUser } from '../../actions/user';
import { setAccount } from '../../actions/account';

@connect((store) => {
    return {

    };
})
class Facebook extends React.Component {

    constructor(props) {
        super(props);
    }

    responseFacebook = (response) => {
        if (response) {
            fetch("http://89.76.218.143/login",
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({ user: response })
                }).then((res) => {
                    return res.json();
                }).then((accountData) => {
                    console.log(accountData)
                    this.props.socket.initialize();
                    this.props.dispatch((setUser(response))).then(() => {
                        this.props.dispatch((setAccount(accountData)));
                    });
                })
        }
    }

    render() {
        return (
            <FacebookLogin
                appId="117065765743318"
                autoLoad={false}
                fields="name,email,picture"
                // reAuthenticate={true}
                scope="public_profile,user_friends,user_actions.books"
                callback={this.responseFacebook}
            />
        )
    };
};

export default Facebook;