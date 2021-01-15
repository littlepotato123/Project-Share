import { Arg, Int, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { Comment } from "../../entity/Comment";
import { Post } from "../../entity/Post";

@Resolver()
export class GetPostResolver extends BaseEntity {
    @Query(() => [Post], { nullable: true })
    async homepage() {
        const posts = await Post.find();
        return posts;
    }

    @Query(() => [Post], { nullable: true })
    async user_posts(
        @Arg("handle", () => String) handle: string
    ) {
        const posts = await Post.find({ where: { author: handle } });
        return posts;
    };

    @Query(() => Post, { nullable: true })
    async user_post(
        @Arg("handle", () => String) handle: string
    ) {
        const post = await Post.findOne({ where: { author: handle } });
        return post;
    }

    @Query(() => [Post], { nullable: true })
    async trending_posts() {
        let posts = (await Post.find()).sort((a, b) => (a.likes > b.likes) ? 1 : -1);
        if(posts.length > 20) {
            return posts.splice(0, 21)
        } else {
            return posts;
        }
    };


    @Query(() => [Comment], { nullable: true })
    async get_comments(
        @Arg("id", () => Int) id: number
    ) {
        const comments = await Comment.find({ where: { postId: id } });
        return comments;
    }
};