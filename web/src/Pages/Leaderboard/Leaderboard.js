import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import UserList from '../../Components/User List/UserList';
import { Fetch } from '../../Tools';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState(null)

    useEffect(() => {
        const scoped = async () => {
            const res = await Fetch(`
                {
                    leaderboard {
                        id
                        handle
                        supporters
                    }
                }
            `);
            setLeaderboard(res.leaderboard);
        }
        scoped();
    }, [])

    return (
        <div>
            {leaderboard ?
                leaderboard.map(user => < UserList name={user.handle} supporters={user.supporters} id={user.userId} />) : <Loading />
            }
        </div>
    );
};

export default Leaderboard;