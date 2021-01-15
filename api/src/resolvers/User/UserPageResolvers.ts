import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from 'type-graphql';
import { BaseEntity } from "typeorm";
import { User } from '../../entity/User';
import { remove } from '../Tools';

@InputType()
class UserSupportingInput {
    @Field(() => Int)
    id: number;

    @Field()
    token: string;

    @Field(() => Int)
    supporters: number;
}

@InputType()
class AddMessageInput {
    @Field()
    body: string;

    @Field(() => Int)
    userId: number;
};

@Resolver()
export class UserPageResolver extends BaseEntity {
    @Mutation(() => String, { nullable: true })
    async add_message(
        @Arg("input", () => AddMessageInput) input: AddMessageInput
    ) {
        const user = await User.findOne({ where: { id: input.userId } });
        if(user) {
            const messages = user.messages;
            messages.push(input.body);
            await User.update(
                {
                    id: input.userId
                },
                {
                    messages
                }
            );
            return input.body;
        } else {
            return null;
        }
    }

    @Query(() => [String], { nullable: true })
    async all_messages(
        @Arg("id", () => Int) id: number
    ) {
        const user = await User.findOne({ where: { id } });
        if(user) {
            return user.messages;
        } else {
            return null;
        }
    }

    @Mutation(() => Int, { nullable: true })
    async support(
        @Arg("input", () => UserSupportingInput) input: UserSupportingInput
    ) {
        const main = await User.findOne({ where: { id: input.id } })
        const second = await User.findOne({ where: { password: input.token } });
        if(main && second) {
            let supported = main.supported;
            supported.push(input.token);
            let supporting = second.supporting;
            supporting.push(main.password)
            await User.update(
                {
                    id: input.id
                },
                {
                    supporters: input.supporters + 1,
                    supported
                }
            );
            await User.update(
                {
                    id: second.id
                },
                {
                    supporting
                }
            );
            const user = await User.findOne({ where: { id: main.id } })
            if(user) {
                return user.supporters
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Mutation(() => Int, { nullable: true })
    async unsupport(
        @Arg("input", () => UserSupportingInput) input: UserSupportingInput
    ) {
        const main = await User.findOne({ where: { id: input.id } })
        const second = await User.findOne({ where: { password: input.token } });
        if(main && second) {
            let supported = main.supported;
            let supporting = second.supporting;
            supported = remove(supported, input.token)
            supporting = remove(supporting, main.password);
            await User.update(
                {
                    id: input.id
                },
                {
                    supporters: input.supporters - 1,
                    supported
                }
            );
            await User.update(
                {
                    id: second.id
                },
                {
                    supporting
                }
            );
            const user = await User.findOne({ where: { id: main.id } })
            if(user) {
                return user.supporters
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Query(() => [User], { nullable: true })
    async leaderboard() {
        let init = (await User.find()).sort((a, b) => (a.supporters > b.supporters) ? 1 : -1);
        for(let i: number = 0; i < 3; i++) {
            const current = init[i];
            const next = init[i + 1];
            if(current && next) {
                const curr_sup = current.supporters;
                const next_sup = next.supporters;
                const range = curr_sup / 10;
                if(curr_sup - next_sup > range) {
                    continue;
                } else {
                    if(next.points > current.points) {
                        init[i + 1] = current;
                        init[i] = next;
                    }
                    if(next.awards.length > current.awards.length) {
                        init[i + 1] = current;
                        init[i] = next;
                    } else {
                        init[i] = current;
                        init[i + 1] = next
                    }
                }
            } else {
                break;
            }
        };
        return init;
    }
}