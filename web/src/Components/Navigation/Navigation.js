import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Fetch, get_token } from "../../Tools";

const Navigation = () => {
  const [value, setValue] = useState("");
  const [text, setText] = useState("Author: ");
  const [toggle, setToggle] = useState(false);

  const push = () => {
    if (toggle == false) {
      history.push(`/user/${value}`);
    } else if (toggle !== false) {
      history.push(`/category/${value}`);
    }
  };

  const [authentication, setAuthentication] = useState(null);

  const logout = () => {
    if (window.confirm("Are You Sure You want to logout")) {
      sessionStorage.clear();
      window.location.reload(false);
    }
  };

  let history = useHistory();

  useEffect(() => {
    if (get_token() !== null | undefined) {
      const scoped = async () => {
        const token = get_token();
        const res = await Fetch(`
          {
            user_token(token:"U2FsdGVkX186kM2qV5kwzXfsSzeA5Os3QHwXr8JO1ng="){
              id
              handle
              liked
              supported
              layout
              bio
            }
          }
        `);
        console.log(res);
        if (res.user_token) {
          sessionStorage.setItem("id", res.user_token.id);
          sessionStorage.setItem("handle", res.user_token.handle);
          sessionStorage.setItem('liked', JSON.stringify(res.user_token.liked));
          sessionStorage.setItem('supported', JSON.stringify(res.user_token.supported));
          sessionStorage.setItem('layout', res.user_token.layout);
          sessionStorage.setItem('bio', res.user_token.bio);
          setAuthentication(
            <div>
              <li>
                <a href={`/user/${res.user_token.handle}`}>
                  {res.user_token.handle}
                </a>
                <ul>
                  <li>
                    <a href="/newpost">New Post</a>
                  </li>
                  <li>
                    <a href={window.location.href} onClick={logout}>Logout</a>
                  </li>
                </ul>
              </li>
            </div>
          );
        } else {
          setAuthentication(
            <a href="/auth">
              Authentication
            </a>
          );
        }
      };

      scoped();
    } else {
      setAuthentication(
        <a href="/auth">
          Authentication
        </a>
      );
    }
  }, []);

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      push();
    }
  };

  useEffect(() => {
    if (toggle == true) {
      setText('Category: ');
    } else if (toggle !== true) {
      setText('Author: ');
    }
  }, [toggle])

  return (
    <div className="navBar">
      <nav>
        <a href="/home">
          Project Sh@re
        </a>
        <div>
          <div>
            <label>
              <input onChange={() => setToggle(!toggle)} value={toggle} type="checkbox" />
              <span></span>
            </label>
          </div>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={text}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <button onClick={push}>

            Search
          </button>
        </div>
        <ul className="pages"> <a>Navigation</a>
          <li className="trending">
            <a href="/trending">
              Trending
            </a>
          </li>
          <li className="leaderboard">
            <a href="/leaderboard">
              Leaderboard
            </a>
          </li>
          <li className="categories">
            <a href="/categories">
              Categories
            </a>
          </li>
          <li className="about">
            <a href="/about">
              About
            </a>
          </li>
          <li className="authentication">{authentication}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;