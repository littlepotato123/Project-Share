import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from 'type-graphql';
import { BaseEntity } from "typeorm";
import { Message } from '../../entity/Message';

@InputType()
class AddMessageInput {
    @Field()
    body: string;

    @Field()
    token: string;

    @Field(() => Int)
    userId: number;
};

@Resolver()
export class UserPageResolver extends BaseEntity {
    @Mutation(() => Message)
    async add_message(
        @Arg("input", () => AddMessageInput) input: AddMessageInput
    ) {
        const message = await Message.create({
            authorToken: input.token,
            body: input.body,
            userId: input.userId
        }).save();
        return message;
    };

    @Query(() => [Message])
    async all_messages(
        @Arg("userId") userId: number
    ) {
        const messages = await Message.find({ where: { userId } });
        return messages;
    }

    // Support

    // UnSupport
}