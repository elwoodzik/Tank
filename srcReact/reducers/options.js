const reducer = (state = {
    fullScreen: false,
    bots: 30
}, action) => {
    switch (action.type) {
        case "FULLSCREEN": {
            return { ...state, fullScreen: action.payload }
        }
        case "BOTS": {
            return { ...state, bots: action.payload }
        }
    }
    return state;
}

export default reducer;


