import React, { useEffect, useState } from 'react';
import { Fetch } from '../../Tools';
import Input from './Input';
import List from './List';

const Posts = (props) => {
    const [comments, setComments] = useState(false);
    const [c, setC] = useState(null);
    const [liked, setLiked] = useState();
    const [likes, setLikes] = useState(props.likes);
    const [display, setDisplay] = useState(null);
    const [likesButton, setButton] = useState((
        <button onClick={() => setLiked(true)}>Like</button>
    ));
    const [deleteBut, setDeleteButton] = useState(null);

    const cut = () => {
        const scoped = async () => {
            const res = await Fetch(`
                mutation {
                    deletePost(id: "${props.postId}")
                } 
            `);
            if(res.deletePost == true) {
                alert('Succesfully Deleted Post');
            } else {
                alert('Failed to Delete Post');
            }
            window.location.reload(false);
        }

        if(window.confirm('Are you sure you want to delete this post?')) {
            scoped();
        }
    }

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
                console.log(res.getComments);
            }
        }
        scoped();

        if(liked) {
            like();
        } else if(liked == false    ) {
            unlike();
        } else {
            setButton((
                <button disabled="true">Like</button>
            ))
        }
    }, [liked])

    useEffect(() => {
        if(comments == true) {
            setDisplay((
                <div>
                    {
                        c ? c.map(ca => <List author={ca.author} body={ca.body} />) : <p>Loading...</p>
                    }
                    {
                        sessionStorage.getItem('token') ? 
                        <div>
                            <Input id={props.postId} />
                        </div> : 
                        <div>
                            <input disabled="true" />
                            <button disabled="true">Comment</button>
                        </div>
                    }
                </div>
            ))
        } else if(comments == false) {
            setDisplay(null);
        }
    }, [comments])

    useEffect(() => {
        setButton((
            <button onClick={() => setLiked(!liked)}>Like</button>
        ))

        if(props.author == sessionStorage.getItem('handle')) {
            setDeleteButton(
                (
                    <button onClick={cut}>Delete Post</button>
                )
            )
        } else {
            setDeleteButton(null);
        }
    }, [])

    const like = () => {
        const scoped = async () => {
            const res = await Fetch(`
                mutation {
                    likePost(id:"${props.postId}", current_like: ${likes})
                } 
            `);
            setLikes(res.likePost);
            sessionStorage.setItem(props.postId, 'true');
            setButton((
                <button onClick={() => setLiked(!liked)}>Unlike</button>
            ))
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
            setButton((
                <button onClick={() => setLiked(!liked)}>Like</button>
            ))
        }

        scoped();

        if(props.author == sessionStorage.getItem('handle')) {
            setDeleteButton((
                <button>Delete</button>
            ))
        }
    }

    return (
        <div key={props.postId} className="post-content">
            <p className="post-title">{props.title}</p>
            <p className="post-category">Category: <a href={`http://localhost:3000/category/${props.category}`}>{props.category}</a></p>
            <p className="post-author">Author: <a href={`http://localhost:3000/user/${props.author}`}>{props.author}</a></p>
            <p className="post-body">{props.children}</p>
            <p className="post-likes"><span>{ likesButton }</span>{likes}</p>
            <button className="post-comment-button" onClick={() => setComments(!comments)}>Comments</button>
            { display }
            { deleteBut }
        </div>
    )
}

export default Posts;