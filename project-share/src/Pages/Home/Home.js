import React from 'react';
import Post from '../../Components/Posts/Posts';
import { useSelector } from 'react-redux';
import Loading from '../../Components/Loading/Loading';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: null
        }
    }

    componentDidMount() {
        fetch(proxyUrl + url + 'getHome')
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
                            key={post.id} 
                            title={post.title} 
                            author={post.author} 
                            category={post.category}
                            likes={post.likes}
                            id={post.id}
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