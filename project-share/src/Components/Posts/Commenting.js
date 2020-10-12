import React from 'react'

const Commenting = (props) => {
    return (
        <div className="comment">
            Author: { props.author }<br />
            { props.body }
        </div>
    )
}

export default Commenting;