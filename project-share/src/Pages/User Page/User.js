import React, { useEffect, useState } from 'react'
import {
    useHistory,
    useParams
} from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Loading from '../../Components/Loading/Loading';
import Post from '../../Components/Posts/Posts';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const User = () => {
    const [user, setUser] = useState({});
    const [supporters, setSupporters] = useState(null);
    const [posts, setPosts] = useState(null);
    const [share, setShare] = useState(null);

    const { userHandle } = useParams();
    
    const history = useHistory();

    useEffect(() => {
        fetch(proxyUrl + url + 'getUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.26.5",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            body: JSON.stringify({
                userHandle: userHandle
            })
        })
        .then(res => res.json())
        .then(data => {
            if(typeof data == 'object') {
                if(Object.keys(data).length === 0) {
                    history.push('/wronguser');
                } else {
                    setUser(data.user);
                    setShare(`localhost:3000/user/${data.user.handle}`)
                    setSupporters(data.user.supporters);
                }
            }
        })
    }, [])

    const loadPost = () => {
        fetch(proxyUrl + url + 'getUserPost', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.26.5",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            body: JSON.stringify({ user: user.handle })
        })
        .then(res => res.json())
        .then(data => setPosts(data))
    }

    let userInfo = (
        <div>
            {user.handle} <br />
            {supporters} <br />
            <button>Support</button>
            <CopyToClipboard text={share}>
                <button>Copy Share Link</button>
            </CopyToClipboard>
            <img src={user.url ? user.url : null} />
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
        </div>
    )

    return (
        <div>
            { Object.keys(user).length === 0 ? <Loading /> : userInfo}
        </div>
    )
}

export default User;