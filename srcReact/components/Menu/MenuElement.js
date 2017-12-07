import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

@connect((store) => {
    return {

    };
})
class MenuElement extends React.Component {

    constructor(props) {
        super(props);
    }

    onClickElement = (e) => {
        e.preventDefault();
    
        const elements = document.querySelectorAll('.menu li');
        elements.forEach(element => {
            element.classList.remove('active');
        });
        
        e.target.classList.add('active');

        if (this.props.page.toLowerCase() === 'home') {
            this.props.dispatch(push(`/`));
        } else {
            this.props.dispatch(push(`/${this.props.page.toLowerCase()}`));
        }
    }

    render() {
        return (
            <li onClick={this.onClickElement}><span>{this.props.page}</span></li>
        )
    };
};

export default MenuElement;