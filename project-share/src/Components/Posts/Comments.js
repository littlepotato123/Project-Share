import React, { useEffect, useState } from 'react';
import CommentComponent from './Commenting';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Commenting = React.memo((props) => {
    const [postData, setPost] = useState({
        id: props.id,
    })
    const [comments, setComments] = useState(null);
    const [comment, setComment] = useState('');
    const [list, setList] = useState(null);
    const [display, setDisplay] = useState(null);

    const idToken = sessionStorage.getItem('token');

    const loadAll = () => {
        setDisplay((
            <div>
                {
                    comments ? comments.map(c => <CommentComponent author={c.author} body={c.body} id={c.id} />) : <p>Loading...</p>
                }
            </div>
        ));
        but = null;
    }

    let but = (
        <button onClick={loadAll}>Load All</button>
    );

    useEffect(() => {
        fetch(proxyUrl + url + 'getComment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.26.5",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(data => {
            setComments(data);
            setList(data.slice(0, 3));
            const l = data.slice(0, 3);
            console.log(l);
            setDisplay((
                <div>
                    {
                        l ? l.map(c => <CommentComponent author={c.author} body={c.body} id={c.id} />) : <p>Loading...</p>
                    }
                </div>
            ))
        })
    }, [])

    const post = () => {
        if(idToken == null | undefined) {
            alert('Not Logged In')
        }

        fetch(proxyUrl + url + '/createComment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.26.5",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Authorization": `Bearer ${idToken}`
            },
            body: JSON.stringify({
                id: props.id,
                body: comment
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error === "Unauthorized") {
                alert("You must be logged in to submit commit");
            }
        })
        .then(() => {
            setComment('');
            window.location.reload(false);
        })
        .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        if(e.key == "Enter") {
            post();
        }
    }

    let posting = (
        <div>
            <input 
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyPress={handleChange}
            />
            <button onClick={post}>Comment</button>
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