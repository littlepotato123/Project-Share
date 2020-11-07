import React, { useEffect, useState } from 'react';

const Commenting = (props) => {
    const [createdAt, setCreatedAt] = useState(props.createdAt);
    const [day, setDay] = useState(null)
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        setDay(createdAt.day);
        setMonth(createdAt.month + 1);
        setYear(createdAt.year);

        if(day || month || year) {
            setDate(`${day}/${month}/${year}`);
        }
    }, [day, month, year])

    return (
        <div className="comment-box">
            <h4 className="comment-author">By: { props.author }</h4>
            <h1 className="comment-body">{ props.body }</h1>
            <h3 className="comment-date">{ date ? date : null}</h3>
        </div>
    )
}

export default Commenting;