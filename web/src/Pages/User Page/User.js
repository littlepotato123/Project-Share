import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
    useHistory,
    useParams
} from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import Post from '../../Components/Posts/Posts';
import { Fetch } from '../../Tools';
import Messages from './Messages';

const User = () => {
    const [user, setUser] = useState(null);
    const [supporters, setSupporters] = useState(null);
    const [posts, setPosts] = useState(null);
    const [share, setShare] = useState(null);
    const [messages, setMessages] = useState(false);
    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [button, setButton] = useState(null);
    const [supported, setSupported] = useState(false);

    const [edit, setEdit] = useState(null);

    useEffect(() => {
        if (show) {
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

    let message = null;

    if (messages) {
        message = (
            <Messages id={user.id} />
        )
    } else {
        message = null;
    }

    const { userHandle } = useParams();

    const history = useHistory();

    useEffect(() => {
        const scoped = async () => {
            const res = await Fetch(`
                {
                    user(handle: "${userHandle}"){
                        id
                        bio
                        supporters
                        imageUrl
                        password
                        handle
                    }
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
            if (res.user && res.userPosts) {
                setSupporters(res.user.supporters)
                sessionStorage.setItem('bio', res.user.bio);
                setShare(`localhost:3000/user/${res.user.handle}`)
                setUser(res.user);
                setPosts(res.userPosts);
                sessionStorage.setItem('supporters', res.user.supporters)
                if (res.user.password == sessionStorage.getItem('token')) {
                    setButton((<button disabled="true">Support</button>))
                    setSupported(null);
                    setEdit(
                        <a href="/edit">Edit Page</a>
                    )
                }
                const arr = JSON.parse(sessionStorage.getItem('supported'));
                console.log(arr);
                if (arr.includes(res.user.password)) {
                    setSupported(true);
                } else {
                    setSupported(false);
                }
                sessionStorage.setItem('curr_user', res.user.password)
                if (res.user.imageUrl) {
                    setImageUrl(res.user.imageUrl);
                } else {
                    setImageUrl('https://firebasestorage.googleapis.com/v0/b/project-share-8244f.appspot.com/o/images%2Fguest.png?alt=media&token=578322c1-1798-4a6e-ae40-c541c2dbb263');
                }
            } else {
                history.push('/wronguser');
            }
        }
        scoped();
    }, [userHandle])

    useEffect(() => {
        if (supported == false) {
            setButton((<button onClick={support}>Support</button>))
        } else if (supported == true) {
            setButton((<button onClick={unsupport}>Unsupport</button>))
        } else if (supported == null) {
            setButton((<button disabled="true">Support</button>))
        }
    }, [supported])

    const support = () => {
        const scoped = async () => {
            const val = parseInt(sessionStorage.getItem('supporters'));
            let res = await Fetch(`
            mutation {
                supportUser(
                  id:"${sessionStorage.getItem('curr_user')}",
                  token:"${sessionStorage.getItem('token')}",
                  current_supporters:${val}
                )
              }
            `);
            if (res) {
                if (res.supportUser !== null) {
                    setSupporters(res.supportUser);
                    sessionStorage.setItem('supporters', res.supportUser);
                    setSupported(!supported);
                } else {
                    alert('You have already supported this user');
                }
            } else {
                alert('Error while Supporting');
            }

            res = await Fetch(`
                {
                    tokenUser(token:"${sessionStorage.getItem('token')}") {
                        supported
                    }
                }
            `);
            if (res) {
                sessionStorage.setItem('supported', res.tokenUser.supported);
            }
        }
        if (sessionStorage.getItem('token')) {
            scoped();
        } else {
            alert('Must be logged in');
        }
    };

    const unsupport = () => {
        const scoped = async () => {
            const val = parseInt(sessionStorage.getItem('supporters'));
            let res = await Fetch(`
                mutation {
                    unsupportUser(
                        id:"${sessionStorage.getItem('curr_user')}",
                        token:"${sessionStorage.getItem('token')}",
                        current_supporters:${val}
                    )
                }
            `);
            if (res) {
                setSupporters(res.unsupportUser);
                sessionStorage.setItem('supporters', res.unsupportUser);
                setSupported(!supported);
            } else {
                alert("Error while supporting")
            }

            res = await Fetch(`
                {
                    tokenUser(token:"${sessionStorage.getItem('token')}") {
                        supported
                    }
                }
            `);
            console.log(res);
            if (res) {
                sessionStorage.setItem('supported', res.tokenUser.supported);
            }
        }
        if (sessionStorage.getItem('token')) {
            scoped();
        } else {
            alert('Must be logged in');
        }
    };

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
                        {edit} <br />
                        {supporters} <br />
                        {button}
                        <h3>{user.bio}</h3> <br />
                        <CopyToClipboard text={share}>
                            <button>Copy Share Link</button>
                        </CopyToClipboard>
                        <button onClick={() => setMessages(!messages)}>Messages</button>
                        {message}
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