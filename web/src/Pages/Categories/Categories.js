import React, { useState } from 'react';
import List from '../../Components/Categories List/CategoryList';
import Loading from '../../Components/Loading/Loading';

const Categories = () => {
    const [categories, setCategories] = useState([]);

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