import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { get_token } from "../../Tools";

const NEW_POST = gql`
  mutation create_post($input: CreatePostInput!) {
    create_post(input: $input) {
      id
    }
  }
`;

const CATEGORIES = gql`
  query {
    categories: all_categories {
      title
      id
    }
  }
`;

const getDate = () => {
    let date = new Date();
    const str = date.toString().split(' ');
    return `${str[1]} ${str[2]} ${str[3]}`;
}

const NewPost = () => {
  const { loading, error, data } = useQuery(CATEGORIES);
  const [createPost] = useMutation(NEW_POST);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [length, setLength] = useState(0);
  const [keybind, setKeybind] = useState('');

  if(loading) return <Loading />

  if(error) window.location.reload();

  const history = useHistory();

  const post = () => {
    if (title && body && category) {
      createPost({
        variables: {
          input: {
            title: title,
            category: category,
            createdAt: getDate(),
            body: body,
            token: get_token()
          }
        }
      })
      .then(() => {
        history.push('/home');
      })
      .catch(e => console.log(e));
    } else {
      alert("Some fields are empty");
    }
  };
  
  const handleKeys = (e) => {
    setLength(body.length);
    if(length >= 200) {
      setBody(body);
    }

    const key = keybind;
    if(key == 'Control' && e.key == 'Enter') {
      post();
    }
    setKeybind(e.key);
  }

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title of Post"
      />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value=""></option>
        {
          data.categories.map(t => <option key={t.id}>{t.title}</option>)
        }
      </select>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post Body"
        onKeyDown={handleKeys}
        maxLength={200}
      ></textarea>
      <p>
      {200 - length} characters left
      </p>
      <button onClick={post}>Post</button>
      <a href="/about">Add Suggestions</a>
    </div>
  );
};

export default NewPost;
