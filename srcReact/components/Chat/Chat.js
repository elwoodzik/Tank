import React from 'react';
import { connect } from 'react-redux';
 
@connect((store) => {
return {
 
};
})
class Chat extends React.Component {
    
    state = {
        chatTexts: []
    }

    constructor(props){
        super(props);

        this.props.socket.onSocket("chatMessage", this.receiveMessage);
    }

    onButtonClick = (e)=>{
        const textField = document.querySelector('.chat-text-input');
        
        if(textField.value.trim() !== ''){
            this.props.socket.emit('chatMessage', textField.value);
            const chatTexts = this.state.chatTexts;
            chatTexts.unshift(`Ja: ${textField.value}`);
    
            this.setState({
                chatTexts: chatTexts
            })
        }

        textField.value= '';
    }

    onEnter = (e) => {
        if (e.key === 'Enter') {
            const textField = document.querySelector('.chat-text-input');
            
            if(textField.value.trim() !== ''){
                this.props.socket.emit('chatMessage', textField.value);
                const chatTexts = this.state.chatTexts;
                chatTexts.unshift(`Ja: ${textField.value}`);
        
                this.setState({
                    chatTexts: chatTexts
                })
            }
            textField.value= '';
        }
    } 

    receiveMessage = (msg) =>{
        const chatTexts = this.state.chatTexts;
        chatTexts.push(`Ktoś: ${msg}`);

        this.setState({
            chatTexts: chatTexts
        })
    }

    renderChatText(){
        return this.state.chatTexts.map((text, index)=>{
            return <p key={index}> {text} </p>
        })
    }
 
    render(){
        return (
            <div className="chat-container" style={{ position:'relative'}}>
                <div className="chat-content" style={{  width: '500px', height: '400px', overflow: 'auto', border: '1px solid black'}}>
                {this.renderChatText()}   
                </div>
                <input className="chat-text-input" type="text" style={{ width: '470px'}} onKeyPress={this.onEnter}/>
                <button onClick={this.onButtonClick} > OK </button>
            </div>
        )
    };

};
 
export default Chat;