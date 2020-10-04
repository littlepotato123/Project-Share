const initState = {
    idToken: '',
    counter: 0,
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