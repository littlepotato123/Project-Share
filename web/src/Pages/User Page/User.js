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
            const res = await Fetch(`
                {
                    user(handle: "${userHandle}") {
                        id
                        supporters
                        handle
                        email
                        imageUrl
                    }
                }
            `);
            if(res.user) {
                setUser(res.user);
                setSupporters(res.user.supporters)
                setShare(`localhost:3000/user/${res.user.handle}`)
            } else {
                history.push('/wronguser')
            }
        }

        scoped();
    }, [])

    const loadPost = () => {
        const scoped = async () => {
            console.log(user.id);
            const res = await Fetch(`
                {
                    userPosts(handle:"${user.handle}"){
                        id
                        title
                        category
                        likes
                        body
                        author
                    }
                }
            `);
            setPosts(res.userPosts);
        }
        scoped();
    }

    let userInfo = (
        <div>
            {
                user ? <div>
            {user.handle} <br />
            {supporters} <br />
            { supportButton }
            <CopyToClipboard text={share}>
                <button>Copy Share Link</button>
            </CopyToClipboard>
            {user.bio}
            <button onClick={() => setMessages(!messages)}>Messages</button>
            { message }
            <img width="1000px" src={user.imageUrl ? user.imageUrl : null} />
            <button onClick={loadPost}>Load Posts</button>
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