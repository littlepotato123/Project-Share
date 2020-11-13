import React, { useEffect, useState } from 'react'
import List from '../../Components/Categories List/CategoryList';
import Loading from '../../Components/Loading/Loading';

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "https://us-central1-project-share-8df06.cloudfunctions.net/api/";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(proxyUrl + url + 'getCategories')
            .then(x => x.json())
            .then(data => setCategories(data));        
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