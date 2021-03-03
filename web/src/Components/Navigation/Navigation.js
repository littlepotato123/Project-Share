import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { get_token } from "../../Tools";

const USER_TOKEN = gql`
  query user_handle($token: String!) {
    user: user_token(title: $token) {
      id
      handle
      password
      liked
      supported
      supporting
      layout
      bio
    }
  }
`;

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
      const { error, data } = useQuery(USER_TOKEN);
      if(error) window.location.reload();
      sessionStorage.setItem('id', data.user.id)
      sessionStorage.setItem('handle', data.user.handle)
      sessionStorage.setItem('liked', data.user.liked)
      sessionStorage.setItem('supported', data.user.supported)
      sessionStorage.setItem('layout', data.user.layout)
      sessionStorage.setItem('bio', data.user.bio)
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
        <ul className="pages">
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