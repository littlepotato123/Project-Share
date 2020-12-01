import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import Post from '../../Components/Posts/Posts';
import { Fetch } from '../../Tools';

const Home = () => {
    const [posts, setPosts] = useState(null);
    const [display, setDisplay] = useState(null);

    useEffect(() => {
        const scoped = async () => {
            const res = await Fetch(`
                {
                    homePage {
                        id
                        title
                        author
                        category
                        likes
                        body
                    }
                }
            `);
            setPosts(res.homePage);
        };

        scoped();
    }, [])

    useEffect(() => {
        if(posts) {
            if(posts.length == 0) {
                setDisplay((
                    <h1>
                        Sorry, there are currently no posts available
                    </h1>
                ))
            } else {
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
                                    postId={post.id}
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