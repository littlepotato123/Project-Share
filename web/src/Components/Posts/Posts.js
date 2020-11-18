import React, { useEffect, useState } from 'react';
import { Fetch } from '../../Tools';
import List from './List';

const Posts = (props) => {
    const [comments, setComments] = useState(false);
    const [c, setC] = useState(null);
    const [liked, setLiked] = useState(null);
    const [likes, setLikes] = useState(props.likes);
    const [display, setDisplay] = useState(null);
    const [likesButton, setButton] = useState((
        <button onClick={() => setLiked(true)}>Like</button>
    ));

    useEffect(() => {
        const scoped = async () => {
            const res = await Fetch(`
                {
                    getComments(id: "${props.postId}") {
                        id
                        body
                        author
                    }
                }
            `);
            if(res) {
                setC(res.getComments);
            }
        }

        scoped();

        if (liked == null) {
            setButton((
                <button onClick={() => setLiked(true)}>Like</button>
            ));
        }
        if (liked == true) {
            like();
            setButton((
                <button onClick={() => setLiked(false)}>Unlike</button>
            ))
        }
        if (liked == false) {
            unlike();
            setButton((
                <button onClick={() => setLiked(true)}>Like</button>
            ));
        }
        if(sessionStorage.getItem(props.postId)) {
            setButton((
                <button onClick={() => setLiked(false)}>Unlike</button>
            ))
        }
        if(comments) {
            setDisplay((
                <div>
                    {
                        c ? c.map(ca => <List author={ca.author} body={ca.body} />) : <p>Loading...</p>
                    }
                </div>
            ))
        } else {
            setDisplay(null);
        }
    }, [liked, comments])

    const like = () => {
        const scoped = async () => {
            const res = await Fetch(`
                mutation {
                    likePost(id:"${props.postId}", current_like: ${likes})
                } 
            `);
            setLikes(res.likePost);
            sessionStorage.setItem(props.postId, 'true');
        };

        scoped();
    }

    const unlike = () => {
        const scoped = async () => {
            const res = await Fetch(`
                mutation {
                    unlikePost(id: "${props.postId}", current_like: ${likes})
                }
            `);
            setLikes(res.unlikePost);
            sessionStorage.removeItem(props.postId);
        }

        scoped();
    }

    return (
        <div key={props.postId} className="post-content">
            <p className="post-title">{props.title}</p>
            <p className="post-category">Category: <a href={`http://localhost:3000/category/${props.category}`}>{props.category}</a></p>
            <p className="post-author">Author: <a href={`http://localhost:3000/user/${props.author}`}>{props.author}</a></p>
            <p className="post-body">{props.children}</p>
            <p className="post-likes">{likesButton}<span>{likes}</span></p>
            <button className="post-comment-button" onClick={() => setComments(!comments)}>Comments</button>
            { display }
        </div>
    )
}

export default Posts;