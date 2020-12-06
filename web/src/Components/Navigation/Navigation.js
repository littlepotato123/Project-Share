import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Fetch } from "../../Tools";

const Navigation = (props) => {
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
      sessionStorage.removeItem('handle');
      sessionStorage.removeItem('token')
      window.location.reload(false);
    }
  };

  let history = useHistory();

  useEffect(() => {
    const t = sessionStorage.getItem("token");
    if (t !== null) {
      const scoped = async () => {
        const res = await Fetch(`
                    {
                        tokenUser(token: "${t}") {
                            handle
                        }
                    } 
                `);
        if (res.tokenUser) {
          sessionStorage.setItem("handle", res.tokenUser.handle);
          setAuthentication(
            <div>
              <li>
                <a href={`http://localhost:3000/user/${res.tokenUser.handle}`}>
                  {res.tokenUser.handle}
                </a>
                <ul>
                  <li>
                    <a href="/newpost">New Post</a>
                  </li>
                  <li>
                    <a onClick={logout}>Logout</a>
                  </li>
                </ul>
              </li>
            </div>
          );
        } else {
          history.push("/auth");
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
    if(toggle == true) {
      setText('Category: ');
    } else if(toggle !== true) {
      setText('Author: ');
    }
  }, [toggle])

  return (
    <div>
      <nav>
        <a href="/home">
          Project Sh@are
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
        <ul>
          <li>
            <a href="/trending">
              Trending
            </a>
          </li>
          <li>
            <a href="/leaderboard">
              Leaderboard
            </a>
          </li>
          <li>
            <a href="/categories">
              Categories
            </a>
          </li>
          <li>
            <a href="/about">
              About
            </a>
          </li>
          <li>{authentication}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;