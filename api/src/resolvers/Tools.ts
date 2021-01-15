import { User } from "../entity/User";

export const remove = (arr: Array<any>, str: any): Array<any> => {
    const i = arr.indexOf(str);
    const new_arr = arr.splice(i, i-1);
    return new_arr;
};

export const FBAuth = async (token: string): Promise<User | undefined> => {
    const user = User.findOne({ where: { password: token  } });
    return user;
};

export const user_info = async (handle: string): Promise<User | undefined> => {
    const user = User.findOne({ where: { handle } });
    return user;
}