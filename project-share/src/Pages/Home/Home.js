import React from 'react';
import Post from '../../Components/Posts/Posts';
import { connect } from 'react-redux';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: null
        }
    }

    buttonClick = () => {
        this.props.setIdToken('1234556778')
        console.log(this.props.idToken);
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
                    : null
                }
                <button onClick={this.buttonClick}>Set New Id Token</button>
            </div>
        )
    }
}

export default Home;