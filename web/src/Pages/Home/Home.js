import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import Post from '../../Components/Posts/Posts';
import NoPosts from '../Errors/NoPosts';

const Home = () => {
    const [posts, setPosts] = useState(null);
    const [display, setDisplay] = useState(null);

    useEffect(() => {
    }, [])

    useEffect(() => {
        if (posts) {
            if (posts.length == 0) {
                setDisplay((
                    <NoPosts />
                ))
            } else {
                setDisplay((
                    <div>
                        {
                            posts ?
                                posts.map(post =>
                                    <Post
                                        title={post.title} author={post.author}
                                        category={post.category}
                                        likes={post.likes}
                                        postId={post.id}
                                        date={post.date}
                                    >
                                        {post.body}
                                    </Post>
                                )
                                : <Loading />
                        }
                    </div>
                ))
            }
        } else {
            setDisplay((
                <Loading />
            ))
        }
    }, [posts])

    return (
        <div>
            {display}
        </div>
    )
}

export default Home;