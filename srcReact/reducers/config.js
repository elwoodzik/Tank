const reducer = (state = {
    isPlaying: false
}, action) => {
    switch (action.type) {
        case "IS_PLAYING": {
            return { ...state, isPlaying: action.payload }
        }
    }
    return state;
}

export default reducer;


