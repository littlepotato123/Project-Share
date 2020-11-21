import React, { useEffect, useState } from 'react';

const DropDown = (props) => {
    const [display, setDisplay] = useState(false);
    const [links, setLinks] = useState(null);

    useEffect(() => {
    if(display == true) {
        setLinks(props.children);
    } else {

        setLinks(null);
    }
    }, [display])

    return (
        <div>
            <button onClick={() => setDisplay(!display)}>{props.handle}</button>
            {links}
        </div>
    )
};

export default DropDown;