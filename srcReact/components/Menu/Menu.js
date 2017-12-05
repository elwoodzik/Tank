import React from 'react';
import { connect } from 'react-redux';

import MenuElement from './MenuElement';

@connect((store) => {
    return {

    };
})
class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.menuList = ['HOME', 'PLAY', 'OPTIONS'];
    }

    render() {
        return (
            <ul className="menu">
                {
                    this.menuList.map((page) => {
                        return <MenuElement key={page} page={page} />
                    })
                }
            </ul>
        )
    };
};

export default Menu;