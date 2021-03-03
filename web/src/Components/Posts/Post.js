import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';

/*
    - Delete Post
    - Get Comments
    - Like post
    - Unlike post
*/

const DELETE_POST = gql`
    mutation delete_post($input: DeletePostInput!) {
        del: delete_post(input: $input)
    }
`;

const Post = ({
    id,
    title,
    author,
    category,
    body,
    createdAt,
    likes,
    liked
}) => {
    const [cut] = useMutation(DELETE_POST);

    const [_likes, setLikes] = useState(likes);
    const [delBut, setDelButton] = useState(null);

    useEffect(() => {
        if(author == sessionStorage.getItem('handle')) {
            setDelButton(
                <button onClick={() => {
                    cut({
                        variables: {
                            input: {
                                id,
                                token: sessionStorage.getItem('token')
                            }
                        }
                    })
                        .then(({ data }) => {
                            if(data.del == true) {
                                alert('Post Deleted');
                            } else {
                                alert('Error Deleting');
                            }
                        })
                }}>Delete Post</button>
            )
        }
    }, []);

    // Check if user is logged in
    // Check if user has already liked

    return (
        <div key={id}>
            {title} <br />
            {category}<br />
            {author}<br />
            {body}<br />
            {createdAt}<br />
            {_likes}<br />
            {delBut}<br />
            <br />
        </div>
    )
}







export default Post;