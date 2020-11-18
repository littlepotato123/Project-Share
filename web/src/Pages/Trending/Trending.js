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
                    getPopular {
                        id
                        title
                        author
                        category
                        likes
                        body
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
                    this.state.posts.map(post => 
                        <Post
                            title={post.title} 
                            author={post.author} 
                            category={post.category}
                            likes={post.likes}
                            id={post.postId}
                            createdAt={post.createdAt}
                            token={this.props.token}
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