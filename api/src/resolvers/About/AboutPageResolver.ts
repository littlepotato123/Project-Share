import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { Request } from "../../entity/Request";

@InputType()
class AddRequestInput {
    @Field()
    name: string;

    @Field()
    description: string;
}

@Resolver()
export class AboutPageResolver extends BaseEntity {
    @Mutation(() => Request)
    async add_request(
        @Arg("input", () => AddRequestInput) input: AddRequestInput
    ) {
        const request = await Request.create({
            description: input.description,
            name: input.name
        }).save();
        return request;
    };

    @Query(() => [Request])
    async all_requests() {
        const requests = await Request.find();
        return requests;
    }
}