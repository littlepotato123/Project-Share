import React from 'react'

const ReactRedux = () => {
    const button = () => {
        props.setIdToken('Om12345677');
        console.log(props.idToken)
    }

    return (
        <div>
            {props.idToken}
            <button onClick={button}>Button</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        idToken: state.idToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIdToken: (newToken) => { dispatch({type: 'SET_NEW_TOKEN', token: newToken}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactRedux);