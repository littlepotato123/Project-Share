import React, { useState } from "react";
import Loading from '../../Components/Loading/Loading';
import Input from "./Input";
import Request from './Request';

const About = () => {
  const [requests, setRequests] = useState(null);
  const href = (<a style={{ textDecoration: "none" }} href="/home">Project Sh@re</a>);

  return (
    <div className="about_page">
      <h2 className="aboutTitle">About {href}</h2>
      <p className="aboutTitle_paragraph">
        {href} is a platform created to support users who wish to apprise others about
              struggles and problems being tackled across the globe. As a community, we discuss
              to improve ourselves and determine solutions to mistakes and problems we cause in
              our daily lives. As people, we need to better ourselves and <a href="/home"> Project Sh@re</a> gives us an
              opportunity. {href} is welcoming to all users to provoke change. Users may interact
              with one another to share their ideas. Here, we build thoughts,
              wonder, and supporters to a common cause. Welcome to {href}!
      </p>
      <h2 className="whyTitle">Why {href}?</h2>
      <p className="why_paragraph">
        Many ask, <i> why {href}? Why shouldn't I use another social media instead? How is this any
          different? </i> {href} is specifically created to help discuss world-wide issues. A platform
          only used to inform, learn, and promote. Not all communities thrive as ours do; it's important
          for the world to understand different and newer points of view. This platform is not used for any
        personal gain. At {href}, we take part in making the world a better place!
        </p>

      <h2 className="policyTitle">Our Policy</h2>
      <p className="policy_paragraph">
        <ol>
          <li>All comments and posts must be appropriate and respectful at all times.</li>
          <li>Users may not express any offensive thoughts</li>
          <li>Unnecessary spam will prevent users from commenting and/or posting for a certain
          <br />
          period of time</li>
        </ol>
      </p>

      <h2 className="guestVSuserTitle">Guest VS User</h2>
      <p className="gVSu_paragraph">As members of {href}, users have access to all the features on the platform. However, as guests, they have limited access to the website. Guests are prevented to taking part in the following:
        <ul>
          <li>Like posts</li>
          <li>Comment on posts</li>
          <li>Support Users</li>
          <li>Message Users</li>
        </ul>
      </p>

      <h2 className="special-featuresTitle">Special Features</h2>
      <p className="sf_paragraph">
        <strong><u>Message User: </u></strong>
        <br />
        {href}'s users get the opportunity to message other influencers about anything they beleive in. Up to eight messages are displayed to the reciever, the rest of the messages are
        linked to another page. Users on both ends can communicate with each other constantly.
      <strong><u>Ways to Submit</u></strong>
        <ul>
          <li>Windows - Ctrl + Shift</li>
          <li>IOS - Cmd + Shift</li>
        </ul>
        <strong><u>Leaderboard Algorithm:</u></strong>
        <br />
        The leaderboard algorithm is just a sorting algorithm that takes the top 5 users, with the highest supporters and ranks them.
        After getting the top 5 users, we start sorting through the top 3, so if you are in 4th or 5th place, you will stay in ranking.
        If you are in any ranking above that, just purily based on the amount of supporters, there is a chance that your ranking might change!
        We go through the top 3 users from the top 5 based on supporters, and we check if the user that was in the ranking right before the user that we
        currently are checking, is relatively close in the amount of supporters. We determine this by checking if the number of supporters of the user ranking below is atleast
        90% of the user that we are currently checking. If the supporter count is relatively close between the two users, then we check if the amount of points is greater, for the user with the lower ranking.
        If the lower ranking user does have more points, then the current user and the user ranking below it switch places. After that we check for the amount of awards that each user has won. This is the crucial factor, since this is that last  factor that can switch your ranking.
        If the user ranking below has less awards, in the end, they maintain their rank.
        </p>


      <Input className="inputBox" />
      {
        requests ?
          requests.map(r => <Request id={r.id} name={r.name} description={r.description} />) : <Loading />
      }
    </div>
  );
};

export default About;