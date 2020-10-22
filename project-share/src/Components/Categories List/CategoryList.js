import React from 'react';

const CategoryList = (props) => {
    return (
        <div className="category-list-item">
            <h1>{props.title}</h1>
            <h1>This is a category</h1>
        </div>
    );
};

export default CategoryList;