const reducer = (state = false, action) => {
    switch (action.type) {
        case "SET_ACCOUNT_DATA": {
            return { ...state, accountData: action.payload }
        }
    }
    return state;
}

export default reducer;


