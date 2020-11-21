import React from 'react';
import { Fetch } from '../Tools';

const FetchSample = () => {
    /*
        FETCHING

        Take a look at the Tools.js file in WEB folder to actually see what this Fetch function
        does, but essential it takes a request as a parameter, and returns to you the data from 
        the fetch. It handles all of the fetch formating for you.

        QUERY

        The way that I figured out what to fetch to get the HomePage in this example, take a look
        at the schema.gql file which is basically the typeDefs.js in the API, but copied and pasted.
        There I can see that there is a query called homePage and it returns an array of posts.
        In schema.gql, it looks like:

        type Query {
            homePage: [Post!]!
        }

        type Post {
            id: ID!
            title: String!
            author: String!
            category: String!
            likes: Int!
            body: String!
        }

        Here I can see that homePage gives an array of posts and each post has an id, title, author, 
        category, likes, body. Using this information I send a request. Since I am sending a query, I 
        do not have to write query anywhere, instead I just put {} around everything, then I just write 
        'homePage', the name of the query in schema.gql, and then I put more curly braces to start talking
        about the posts, and here I just want the id, title, author, and category. (Note that I do not need 
        to fetch for everything in a post). Also, if my homePage gave me a string or boolean, I could just do
        {
            homePage
        }
        and it would give back the string or boolean, but since I am getting back a post, I have to tell GraphQL 
        what I want of the post and what I do not want. 


        MUTATION

        This example, I am just using signup, and the way I figured out all of the parameters and name is with 
        the help of the schema.gql: 

        type User {
            id: ID!
            handle: String!
            email: String!
            password: String!
            imageUrl: String!
            supporters: Int!
        }

        type Mutation {
            signup(handle: String!, email: String!, password: String!, imageUrl: String): User
        }

        With this information we can see that there is a mutation 'singup' and it takes handle, email, and password as
        parameters and returns a User. So in our request, notice how we do not just put curly braces but we put
        'mutation {}'. This is to tell GraphQL that we are accessing a mutation and not a query. Then we put the name
        of the mutation 'signup', and paranthesis to pass the paramaters. With the parameters, "{name}: {value}". I did
        this with the handle, email, and password. Notice that for the handle I put a varaible name with ${}. After writing
        all of this, we see that the mutation returns a user, so we use the same method as with the query, and we just
        fetch for id, handle, email, password, etc. Another thing that I have just added is that when you signup, the imageUrl
        is optional field, but you can add it. That is why I have decided not to add it. 
    */

    const homePage = () => {
        const res = Fetch(`
            {
                homePage {
                    id
                    title
                    author
                    category
                }
            }
        `)
        console.log(res);
    }

    const mutation = () => {
        const handle = "Om";

        const res = Fetch(`
            mutation {
                signup(handle: "${handle}", email: "sopanda0910@gmail.com", password: "Panda") {
                    id
                    handle
                    email
                    password
                    imageUrl
                    supporters
                }
            } 
        `)
    };

    useEffect(() => {
        const async_fun = async () => {
            fetch('http://localhost:4000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                })
            })
        }
    })

    return (
        <div>
            <button onClick={homePage}>Home Page</button>
            <button onClick={mutation}>Mutate</button>
        </div>
    )
}

export default FetchSample;