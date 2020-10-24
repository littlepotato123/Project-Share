import React from 'react';

const CategoryList = (props) => {
    return (
        <div className="category-list-item">
            <h1>{props.title}</h1>
        </div>
    );
};

export default CategoryList;