import React from 'react';
import { Button, View } from 'react-native';
import { Pages } from '../Tools';

interface Props {
    page: Pages,
    setPage: React.Dispatch<React.SetStateAction<Pages>>
}

const Navigation: React.FC<Props> = ({
    page,
    setPage
}) => {
    return (
        <View>
            <View>
                <Button
                    title="Home"
                    onPress={() => setPage(Pages.HOME)}
                />
                <Button
                    title="Authentication" 
                    onPress={() => setPage(Pages.AUTH)}
                />
                <Button
                    title="About"
                    onPress={() => setPage(Pages.ABOUT)}
                />
                <Button 
                    title="Categories" 
                    onPress={() => setPage(Pages.CATEGORIES)}
                />
                <Button
                    title="Edit"
                    onPress={() => setPage(Pages.EDIT)}
                />
                <Button
                    title="Leaderboard"
                    onPress={() => setPage(Pages.LEADERBOARD)}
                />
                <Button
                    title="New Post"
                    onPress={() => setPage(Pages.NEWPOST)}
                />
                <Button
                    title="Trending"
                    onPress={() => setPage(Pages.TRENDING)}
                />
            </View>
        </View>
    );
}

export default Navigation;