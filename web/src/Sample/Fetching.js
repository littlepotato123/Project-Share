import React from 'react';
import { useQuery } from 'react-query';
import { Fetch } from '../Tools';

const Fetching = () => {
    const { isLoading, data } = useQuery('demoFetch', async () => {
        const res = await Fetch(`
            {
                all_categories {
                    id
                    title
                    description
                }
            } 
        `);
        return res;
    });
   
    return (
        <div>
            {
                isLoading ? <p>Loading...</p> : data.all_categories.map(c => <p>{c.title}</p>)
            }
        </div>
    )
};

export default Fetching;