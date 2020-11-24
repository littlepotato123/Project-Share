import React, { useEffect, useState } from 'react';
import {
    useHistory
} from 'react-router-dom';
import List from '../../Components/Categories List/CategoryList';
import Loading from '../../Components/Loading/Loading';
import { Fetch } from '../../Tools';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const scoped = async () => {
            const res = await Fetch(`
                {
                    getCategories {
                        id
                        title
                        description
                    }
                }
            `);
            if(res) {
                setCategories(res.getCategories);
            } else {
                alert('something went wrong');
                history.push('/home');
            } 
        }

        scoped();
    })

    return (
        <div>
            {
                categories ?
                categories.map(category => <List title={category.title} description={category.description} />) 
                :
                <Loading />
            }
        </div>
    )
}

export default Categories;