import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { get_token, liked_posts } from '../../Tools';
import Input from './Input';
import List from './List';

const DELETE_POST = gql`
    mutation delete_post($input: DeletePostInput!) {
        delete_post(input: $input)
    }
`;

const GET_COMMENTS = gql`
    query get_comments($id: Int!) {
        comments: get_comments(id: $id) {
            id
            body
            author
        }
    }
`;

const LIKE_POST = gql`
    mutation like_post($input: LikePostInput!) {
        like_post(input: $input)
    }
`;

const UNLIKE_POST = gql `
    mutation unlike_post($input: LikePostInput) {
        unlike_post(input: $input)
    }
`;

const Posts = (props) => {
    const [deletePost] = useMutation(DELETE_POST);
    const [likePost] = useMutation(LIKE_POST);
    const [unlikePost] = useMutation(UNLIKE_POST);

    const { loading, error, data } = useQuery(GET_COMMENTS, {
        variables: {
            id: props.postId
        }
    });

    if(loading) return <p>Loading...</p>

    if(error) {
        window.location.reload();
    }

    const [liked, setLiked] = useState();
    const [likes, setLikes] = useState(props.likes);
    const [display, setDisplay] = useState(null); // Cannot Remove
    const [likesButton, setButton] = useState((
        <button onClick={() => setLiked(true)}>Unlike</button>
    ));
    const [deleteBut, setDeleteButton] = useState(null);

    useEffect(() => {
        if(liked) {
            like();
        } else if(liked == false) {
            unlike();
        }
    }, [liked])

    useEffect(() => {
        if(comments == true) {
            setDisplay((
                <div>
                    {
                        data.comments.map(ca => <List author={ca.author} body={ca.body} />)
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
            setButton((
                <button disabled="true">Like</button>
            ))
            setDeleteButton(
                (
                    <button onClick={() => {
                        deletePost({
                            variables: {
                                input: {
                                    id: props.postId,
                                    token: sessionStorage.getItem('token')
                                }
                            }
                        })
                        .then(({ data }) => {
                            if(data.delete_post == true) {
                                window.location.reload();
                            } else {
                                window.location.reload()
                            }
                        })
                    }}>Delete Post</button>
                )
            )
        } else {
            setDeleteButton(null);
        }

        if(liked_posts()) {
            if(liked_posts().includes(props.postId)) {
                setButton(
                    <button onClick={unlike}>Unlike</button>
                );
            }
        }    
    }, [])

    const like = () => {
        const scoped = async () => {
            let res;
            // Do them in the location they are
            if(get_token()) {
                likePost({
                    variables: {
                        input: {
                            id: props.postId,
                            token: get_token()
                        }
                    }
                }).then(({ res }) => {
                    const USER_TOKEN = gql`
                        query user_token($token: String!) {
                            user_token(token: $token) {
                                liked
                            }
                        } 
                    `;
                    const { data } = useQuery(USER_TOKEN, {
                        variables: {
                            token: get_token()
                        }
                    })
                    sessionStorage.setItem('liked', JSON.stringify(data.user_token.liked));
                    setButton((
                        <button onClick={() => setLiked(!liked)}>Unlike</button>
                    ));
                    setLikes(res.like_post);
                })
                
            } else {
                alert('Must be logged in to like a post');
            }
        };

        scoped();
    }

    const unlike = () => {
        const scoped = async () => {
            // Do them in the location they are
            let res;
            if(get_token()) {
                unlikePost({
                    variables: {
                        input: {
                            id: props.postId,
                            token: get_token()
                        }
                    }
                }).then(({ res }) => {
                    const USER_TOKEN = gql`
                        query user_token($token: String!) {
                            user_token(token: $token) {
                                liked
                            }
                        } 
                    `;
                    const { data } = useQuery(USER_TOKEN, {
                        variables: {
                            token: get_token()
                        }
                    })
                    sessionStorage.setItem('liked', JSON.stringify(data.user_token.liked));
                    setButton((
                        <button onClick={() => setLiked(!liked)}>Like</button>
                    ));
                    setLikes(res.unlike_post)
                })
            } else {
                alert('Must be logged in to like post');
            }
        };

        scoped();
    }

    return (
        <div key={props.postId}>
            <p>{props.title}</p>
            <p>{props.count}</p>
            <p>Category: <a href={`/category/${props.category}`}>{props.category}</a></p>
            <p>Author: <a href={`/user/${props.author}`}>{props.author}</a></p>
            <p>{props.children}</p>
            <p>{props.date}</p>
            <p>{ likesButton }: {likes}</p>
            <button onClick={() => setComments(!comments)}>Comments</button>
            { display }
            {deleteBut}
        </div>
    )
}

export default Posts;