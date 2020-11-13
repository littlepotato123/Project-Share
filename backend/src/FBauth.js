import { User } from './models/User';

export const FBauth = async (idToken) => {
    const user = await User.findOne({ password: idToken });
    return user;
}