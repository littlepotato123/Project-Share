import { Arg, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { Comment } from "../../entity/Comment";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";
import { FBAuth, remove } from "../Tools";

@InputType()
class CreateCommentInput {
    @Field(() => Int)
    postId: number;

    @Field()
    token: string

    @Field()
    body: string
};

@InputType()
class CreatePostInput {
    @Field()
    token: string

    @Field()
    title: string

    @Field()
    category: string;

    @Field()
    createdAt: string;

    @Field()
    body: string;
}

@InputType()
class DeletePostInput {
    @Field()
    id: number;

    @Field()
    token: string;
}

@InputType()
class LikePostInput {
    @Field()
    id: number;

    @Field()
    token: string;

    @Field()
    current_likes: number;
}

@Resolver()
export class MutationPostResolver extends BaseEntity {
    @Mutation(() => Post, { nullable: true })
    async create_post(
        @Arg("input", () => CreatePostInput) input: CreatePostInput
    ) {
        const user = await FBAuth(input.token);
        if(user) {
            const post = await Post.create({
                body: input.body,
                title: input.title,
                category: input.category,
                createdAt: input.createdAt,
                author: user.handle,
                likes: 0,
                liked: []
            }).save();
            return post;
        } else {
            return null;
        }
    }

    @Mutation(() => Boolean)
    async delete_post(
        @Arg("input", () => DeletePostInput) input: DeletePostInput
    ) {
        const user = await FBAuth(input.token);
        const post = await Post.findOne({ id: input.id });
        if(user && post) {
            if(post.author == user.handle) {
                await Post.delete({ id: input.id });
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Mutation(() => Comment, { nullable: true })
    async create_comment(
        @Arg("input", () => CreateCommentInput) input: CreateCommentInput
    ) {
        const user = await FBAuth(input.token);
        if(user) {
            const comment = await Comment.create({
                author: user.handle,
                postId: input.postId,
                body: input.body
            }).save();
            return comment;
        } else {
            return null;
        }
    }

    @Mutation(() => Int, { nullable: true })
    async like_post(
        @Arg("input", () => LikePostInput) input: LikePostInput
    ) {
        const user = await FBAuth(input.token);
        const post = await Post.findOne({ where: { id: input.id } });
        if(user && post) {
            let arr = post.liked;
            arr.push(user.password);
            await Post.update(
                {
                    id: input.id
                },
                {
                    likes: post.likes + 1,
                    liked: arr
                }
            );
            let user_arr = user.liked;
            user_arr.push(post.id);
            await User.update(
            {
                id: user.id
            }, 
            {
                liked: user_arr
            });
            const new_post = await Post.findOne({ id: post.id });
            return new_post?.likes;
        } else {
            return null;
        }
    }

    @Mutation(() => Int)
    async unlike_post(
        @Arg("input", () => LikePostInput) input: LikePostInput
    ) {
        const user = await FBAuth(input.token);
        const post = await Post.findOne({ where: { id: input.id } });
        if(user && post) {
            let arr = post.liked;
            arr =   remove(arr, user.password);
            await Post.update(
                {
                    id: input.id
                },
                {
                    likes: post.likes - 1,
                    liked: arr
                }
            );
            let user_arr = user.liked;
            user_arr = remove(user_arr, post.id);
            await User.update(
            {
                id: user.id
            }, 
            {
                liked: user_arr
            });
            const new_post = await Post.findOne({ id: post.id });
            return new_post?.likes;
        } else {
            return null;
        }
    }
};