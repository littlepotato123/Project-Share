import { AES } from 'crypto-ts';
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";

@InputType()
class LoginInput {
    @Field(() => String)
    handle: string;
    
    @Field(() => String)
    password: string;
};

@InputType()
class SignupInput {
    @Field(() => String)
    handle: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    imageUrl: string;

    @Field(() => String)
    bio: string;
};

@Resolver()
export class AuthResolver {
    @Query(() => User, { nullable: true })
    async user_handle(
        @Arg("handle", () => String) handle: string
    ) {
        const user = await User.findOne({ where: { handle } })
        if(user) {
            return user;
        } else {
            return null;
        }
    }

    @Query(() => User, { nullable: true })
    async user_token(
        @Arg("token", () => String) token: string
    ) {
        const user = await User.findOne({ where: { password: token } })
        return user;
    }
    
    @Mutation(() => User, { nullable: true })
    async signup(
        @Arg("input", () => SignupInput) input: SignupInput
    ) {
        const found = await User.find({ where: { handle: input.handle } });
        if(found.length > 0) {
            return null;
        }
        
        const password = AES.encrypt(input.password, 'key').toString()
        console.log(password);
        const user = await User.create({
            handle: input.handle,
            imageUrl: input.imageUrl,
            password,
            awards: [],
            points: 0,
            bio: input.bio,
            supported: [],
            supporting: [],
            supporters: 0,
            layout: 0,
            messages: [],
            liked: []
        }).save();
        return user;
    }

    @Mutation(() => String)
    async login(
        @Arg("input", () => LoginInput) input: LoginInput
    ) {
        const user = await User.findOne({ where: { handle: input.handle } });
        if(user) {
            const pass = AES.encrypt(input.password, 'key').toString();
            const decrypt_2 = AES.decrypt(pass, 'key').toString();
            const decrypt = AES.decrypt(user.password, 'key').toString();
            if(decrypt == decrypt_2) {
                return user.password;
            } else {
                return "Error: Password Incorrect!"
            }
        } else {
            return "Error: User Not Found!"
        }
    }
}