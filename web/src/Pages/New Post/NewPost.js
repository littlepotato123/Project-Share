import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { Fetch, getDate } from "../../Tools";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(null);
  const [length, setLength] = useState(0);
  const [keybind, setKeybind] = useState('');

  const history = useHistory();

  useEffect(() => {
    const scoped = async () => {
      const res = await Fetch(`
                {
                    getCategories {
                        title
                    }
                }
            `);
      setCategories(res.getCategories);
    };
    scoped();
  }, []);

  const post = () => {
    const scoped = async () => {
      const token = sessionStorage.getItem("token");
      const res = await Fetch(`
                mutation {
                    newPost(token: "${token}", date: "${getDate()}", title: "${title}", body: "${body}", category: "${category}") {
                        id
                    }
                } 
            `);
      if(res) {
        if (res.newPost) {
          history.push("/");
        } else {
          alert("Error while posting");
        }
      } else {
        alert("Error while posting");
      }
    };
    console.log(title, body, category);

    if (title && body && category) {
      if (
        category.includes("@") ||
        category.includes("/") ||
        category.includes("?") ||
        category.includes("#") ||
        category.includes("$")
      ) {
        alert("Wierd Characters in Category");
      } else {
        scoped();
      }
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
        {categories ? (
          categories.map((c) => <option value={c.title}>{c.title}</option>)
        ) : (
          <Loading />
        )}
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
