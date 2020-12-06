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
    const [imageUrl, setImageUrl] = useState('');

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
        sessionStorage.removeItem(user.id)
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
        sessionStorage.setItem(user.id, 'true');
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
                    user(handle: "${userHandle}"){
                        id
                        bio
                        supporters
                        imageUrl
                        handle
                    }
                }
            `);
            if(res.user) {
                setSupporters(res.user.supporters)
                setShare(`localhost:3000/user/${res.user.handle}`)
                if(res.user.imageUrl){
                    setImageUrl(res.user.imageUrl);
                } else {
                    setImageUrl('https://firebasestorage.googleapis.com/v0/b/project-share-8244f.appspot.com/o/images%2Fguest.png?alt=media&token=578322c1-1798-4a6e-ae40-c541c2dbb263');
                }
                setUser(res.user);
                if(sessionStorage.getItem(res.user.id)) {
                    setSupported(true);
                }
            }
            else {
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
    }, [userHandle])

    let userInfo = (
        <div>
            {
                imageUrl ? 
                <img width="600px" src={imageUrl} />
                : <Loading />
            }
            {
                user ? 
                    <div>
                        {user.handle} <br />
                        {supporters} <br />
                        <h3>{user.bio}</h3> <br />
                        { supportButton }
                        <CopyToClipboard text={share}>
                            <button>Copy Share Link</button>
                        </CopyToClipboard>
                        <button onClick={() => setMessages(!messages)}>Messages</button>
                        { message }
                        <button onClick={() => setShow(!show)}>Load Posts</button>
                        {display}
                    </div> 
                : <Loading />
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