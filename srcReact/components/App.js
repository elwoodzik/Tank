import React from 'react';
import { connect } from 'react-redux';



import Chat from './Chat/Chat';
import Header from './Header/Header';


import Menu from './Menu/Menu';

@connect((store) => {
    return {
        config: store.config,
        user: store.user.user,
    };
})
class App extends React.Component {

    constructor(props) {
        super(props);

    }



    getConntent() {
        if (this.props.config.isPlaying) {
            return null;
        } else {
            return (
                <div className="container">
                    <Header socket={this.props.route.socket} />
                    <div style={{ "clear": "both" }}></div>
                    <div className="content">
                        <Menu />
                        {this.props.children}
                        {/* <div className="start" style={{ fontSize: '55px', textAlign: 'center' }} onClick={this.onStart}>
                                Start
                        </div>
                          
                            <Chat socket={this.socket} /> */}
                    </div>
                </div>
            )

            // if (this.props.user) {

            // } else {
            //     return (
            //         <div>
            //             <Header />
            //             
            //         </div>
            //     )
            // }
        }
    }

    render() {
        return (
            this.getConntent()
        )
    };
};

export default App;