import { Mutation, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { Category } from "../../entity/Category";
import { Comment } from "../../entity/Comment";
import { Post } from "../../entity/Post";
import { Request } from '../../entity/Request';
import { User } from "../../entity/User";

@Resolver()
export class TestingResolver extends BaseEntity {
    @Mutation(() => Boolean)
    async clear() {
        Category.delete({});
        Comment.delete({});
        User.delete({})
        Post.delete({});
        Request.delete({});
        return true;
    }
}