import React, { useEffect, useState } from "react";
import Loading from '../../Components/Loading/Loading';
import { Fetch } from '../../Tools';
import Input from "./Input";
import Request from './Request';

const About = () => {
  const [requests, setRequests] = useState(null);

  const href = (<a href="/home">Project Sh@re</a>);

  useEffect(() => {
    const scoped = async () => {
      const res = await Fetch(`
        {
          requests {
            id
            name
            description
          }
        }
      `);
      setRequests(res.requests);
    };

    scoped();
  }, [])
  
  return (
    <div>
      <h2>About {href}</h2>
      <p>
        {href} is a platform created to support users who wish to aprise others about{" "}
        <br />
          difficulties and problems being tackled across the globe. As a community, we discuss {" "}
        <br />
          to improve oursleves and determine solutions to mistakes and problems we cause in
          <br />
          our daily lives. As people we need to better oursleves and <a href="/home"> Project Sh@re </a> gives us an
          <br />
          opporunity. {href} is welcoming to all users to provoke change. Users may interact
          <br />
          with one another share their ideas. Here, we build thoughts,
          <br />
          wonder, and supporters to a common cause. {/* Style seperately - stand out*/}  Welcome to {href}!
        </p>

      <h2>Why {href}?</h2>
      <p>
        Many ask, <i> why {href}? Why can't I use Facebook or Instagram instead? How is this any
          <br />
          different? </i> {href} is specifically created to help discuss world-wide issues. A platform
          <br />
          only used to inform, learn, and promote. As we thrive, many experience worsen lives. This platform
          <br />
          is not used for any personal gain. {/* Style seperately - stand out*/} At {href}, we take part in making the world a better place!
        </p>

      <h2>Our Policy</h2>
      <p>
        <ol>
          <li>All users must be treated with respect. Everyone at {href} makes a change; all
          <br />
          thought's and opinions matter.</li>
          <li>All comments and posts must be appropriate and respectful at all times.</li>
          <li>Users may not express any offensive thoughts</li>
          <li>Unnecessary spam will prevent users from commenting and/or posting for a certain
          <br />
          period of time</li>
        </ol>
      </p>

      <h2>Pages</h2>
      <p>
        <strong><a href="/home"> Home: </a></strong> The <a href="/home"> home </a> page contains a navigation bar that allows users to access other pages,
        <br />
        log in/out, sign up/in, review their accounts, and post. It also contains randomly selected
        <br />
        posts which are available to everyone.
        <br />
        <br />
        <strong><a href="/trending">Trending: </a></strong> The <a href="/trending"> trending </a> page contains the top 10 most liked posts by the {href}
        <br />
        community. It's being updated live as users continue to like and comment on posts.
        <br />
        <br />
        <strong><a href="/leaderboard">Leaderboard: </a></strong> The <a href="/leaderboard">leaderboard</a> page contains the top 5 users in the {href}
        <br /> community. It's being updated live as users continue to grow and support others.
        <br />
        <br />
        <strong><a href="/categories">Categories: </a></strong> The <a href="/categories">categories</a> page contains all the different categories/topics supported
        <br />
        supported {href}. There is a suggestions box in the <a href="/about">about </a> page which allows
        <br />
        users to give their suggestions about categories.
        <br />
        <br />
        <strong><a href="/about">About:</a></strong> The <a href="/about">about</a> page explains to users
        <br />
        about: {href}, Why {href}?, Our Policy, and our Pages.
        <br />
        <br />
        <strong><a href="/auth">Authenticaiton:</a></strong> In our <a href="/auth">authenticaiton</a> page, we allow users to long in/out,
        <br />
        sign-up, and create posts.
      </p>

      <h2>Guest VS User</h2>
      {/* Note: Om please fill this out in bullet points, I think you know more about this than I do.  */}

      {
        requests ?
          requests.map(r => <Request id={r.id} name={r.name} description={r.description} />) : <Loading />
      }
      <Input />
    </div>
  );
};

export default About;