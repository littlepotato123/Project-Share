import { Mutation, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { User } from "../../entity/User";

@Resolver()
export class TestingResolver extends BaseEntity {
    @Mutation(() => Boolean)
    async clear() {
        await User.clear();
        return true;
    }
}