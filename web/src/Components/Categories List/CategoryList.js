import { gql, useQuery } from '@apollo/client';
import React from 'react';

const Categories = gql`
    {
        all_categories {
            id
            title
            description         
        }
    }
`;

const CategoryList = () => {
    const { loading, error, data } = useQuery(Categories);

    if (loading) return <p>Loading Categories...</p>

    if (error) {
        window.location.reload();
    }
    return (
        <div>
            {
                data.all_categories.map((category) => {
                    return (
                        <div>
                            {category.id}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CategoryList;