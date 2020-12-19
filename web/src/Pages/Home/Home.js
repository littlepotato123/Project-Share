import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import Post from '../../Components/Posts/Posts';
import { Fetch } from '../../Tools';
import NoPosts from '../Errors/NoPosts';

const Home = () => {
    const [posts, setPosts] = useState(null);
    const [display, setDisplay] = useState(null);

    useEffect(() => {
        const scoped = async () => {
            let res = await Fetch(`
                {
                    homePage {
                        id
                        title
                        author
                        category
                        likes
                        body
                        date
                    }
                }
            `);
            if(res) {
                setPosts(res.homePage);
                res = await Fetch(`
                    mutation {
                        createCategories {
                            id
                        }
                    }
                `)
                if(res == null | undefined) {
                    alert('Error creating categories');
                }
            } else {
                alert("Error while getting home page");
            }
        };

        scoped();
    }, [])

    useEffect(() => {
        if(posts) {
            if(posts.length == 0) {
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