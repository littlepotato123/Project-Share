import { AES } from 'crypto-ts';
import { Arg, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { User } from "../../entity/User";
import { FBAuth } from '../Tools';

@InputType()
class NewPasswordInput {
    @Field()
    token: string;

    @Field()
    password: string;
};

@InputType()
class NewLayoutInput {
    @Field(() => Int)
    id: number;

    @Field(() => Int)
    layout: number;
}

@InputType()
class NewBioInput {
    @Field(() => Int)
    id: number;

    @Field()
    bio: string;
}

@Resolver()
export class EditUserResolver extends BaseEntity {
    @Mutation(() => String, { nullable: true })
    async new_bio(
        @Arg("input", () => NewBioInput) input: NewBioInput
    ) {
        const user = await User.findOne({ where: { id: input.id }});
        if(user) {
            await User.update(
                {
                    password: user.password
                },
                {
                    bio: input.bio
                }
            );
            const new_user = await User.findOne({ where: { id: input.id } });
            if(new_user) {
                return new_user.bio;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Mutation(() => Int, { nullable: true })
    async new_layout(
        @Arg("input", () => NewLayoutInput) input: NewLayoutInput,
    ) {
        let user = await User.findOne({ where: { id: input.id } })
        if(user) {
            await User.update(
                {
                    id: input.id
                },
                {
                    layout: input.layout
                }
            );
            user = await User.findOne({ where: { id: input.id } });
            return user?.layout;
        } else {
            return null;
        }
    }

    @Mutation(() => String, { nullable: true })
    async new_password(
        @Arg("input", () => NewPasswordInput) input: NewPasswordInput
    ) {
        const user = await FBAuth(input.token);
        if(user) {
            const crypted = AES.encrypt(input.password, 'key').toString();
            await User.update(
                {
                    id: user.id
                },
                {
                    password: crypted
                }
            );
            return crypted;
        } else {
            return null;
        }
    }
}