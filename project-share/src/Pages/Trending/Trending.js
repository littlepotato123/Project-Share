import React from 'react';
import Post from '../../Components/Posts/Posts';
import Loading from '../../Components/Loading/Loading';

const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

class TopPosts extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: null
        }
    }

    componentDidMount() {
        fetch(url + 'getPopular')
            .then(res => res.json())
            .then(data => this.setState({ posts: data }))
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