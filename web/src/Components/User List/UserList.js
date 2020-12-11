import React, { useEffect, useState } from 'react';
import { Fetch } from '../../Tools';
import Posts from '../Posts/Posts';

const UserList = (props) => {
    const [post, setPost] = useState(null);
    

    useEffect(() => {
        const scoped = async () => {
            const res = await Fetch(`
                {
                    userOnePost(handle: "${props.name}") {
                        id
                        title
                        author
                        category
                        likes
                        body
                    }
                }
            `);
            if(res.userOnePost) {
                setPost(res.userOnePost);
            }
        };
        scoped();
    }, [])

    return (
        <div>
            <span><a href={`/user/${props.name}`}>{props.name}</a></span> <br />
            {
                post ? 
                <Posts
                    title={post.title} 
                    author={post.author} 
                    category={post.category}
                    likes={post.likes}
                    postId={post.id}
                >
                    {post.body}
                </Posts> : <p>The user currently does not have any posts</p>
            }
        </div>
    )
}

export default UserList;