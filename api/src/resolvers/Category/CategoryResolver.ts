import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";
import { Category } from "../../entity/Category";
import { Post } from "../../entity/Post";

@InputType()
class CreateCategoryInput {
    @Field()
    title: string;

    @Field()
    description: string;
}

@Resolver()
export class CategoryResolver extends BaseEntity {
    @Mutation(() => Boolean) 
    async category_init() {
        const categories = await Category.find();
        // Testing
        if(categories.length > 0) {
            return false;
        } else {
            await Category.create({ title: "Racism", description: "This is a category where anything that you feel is discriminating by race in politics, cities, or even your own job. You can feel free to be as detailed as you would like!" }).save();
            await Category.create({ title: "Politics", description: "This is a category where you can post to whenever you find news that you feel the need to share about. Whethere it is a national update, or a small city construction update, if you feel the need to put it online, put it on Project Sh@re!" }).save();
            await Category.create({ title: "Issues", description: "This is a category where you can post anything about any issues that you are facing, you see others facing, or even the nation or world facing. This can be as little as a small manifacture mistake, all the way to a global pandemic." }).save();
            await Category.create({ title:"Campaigning", description: "Feel free to post anything that promotes your channel, accounts, or political status on Project Sh@are using this category!" }).save();
            await Category.create({ title: "Introduction", description: "Project Sh@re is a online world, just like any other, and usually it helps to introduce yourself before trying to get famous or even post anything online. In this category, you can post anything about yourself or anything you feel the need to share with others about yourself!" }).save()
            await Category.create({ title: "Anything", description: "This category is for really anything. Mainly used for comments and user feedback, many authors use this category to let their supporters talk to them and let them know what they would like to hear from the author." }).save();
            await Category.create({ title: "Economics", description: "This category is for any new business or economic spikes or downfalls. You can use this category to update the users of Project Sh@re on what is going on in the world of economics, stocks, trade market, and finance as a whole!" }).save();
            return true;
        }
    };

    @Query(() => [Category], { nullable: true })
    async all_categories() {
        const categories = await Category.find();
        return categories;
    };

    @Query(() => Category, { nullable: true })
    async one_category(
        @Arg("title", () => String) title: string
    ) {
        const category = await Category.findOne({ title });
        return category;
    };

    @Mutation(() => Category)
    async create_category(
        @Arg("input", () => CreateCategoryInput) input: CreateCategoryInput
    ) {
        return await Category.create({ title: input.title, description: input.description }).save();
    };

    @Query(() => [Post], { nullable: true })
    async category_posts(
        @Arg("title", () => String) title: string
    ) {
        const posts = await Post.find({ where: { category: title } });
        return posts;
    };

    @Query(() => Post, { nullable: true })
    async sample_category_post(
        @Arg("title", () => String) title: string
    ) {
        const post = await Post.findOne({ where: { category: title } })
        return post;
    }
};