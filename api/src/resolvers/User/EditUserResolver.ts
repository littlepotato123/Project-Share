import { AES } from 'crypto-ts';
import { Arg, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { User } from "../../entity/User";

@InputType()
class NewPasswordInput {
    @Field(() => Int)
    id: number;

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

@Resolver()
export class EditUserResolver extends BaseEntity {
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
        let user = await User.findOne({ where: { id: input.id } })
        if(user) {
            const crypted = AES.encrypt(input.password, 'key').toString();
            await User.update(
                {
                    id: input.id
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