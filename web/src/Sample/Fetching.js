import { gql, useQuery } from '@apollo/client';
import React from 'react';

const ALL_CATEGORIES = gql`
    {
        all_categories {
            id
            title
            description
        }
        homepage {
            id
            title
        }
    }
`;

const Fetching = () => {
    const { loading, error, data } = useQuery(ALL_CATEGORIES);
    // const { loading, error, data } = useMutation(ALL_CATEGORIES); if mutation

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error Occured</p>

    return (
        <div>
            {
                data.all_categories.map(c => <p>{c.title}: {c.description}</p>)
            }
        </div>
    )
}

export default Fetching;