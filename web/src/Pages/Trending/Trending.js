import React from 'react';
import Loading from '../../Components/Loading/Loading';
import Post from '../../Components/Posts/Posts';
import { Fetch } from '../../Tools';

class TopPosts extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: null
        }
    }

    componentDidMount() {
        const scoped = async () => {
            const res = await Fetch(`
                {
                    trending_posts {
                        id
                        title
                        author
                        category
                        body
                        createdAt
                        likes
                        liked
                    }
                }
            `)
            this.setState({ posts: res.getPopular })
        };

        scoped();
    }

    render() {
        return (
            <div>
                {
                    this.state.posts ? 
                    this.state.posts.map((post, index)=> 
                        <Post
                            title={post.title} 
                            author={post.author} 
                            category={post.category}
                            likes={post.likes}
                            postId={post.id}
                            createdAt={post.createdAt}
                            date={post.date}
                            count={index + 1}
                        >
                            {post.body}
                        </Post>    
                    )
                    : <Loading />
                }
            </div>
        )
    }
}

export default TopPosts;