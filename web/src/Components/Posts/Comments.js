import React, { useEffect, useState } from 'react';

const Commenting = React.memo((props) => {
    const [postData, setPost] = useState({
        id: props.id,
    })
    const [comments, setComments] = useState(null);
    const [comment, setComment] = useState('');
    const [display, setDisplay] = useState(null);
    const [but, setBut] = useState(null);

    const changeBut = () => {
        setBut(null);
    }

    const idToken = sessionStorage.getItem('token');

    let loadAll = () => {
        changeBut();
    }

    useEffect(() => {

    }, [])


    const post = () => {
        if(idToken == null | undefined) {
            alert('Not Logged In')
        } else {
        }
    }

    const handleChange = (e) => {
        if(e.key == "Enter") {
            post();
        }
    }

    let input = (
        <div>
            <input 
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyPress={handleChange}
            />
            <button onClick={post}>Comment</button>
        </div>
    );

    if(idToken == null) {
        input = (
            <div>
                <input disabled="true" />
                <button disabled="true">Comment</button>
            </div>
        )
    }

    let posting = (
        <div>
            { input }
        </div>
    )

    if(comments == null) {
        return (
            <div>
                { posting }
            </div>
        )
    } else if(comments.error === "Could not find post") {
        return (
            <div>
                <h1>Could not find any comments, Be the first to comment!</h1>
                { posting }
            </div>
        )
    }

    return (
        <div>
            { display }
            { but }
            { posting }
        </div>
    )
});

export default Commenting;