import React, { useEffect, useState } from "react";
import Loading from '../../Components/Loading/Loading';
import { Fetch } from '../../Tools';
import Input from "./Input";
import Request from './Request';

const About = () => {
  const [requests, setRequests] = useState(null);

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
      <h1>
        What is <a href="/home"> Project Sh@re </a>
      </h1>
      <p>
        <a href="/home"> Project Sh@re </a> is a platform created to support users who wish to aprise{" "}
        <br />
        others about difficulties and problems being tackled across the globe.{" "}
        <br />
        Project Sh@re is welcoming to all users to provoke change. 
      </p>
      {
        requests ? requests.map(r => <Request id={r.id} name={r.name} description={r.description} />): <Loading />
      }
      <Input />
    </div>
  );
};

export default About;
