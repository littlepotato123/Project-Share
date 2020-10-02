const initState = {
    idToken: ''
}

const rootReducer = (state = initState, action) => {
    if(action.type === 'SET_NEW_TOKEN') {
        let newToken = action.token;
        return {
            idToken: newToken
        }
    }
    return state;
}

export default rootReducer;