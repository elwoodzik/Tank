import Socket from '../components/Socket';

const reducer = (state = {
    fullScreen: false,
    bots: 30,
    socket: new Socket()
}, action) => {
    switch (action.type) {
        case "FULLSCREEN": {
            return { ...state, fullScreen: action.payload }
        }
        case "BOTS": {
            return { ...state, bots: action.payload }
        }
        case "SOCKET": {
            return { ...state, socket: action.payload }
        }
    }
    return state;
}

export default reducer;


