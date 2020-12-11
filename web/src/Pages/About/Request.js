import React, { useEffect, useState } from 'react';
import { Fetch } from '../../Tools';

const Requests = (props) => {
    const [but, setBut] = useState(null);

    const cut = () => {
        const scoped = async () => {
            const res = await Fetch(`
                mutation {
                    deleteRequest(id:"${props.id}")
                } 
            `);
            if(res.deleteRequest == true) {
                window.location.reload(false);
            } else {
                alert('Failed to Delete Request');
            }
        }

        scoped();
    };

    useEffect(() => {
        if(sessionStorage.getItem('handle') == 'Projectsharereal') {
            setBut((
                <button onClick={cut}>Delete</button>
            ))
        }
    }, [])

    return (
        <div key={props.id}>
            {props.name}
            {props.description}
            {but}
        </div>
    )
}

export default Requests;