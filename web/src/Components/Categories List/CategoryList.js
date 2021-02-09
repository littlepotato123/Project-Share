// import React, { useEffect, useState } from 'react';
// import {
//     useHistory
// } from 'react-router-dom';
// import { Fetch } from '../../Tools';
// import Post from '../Posts/Posts';

// const CategoryList = (props) => {
//     const [post, setPost] = useState(null);
//     const [posted, setPosted] = useState(false);
//     const [text, setText] = useState('Display Posts')
//     const [posts, setPosts] = useState(null);

//     const history = useHistory();

//     useEffect(() => {
//         if (posted) {
//             setText('Hide Post');
//             setPost(posts);
//         } else if (!posted) {
//             setPost(null);
//             setText('Display Post');
//         }
//     }, [posted])

//     useEffect(() => {
//         const scoped = async () => {
//             const res = await Fetch(`
//                 {
//                     sample_category_post(title: "${props.title}") {
//                         id
//                         title
//                         category
//                         body
//                         author
//                         likes
//                     }
//                 }
//             `)
//             setPosts(res.sample_category_post);
//         }
//         scoped();
//     });

//     return (
//         <div>
//             <a onClick={() => history.push(`/category/${props.title}`)}><h1>{props.title}</h1></a>
//             <h3>{props.description}</h3>
//             <button onClick={() => setPosted(!posted)}>{text}</button>
//             {
//                 post ? <Post author={post.author} title={post.title} category={post.category} likes={post.likes} id={post.id}>{post.body}</Post> : null
//             }
//         </div>
//     );
// };

// export default CategoryList;

import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Loading from '../Loading/Loading';

const Categories = gql`
    {
        all_categories {
            id
            title
            description         
        }
    }
`;

const CategoryList = () => {
    const { loading, error, data } = useQuery(Categories);

    if (loading) return <p>Loading Categories...</p>

    if (error) {
        window.location.reload();
    }
    return (
        <div>
            {
                data.all_categories.map((category) => {
                    return (
                        <div>
                            {category.id}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CategoryList;