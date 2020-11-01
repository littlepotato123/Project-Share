import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import CommentComponent from './Commenting';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Commenting = (props) => {
    const [postData, setPost] = useState({
        id: props.id,
    })
    const [comments, setComments] = useState(null);
    const [comment, setComment] = useState('');

    const idToken = sessionStorage.getItem('token');

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
        })
    }, [])

    const post = () => {
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
            {
                comments.map(c => <CommentComponent author={c.author} body={c.body} id={c.id} />)
            }
            { posting }
        </div>
    )
}

export default Commenting;