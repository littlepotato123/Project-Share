import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    useHistory,
    useParams
} from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import Post from '../../Components/Posts/Posts';
import { Fetch } from '../../Tools';
import Messages from './Messages';

const User = () => {
    const [user, setUser] = useState({});
    const [supporters, setSupporters] = useState(null);
    const [posts, setPosts] = useState(null);
    let [share, setShare] = useState(null);
    let [messages, setMessages] = useState(false);
    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState(null);

    useEffect(() => {
        if(show) {
            setDisplay((
                <div>
                    {
                        posts ? 
                        posts.map(post => 
                            <Post
                                title={post.title} 
                                author={post.author} 
                                category={post.category}
                                likes={post.likes}
                                id={post.postId}
                                createdAt={post.createdAt}
                            >
                                {post.body}
                            </Post>
                        ) :
                        null
                    }
                </div>
            ));
        } else {
            setDisplay(null);
        }
    }, [show])

    let message =  null;

    if(messages) {
        message = (
            <Messages id={user.id} />
        )
    } else {
        message = null;
    }

    const [supported, setSupported] = useState(false);

    const unsupport = () => {
        setSupported(!supported);
        const scoped = async () => {
            await Fetch(`
                mutation {
                    unsupportUser(id:"${user.id}", current_supporters:${supporters})
                }
            `)
            const new_supporters = supporters - 1;
            setSupporters(new_supporters);
        }
        scoped();
    }

    const support = () => {
        setSupported(!supported);
        const scoped = async () => {
            await Fetch(`
                mutation {
                    supportUser(id:"${user.id}", current_supporters:${supporters})
                }
            `);
            const new_supporters = supporters + 1;
            setSupporters(new_supporters);
        }
        scoped();
    }

    let supportButton = (
        <button onClick={support}>Support</button>
    )

    const { userHandle } = useParams();
    
    const history = useHistory();

    if(supported) {
        supportButton = (
            <button onClick={unsupport}>Unsupport</button>
        );
    } else {
        supportButton = (
            <button onClick={support}>Support</button>
        )
    }

    useEffect(() => {
        const scoped = async () => {
            let res = await Fetch(`
                {
                    user(handle: "${userHandle}") {
                        id
                        supporters
                        handle
                        email
                        imageUrl
                        bio
                    }
                }
            `);
            if(res.user) {
                setSupporters(res.user.supporters)
                setShare(`localhost:3000/user/${res.user.handle}`)
            } else {
                history.push('/wronguser')
            }

            res = await Fetch(`
                {
                    userPosts(handle: "${userHandle}") {
                        id
                        author
                        category
                        title
                        body
                        likes
                    }
                }
            `);
            setPosts(res.userPosts);
        }

        scoped();
    }, [])

    let userInfo = (
        <div>
            {
                user ? <div>
            {user.handle} <br />
            {supporters} <br />
            <h3>{user.bio}</h3> <br />
            { supportButton }
            <CopyToClipboard text={share}>
                <button>Copy Share Link</button>
            </CopyToClipboard>
            <button onClick={() => setMessages(!messages)}>Messages</button>
            { message }
            <img width="1000px" src={user.imageUrl ? user.imageUrl : null} />
            <button onClick={() => setShow(!show)}>Load Posts</button>
            {display}
                </div> : <Loading />
            }
        </div>
    )

    return (
        <div>
            {
                user ? userInfo : <Loading />
            }
        </div>
    )
}

export default User;