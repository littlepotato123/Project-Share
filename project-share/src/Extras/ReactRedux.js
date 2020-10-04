import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

const ReactRedux = () => {
    const idToken = useSelector(state => state.idToken);
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch({ type: 'SET_NEW_TOKEN', token: 'Om12345678' })}>Button</button>
            {idToken}
        </div>
    )
}

export default ReactRedux;