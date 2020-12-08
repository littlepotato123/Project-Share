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
      console.log(res);
      setRequests(res.requests);
    };

    scoped();
  }, [])

  return (
    <div>
      <h3>About {href} </h3>
      <p>

        <a href="/home"> Project Sh@re </a> is a platform created to support users who wish to aprise others about{" "}
        <br />
        difficulties and problems being tackled across the globe. As a community, we discuss {" "}
        <br />
        to improve oursleves and determine solutions to mistakes and problems we cause in our daily
         <br />
         lives. As people we need to better oursleves and <a href="/home"> Project Sh@re </a> gives us an opporunity.
        <br />
        <a href="/home"> Project Sh@re </a> is welcoming to all users to provoke change.
=======
        {href} is a platform created to support users who wish to aprise
        <br />
        others about difficulties and problems being tackled across the globe. {href}
        <br />
        is welcoming to all users determined to provoke change. Users may interact
        <br />
        with one another share their ideas.  As a community, we build thoughts,
        <br />
        {/* Style seperately - stand out*/} wonder, and supporters to a common cause. Welcome to {href}!
      </p>
      <h3>Why {href}?</h3>
      <p>
        Many ask, <i> why {href}? Why can't I use Facebook or Instagram instead? How is this better?</i>
        <br />

>>>>>>> cbe4aff5525ab0b3acebc447549d867acc874638
      </p>
      <h3>Our Policy</h3>
      <h3>Our Pages</h3>
      {
        requests ?
          requests.map(r => <Request id={r.id} name={r.name} description={r.description} />) : <Loading />
      }
      <Input />
    </div>
  );
};

export default About;