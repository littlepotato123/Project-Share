import React from 'react';
import { Text, View } from 'react-native';

const About: React.FC = () => {
    return (
        <><View>
            <Text>About Project Sh@re</Text>
            <Text>Project Sh@re is a platform created to support users who wish to apprise others about
            struggles and problems being tackled across the globe. As a community, we discuss
            to improve ourselves and determine solutions to mistakes and problems we cause in
            our daily lives. As people, we need to better ourselves and Project Sh@re gives us an
            opportunity. Project Sh@re is welcoming to all users to provoke change. Users may interact
            with one another to share their ideas. Here, we build thoughts,
              wonder, and supporters to a common cause. Welcome to Project Sh@re!</Text>
        </View>
            <View>
                <Text>Why Project Sh@re</Text>
                <Text>Many ask, why? Why shouldn't I use another social media instead? How is this any
                different? Project Sh@re is specifically created to help discuss world-wide issues. A platform
                only used to inform, learn, and promote. Not all communities thrive as ours do; it's important
                for the world to understand different and newer points of view. This platform is not used for any
        personal gain. At Project Sh@re, we take part in making the world a better place!</Text>
            </View>
            <View>
                <Text>Our Policy</Text>
                <Text>
                    /**
                    Put all this into a list
                    */
                    All comments and posts must be appropriate and respectful at all times
                    Users may not express any offensive thoughts
                    Unnecessary spam will prevent users from commenting and/or posting for a certain
                    period of time
            </Text>
            </View>
            <View>
                <Text>Guest VS User</Text>
                <Text>As members of Project Sh@re, users have access to all the features on the platform. However, as guests, they have limited access to the website. Guests are prevented to taking part in the following:
                /**
                Put all this into a list
                */
                Like posts
                Comment on posts
                Support Users
                Message Users
            </Text>
            </View>
            <View>
                <Text>Special Features</Text>
                <Text>Message User:
                Project Sh@re's users get the opportunity to message other influencers about anything they beleive in. Up to eight messages are displayed to the reciever, the rest of the messages are
                linked to another page. Users on both ends can communicate with each other constantly.
                </Text>
                <Text>Ways to Submit:
                /**
                Put all this into a list
                */
                Windows - Ctrl + Shift
                IOS - Cmd + Shift
                </Text>
                <Text>Leaderboard Algorithm:
                The leaderboard algorithm is just a sorting algorithm that takes the top 5 users, with the highest supporters and ranks them.
                After getting the top 5 users, we start sorting through the top 3, so if you are in 4th or 5th place, you will stay in ranking.
                If you are in any ranking above that, just purily based on the amount of supporters, there is a chance that your ranking might change!
                We go through the top 3 users from the top 5 based on supporters, and we check if the user that was in the ranking right before the user that we
                currently are checking, is relatively close in the amount of supporters. We determine this by checking if the number of supporters of the user ranking below is atleast
                90% of the user that we are currently checking. If the supporter count is relatively close between the two users, then we check if the amount of points is greater, for the user with the lower ranking.
                If the lower ranking user does have more points, then the current user and the user ranking below it switch places. After that we check for the amount of awards that each user has won. This is the crucial factor, since this is that last  factor that can switch your ranking.
                If the user ranking below has less awards, in the end, they maintain their rank.
                </Text>
            </View>


        </>
    );
}

export default About;