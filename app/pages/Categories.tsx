import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import CategoryList from '../components/CategoryList';
import { Category } from '../Tools';

const CATEGORIES = gql`
    query {
        categories: all_categories {
            id
            title
            description
        }
    }
`;

interface Props {
    setCategory: React.Dispatch<React.SetStateAction<string | null>>
}

const Categories: React.FC<Props> = ({ setCategory }) => {
    const { data } = useQuery(CATEGORIES);

    if(data) {
        return (
            <View>
                {
                    data.categories.map((c: Category) => <CategoryList setCategory={setCategory} category={c} />)
                }
            </View>   
        );
    } else {
        return <Text>Loading...</Text>
    }
}

export default Categories;