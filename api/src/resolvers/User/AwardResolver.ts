import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { User } from "../../entity/User";

@InputType()
class NewAwardInput {
    @Field(() => Int)
    id: number;
    
    @Field()
    title: string;

    @Field(() => Int)
    points: number;
}

@Resolver()
export class AwardResolver extends BaseEntity {
    @Mutation(() => Int, { nullable: true })
    async new_award(
        @Arg("input", () => NewAwardInput) input: NewAwardInput
    ) {
        const user = await User.findOne({ where: { id: input.id } });
        if(user) {
            const awards = user.awards;
            awards.push(input.title);
            await User.update(
                {
                    id: input.id
                },
                {
                    points: user.points + input.points,
                    awards
                }
            );
            let new_user = await User.findOne({ where: { id: input.id } })
            console.log(new_user?.awards);
            return new_user?.points;
        } else {
            return null;
        }
    }

    @Query(() => [String], { nullable: true })
    async awards(
        @Arg("id", () => Int) id: number
    ) {
        const user = await User.findOne({ where: { id } })
        if(user) {
            return user.awards;
        } else{
            return null;
        }
    }
}