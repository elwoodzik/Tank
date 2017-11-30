export const isFullScreen = (bool) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({ type: "FULLSCREEN", payload: bool })
            resolve();
        })
    }
}

export const setBots = (int) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({ type: "BOTS", payload: int })
            resolve();
        })
    }
}