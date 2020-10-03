import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setIdToken } from '../Reducers/setIdToken';

const ReactRedux = () => {
    const idToken = useSelector(state => state.idToken);
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch(setIdToken('Om12345678'))}>Button</button>
        </div>
    )
}

export default ReactRedux;