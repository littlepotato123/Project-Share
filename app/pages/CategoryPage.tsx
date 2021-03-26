import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    category: string | null;
}

const GET_CATEGORY = gql`
    query one_category($title: String!) {
        category: one_category(title: $title) {
            id
            title
            description
        }
    }
`;

const CategoryPage: React.FC<Props> = ({ category }) => {
    if(category) {
        const { data } = useQuery(GET_CATEGORY, {
            variables: {
                title: category
            }
        });
        if(data) {
            return (
                <View key={data.category.id}>
                    <Text>{data.category.title}</Text>
                    <Text>{data.category.description}</Text>
                </View>
            )
        } else {
            return <Text>Wrong Category</Text>
        }
    } else {
        return <Text>Wrong Category</Text>
    }
}

export default CategoryPage;