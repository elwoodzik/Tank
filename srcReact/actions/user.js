export const setUser = (userObj) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({ type: "SET_USER", payload: userObj })
            resolve();
        })
    }
}