import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {
    useParams
} from 'react-router-dom';
import Post from '../../Components/Posts/Post';

/*
    - Shareable Link
*/

const SUPPORT = gql`
    mutation support($input: UserSupportingInput!) {
        return: support(input: $input)
    }
`;

const UNSUPPORT = gql`
    mutation unsupport($input: UserSupportingInput!) {
        return: unsupport(input: $input)
    }
`;

const GET_USER = gql`
    query user($handle: String!) {
        user: user_handle(handle: $handle) {
            id
            handle
            password
            imageUrl
            bio
            points
            awards
            supporters
            layout
            messages
        }
    }
    query user_posts($handle: String!) {
        posts: user_posts(handle: $handle) {
            id
            title
            author
            category
            body
            createdAt
            likes
            liked
        }
    }
`;

const ADD_MESSAGE = gql`
    mutation add_message($input: AddMessageInput!) {
        add_message(input: $input)
    }
`;

const NEW_AWARD = gql`
    mutation award($input: NewAwardInput!) {
        new_award(input: $input) 
    }
`;

const User = () => {
    const [add] = useMutation(NEW_AWARD);
    const [support] = useMutation(SUPPORT);
    const [unsupport] = useMutation(UNSUPPORT);
    const { userHandle } = useParams();
    const { loading, error, data } = useQuery(GET_USER, {
        variables: {
            handle: userHandle
        }
    });
    const [message, setMessage] = useState('');
    const [supported, setSupported] = useState(null);
    const [button, setButton] = useState(null);
    const [supporters, setSupporters] = useState(null);

    const new_award = ({ title, points }) => {
        add({
            variables: {
                input: {
                    id: data.user.id,
                    title,
                    points
                }
            }
        })
    };

    if(data) {
        setSupported(false);
        setSupporters(data.user.supporters);
        const id = data.user.id;
        const length = data.posts.length;
        if(length == 10) {
            await new_award({
                title: '10 Posts',
                points: 5
            });
        } else if(length == 100) {
            await new_award({
                title: '100 Posts',
                points: 50
            })
        } else if(length == 250) {
            await new_award({
                title: '250 Posts',
                points: 100
            })
        } else if(length == 500) {
            await new_award({
                title: '500 Posts',
                points: 200
            })
        } else if(length == 500) {
            await new_award({
                title: '1000 Posts',
                points: 500
            })
        }

        if(supporters == 1000) {
            await new_award({
                title: "1000 Supporters",
                points: 100
            })
        } else if(supporters == 10000) {
            await new_award({
                title: '10,000 Supporters',
                points: 200
            })
        } else if(supporters == 50000) {
            await new_award({
                title: '50,000 Supporters',
                points: 500
            })
        } else if(supporters == 100000) {
            await new_award({
                title: '100,000 Supporters',
                points: 1000
            })
        }
    }

    useEffect(() => {
        if(supported) {
            setButton((
                <button onClick={() => {
                    unsupport({
                        variables: {
                            input: {
                                id: data.user.id,
                                token: sessionStorage.getItem('token')
                            }
                        }
                    })
                        .then(({ data }) => {
                            if(data) {
                                setSupporters(data.return);
                            }
                        })
                }}>Unsupport</button>
            ))
        } else {
            setButton((
                <button onClick={() => {
                    support({
                        variables: {
                            input: {
                                id: data.user.id,
                                token: sessionStorage.getItem('token')
                            }
                        }
                    })
                        .then(({ data }) => {
                            if(data) {
                                setSupporters(data.return);
                            }
                        })
                }}>Support</button>
            ))
        }
    }, [supported])

    const [add] = useMutation(ADD_MESSAGE);

    if(loading) return <p>Loading...</p>

    if(error) window.location.reload();

    return (
        <div key={data.user.id}>
            <p>{data.user.handle}</p>
            <p>{data.user.bio}</p>
            <p>{supporters}</p>
            <p>{data.user.points}</p>
            <img src={data.user.imageUrl ? data.user.imageUrl : null} />
            {
                data.user.awards.map(str => str)
            }
            {
                data.user.messages.map(str => str)
            }
            {
                button
            }
            <input
                onChange={e => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if(e.target.tagName == 'Enter') {
                        add({
                            variables: {
                                userId: data.user.id,
                                body: message
                            }
                        })
                    }
                }}
            />
            {
                data.posts.map(post => <Post
                    author={post.author}
                    title={post.title}
                    body={post.body}
                    createdAt={post.createdAt}
                    category={post.category}
                    id={post.id}
                    liked={post.liked}
                    likes={post.likes}
                />)
            }
        </div>
    )
}

export default User;