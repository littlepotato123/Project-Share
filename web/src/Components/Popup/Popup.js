import React, { useState } from 'react';

const Popup = (props) => {
    const [style, setStyles] = useState('visible');

    return (
        <div style={{ visibility: style }}>
            {props.children}
            <button onClick={() => {
                setStyles('hidden');
            }}>X</button>
        </div>
    )
}

export default Popup