import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import Post from '../../Components/Posts/Posts';
import { Fetch } from '../../Tools';

const Home = () => {
    const [posts, setPosts] = useState(null);

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

    console.log(posts);

    return (
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
                )
                : <Loading />
            }
        </div>
    )
}

export default Home;