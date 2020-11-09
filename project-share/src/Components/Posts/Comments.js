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
            if(data.length > 0) {
                const l = data.slice(0, 3);
                setDisplay((
                    <div>
                        {
                            l ? l.map(c => <CommentComponent author={c.author} body={c.body} id={c.id} createdAt={c.createdAt} />) : <p>Loading...</p>
                        }
                    </div>
                ))
                loadAll = () => {
                    setDisplay((
                        <div>
                            {
                                data ? data.map(c => <CommentComponent author={c.author} body={c.body} id={c.id} createdAt={c.createdAt} />) : <p>Loading...</p>
                            }
                        </div>
                    ))
                    changeBut();
                }
                if(data.length > 3) {
                    setBut((
                        <button onClick={loadAll}>Load All</button>
                    ))
                }
            }
        })
    }, [])


    const post = () => {
        if(idToken == null | undefined) {
            alert('Not Logged In')
        } else {
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
                setComment('');
                window.location.reload(false);
            })
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