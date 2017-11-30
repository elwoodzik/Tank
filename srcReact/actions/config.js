export const isPlaying = (bool) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({ type: "IS_PLAYING", payload: bool })
            resolve();
        })
    }
}

