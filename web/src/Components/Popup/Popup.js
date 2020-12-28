import React, { useState } from 'react';

const Popup = (props) => {
    const [style, setStyles] = useState('visible');

    return (
        <div style={{ visibility: style }}>
            {props.children}
            <button onClick={() => {
                setStyles('hidden');
            }}>Close</button>
        </div>
    )
}

export default Popup;