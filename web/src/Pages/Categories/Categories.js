import React, { useEffect, useState } from 'react';
import List from '../../Components/Categories List/CategoryList';
import Loading from '../../Components/Loading/Loading';
import { Fetch } from '../../Tools';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const scoped = async () => {
            const res = await Fetch(`
                {
                    getCategories {
                        id
                        title
                    }
                }
            `);

            setCategories(res.getCategories);
        }

        scoped();
    })

    return (
        <div>
            {
                categories ?
                categories.map(category => <List title={category.title} />) 
                :
                <Loading />
            }
        </div>
    )
}

export default Categories;