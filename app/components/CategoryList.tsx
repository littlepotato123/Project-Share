import React from 'react';
import { Button, Text, View } from 'react-native';
import { Category } from '../Tools';

interface Props {
    category: Category;
    setCategory: React.Dispatch<React.SetStateAction<string | null>>
}

const CategoryList: React.FC<Props> = ({ category: {
    id,
    title,
    description
}, setCategory }) => {
    return (
        <View key={id}>
            <Text>{title}</Text>
            <Text>{description}</Text>
            <Button 
                title="View" 
                onPress={() => {
                    setCategory(title);
                }}
            />
        </View>
    );
}

export default CategoryList;