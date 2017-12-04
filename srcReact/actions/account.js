export const setAccount = (obj) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({ type: "SET_ACCOUNT_DATA", payload: obj })
            resolve();
        })
    }
}