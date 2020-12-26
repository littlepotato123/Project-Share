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
        {href} is a platform created to support users who wish to apprise others about{" "}
        <br />
          struggles and problems being tackled across the globe. As a community, we discuss {" "}
        <br />
          to improve ourselves and determine solutions to mistakes and problems we cause in
          <br />
          our daily lives. As people, we need to better ourselves and <a href="/home"> Project Sh@re</a> gives us an
          <br />
          opportunity. {href} is welcoming to all users to provoke change. Users may interact
          <br />
          with one another to share their ideas. Here, we build thoughts,
          <br />
          wonder, and supporters to a common cause. {/* Style seperately - stand out*/}  Welcome to {href}!
        </p>

      <h2>Why should{href}?</h2>
      <p>
        Many ask, <i> why {href}? Why shouldn't I use another social media instead? How is this any
          <br />
          different? </i> {href} is specifically created to help discuss world-wide issues. A platform
          <br />
          only used to inform, learn, and promote. Not all communities thrive as ours do; it's important
          <br />
          for the world to understand different and newer points of view. This platform is not used for any
        <br />
        personal gain.{/* Style seperately - stand out*/} At {href}, we take part in making the world a better place!
        </p>

      <h2>Our Policy</h2>
      <p>
        <ol>
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
        supported {href}. There is a suggestions' box in the <a href="/about">about </a> page which allows
        <br />
        users to give their suggestions about categories.
        <br />
        <br />
        <strong><a href="/about">About:</a></strong> The about page describes {href} as a platform and parts of it which users can access. There is a suggestions/concerns
        <br />
        box where users can help us improve the platform.
        <br />
        <strong><a href="/auth">Authentication:</a></strong> In our <a href="/auth">authenticaiton</a> page, we allow users to log in/out,
        <br />
        sign-up, and create posts.
        <br />
        <br />
        <strong><a href="/user/:userHandle">User Page:</a></strong> The user page contains information about {href}'s users, however,
        <br />
        only what is approved by the user will be displayed. Information like posts, post count, supporters, supporting, bio, awards, etc.
        <br />
        <br />
        <strong><a href="/newPost">New Post:</a></strong> Creating a post, is its own page; it consists of a title, topic, and a body. When the
        <br />
        post is displayed, the audience can identify the user, comments, likes, publish date, title, and category.
        <br />
        <br />
      </p>

      <h2>Guests</h2>
      <p>
        INCOMPLETE
      </p>
      <h2>Users</h2>
      <p>
        INCLOMPLETE
      </p>

      <h2>Special Features</h2>
      <p>Ways to submit:</p>
      <li>  BUTTON NAMNES PENDING</li>
      <li>  Windows - "Ctrl + Shift"</li>
      <li>  IOS - "PENDING"</li>
      <p>
        <strong>Awards:</strong>
        <br />
        <p>
          Points earned through POSTS:
        </p>
        <ol>10 Posts: 5 Points</ol>
        <ol>100 Posts: 50 Points</ol>
        <ol>250 Posts: 100 Points</ol>
        <ol>500 Posts: 200 Points</ol>
        <ol>1000 Posts: 500 points</ol>
        <p>
          Points earned through SUPPORTERS:
        </p>
        <ol>1000 Supporters: 100 Points</ol>
        <ol>10,000 Supporters: 200 Points</ol>
        <ol>50,000 Supporters: 500 Points</ol>
        <ol>100,000 Supporters: 1000 Points</ol>
        <ol>Everyday on Top of the Leaderboard (2nd and 3rd): 50 Points</ol>
        <ol>Everyday on the Top of the Leaderboard: 100 Points</ol>
      </p>
      <strong>How AWARDS work:</strong>
      <p>PENDING</p>


      <Input />
      {
        requests ?
          requests.map(r => <Request id={r.id} name={r.name} description={r.description} />) : <Loading />
      }
    </div>
  );
};

/*
New Tabs
  - Guest vs User (Limitations of Guests)

New Info (Extra info)
  - CONTROL + ENTER Functionality
  - Add Requests Info to the About Page Description
  - Award Info
    - How it works
    - Ways to earn
*/

export default About;