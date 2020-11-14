import React from 'react';
import Loading from '../../Components/Loading/Loading';
import Post from '../../Components/Posts/Posts';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: null
        }
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

export default Home;