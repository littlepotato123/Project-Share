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
  }, []);

  return (
    <div>
      <h2>About {href}</h2>
      <p>
        {href} is a platform created to support users who wish to apprise others about
          struggles and problems being tackled across the globe. As a community, we discuss
          to improve ourselves and determine solutions to mistakes and problems we cause in
          our daily lives. As people, we need to better ourselves and <a href="/home"> Project Sh@re</a> gives us an
          opportunity. {href} is welcoming to all users to provoke change. Users may interact
          with one another to share their ideas. Here, we build thoughts,
          wonder, and supporters to a common cause. {/* Style seperately - stand out*/}  Welcome to {href}!
        </p>

      <h2>Why should{href}?</h2>
      <p>
        Many ask, <i> why {href}? Why shouldn't I use another social media instead? How is this any
          different? </i> {href} is specifically created to help discuss world-wide issues. A platform
          only used to inform, learn, and promote. Not all communities thrive as ours do; it's important
          for the world to understand different and newer points of view. This platform is not used for any
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

<<<<<<< HEAD
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

      <h2>Guest vs. User</h2>
      <strong>Guest</strong>
      <p></p>
      <strong>User</strong>
      <p></p>
=======
      <h2>Guest VS User</h2>
      <p>As members of {href}, users have access to all the features on the platform. However, as guests, they have limited access to the website. Guests are prevented to taking part in the following:</p>
      <li>Like posts</li>
      <li>Comment on posts</li>
      <li>Support Users</li>
      <li>Message Users</li>
        
      <h2>Special Features</h2>
      <h4>Message User</h4>
      <p>
        {href}'s users get the opportunity to message other influencers about anything they beleive in. Up to eight messages are displayed to the reciever, the rest of the messages are
        linked to another page. Users on both ends can communicate with each other constantly.   
      </p>
      <h4>Ways to Submit</h4>
      <ul>
        <li>Windows - Ctrl + Shift</li>
        <li>IOS - Cmd + Shift</li>
      </ul>
      <h4>Leaderboard Algorithm</h4>
      <p>
        The leaderboard algorithm is just a sorting algorithm that takes the top 5 users, with the highest supporters and ranks them.
        After getting the top 5 users, we start sorting through the top 3, so if you are in 4th or 5th place, you will stay in ranking. 
        If you are in any ranking above that, just purily based on the amount of supporters, there is a chance that your ranking might change!
        We go through the top 3 users from the top 5 based on supporters, and we check if the user that was in the ranking right before the user that we 
        currently are checking, is relatively close in the amount of supporters. We determine this by checking if the number of supporters of the user ranking below is atleast
        90% of the user that we are currently checking. If the supporter count is relatively close between the two users, then we check if the amount of points is greater, for the user with the lower ranking. 
        If the lower ranking user does have more points, then the current user and the user ranking below it switch places. After that we check for the amount of awards that each user has won. This is the crucial factor, since this is that last  factor that can switch your ranking.
        If the user ranking below has less awards, in the end, they maintain their rank.
        <h2>Awards</h2>
        <ul>
          <li>10 Posts: 5 Points</li>
          <li>100 Posts: 50 Points</li>
          <li>250 Posts: 100 Points</li>
          <li>500 Posts: 200 Points</li>
          <li>1000 Posts: 500 Points</li>
          <li>1000 Supporters: 100 Points</li>
          <li>10,000 Supporters: 200 Points</li>
          <li>50,000 Supporters: 500 Points</li>
          <li>100,000 Supporters: 1000 Points</li>
        </ul>
      </p>
>>>>>>> 26a886af86ee802b0e93879eafb2e119f6129432

      <Input />
      {
        requests ?
          requests.map(r => <Request id={r.id} name={r.name} description={r.description} />) : <Loading />
      }
    </div>
  );
};

export default About;