import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Loading from '../../Components/Loading/Loading';

const ALL_CATEGORIES = gql`
    query {
        all_categories {
            id
            title
            description
        }
    }
`;

const Categories = () => {
    const { loading, error, data } = useQuery(ALL_CATEGORIES);

    if(loading) return <Loading />
    if(error) {
        window.location.reload();
    }

    return (
        <div>
            {
                data.all_categories.map(category => {
                    return <div key={category.id}>
                        {category.title} <br />
                        {category.description} <br /> <br />
                    </div>
                }) 
            }
        </div>
    )
}

export default Categories;