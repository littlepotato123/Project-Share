const initState = {
    idToken: 'asdfasd23djskdfj23r2k3j'
}

const rootReducer = (state = initState, action) => {
    if(action.type === 'SET_NEW_TOKEN') {
        let newToken = action.token;
        return {
            ...state,
            idToken: newToken
        }
    }
    return state;
}

export default rootReducer;