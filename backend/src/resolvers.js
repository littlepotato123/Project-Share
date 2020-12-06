import { AES } from 'crypto-js';
import { FBauth } from './Fbauth';
import { Category } from './models/Category';
import { Comment } from './models/Comment';
import { Message } from './models/Message';
import { Post } from './models/Post';
import { Request } from './models/Request';
import { User } from './models/User';

export const resolvers = {
  Query: {
    homePage: async () => await Post.find(),
    getComments: async (_, { id }) => {
      const comments = await Comment.find({ postId: id });
      return comments;
    },
    user: async (_, { handle }) => {
      const user = await User.findOne({ handle });
      return user;
    },
    getCategories: async (_, {}) => {
      const categories = await Category.find({});
      return categories;
    },
    categoryPosts: async (_, { category }) => {
      const posts = await Post.find({ category });
      return posts; 
    },
    userPosts: async (_, { handle }) => {
      const posts = await Post.find({ author: handle });
      return posts;
    },
    getMessages: async (_, { userId }) => {
      const messages = await Message.find({ userId }).limit(8);
      return messages;
    },
    categoryPost: async (_, { category }) => {
      const post = await Post.findOne({ category });
      return post;
    },
    leaderboard: async () => await User.find().sort({ supporters: -1 }).limit(5),
    getPopular: async () => await Post.find().sort({ likes: -1 }).limit(20),
    getOneCategory: async (_, { category }) => await Post.findOne({ category }),
    tokenUser: async(_, { token }) => await FBauth(token),
    userOnePost: async (_, { handle }) => {
      const post = await Post.find({ author: handle }).sort({ likes: -1 }).limit(1);
      return post[0];
    },
    getCategory: async(_, { category }) => {
      return await Category.findOne({ title: category });
    },
    requests: async (_, {}) => await Request.find({}).limit(25),
    allMessages: async(_, { id }) => {
      return await Message.find()
    }
  },
  Mutation: {
    signup: async (_, { handle, password, imageUrl, bio }) => {
      const users = await User.find({ handle });
      if(users.length > 0) {
        return null;
      } else {
        const crypt_pass = AES.encrypt(password, 'key').toString();
        const user = await User.create({ handle, password: crypt_pass, supporters: 0, imageUrl, bio })
        await user.save()
        return user;
      }
    },
    clear: async (_, {}) => {
      // Delete Many deletes any object it finds with the specific parameters
      await User.deleteMany({});
      await Post.deleteMany({});
      await Comment.deleteMany({});
      await Category.deleteMany({});
      await Message.deleteMany({});
      await Request.deleteMany({});
      return true;
    },
    login: async(_, { handle, password }) => {
      const user = await User.findOne({ handle });
      if(user == null) {
        return null;
      } else {
        const decrypt = AES.decrypt(user.password, 'key').toString();
        const encrypt = AES.encrypt(password, 'key').toString();
        const new_decrypt = AES.decrypt(encrypt, 'key').toString();
        if(decrypt == new_decrypt) {
          return user.password;
        } else {
          return null;
        }
      }
    },
    newPost: async (_, { token, title, category, body }) => {
      const user = await FBauth(token);
      if(user) {
        const post = await Post.create({ title, category, author: user.handle, likes: 0, body });
        await post.save();
        return post;
      } else {
        return null;
      }
    },
    newComment: async (_, { token, body, id }) => {
      const user = await FBauth(token);
      const comment = await Comment.create({ body, postId: id, author: user.handle });
      await comment.save();
      console.log(comment);
      return true;
    },
    createMessage: async (_, { token, body, userId }) => {
      const user = await FBauth(token);
      const message = await Message.create({ body, userId, author: user.handle });
      return message;
    },
    likePost: async (_, { id, current_like }) => {
      await Post.updateOne(
        { _id: id },
        {$set: {'likes': current_like + 1 }}
      );
      const post = await Post.findOne({ _id: id });
      return post.likes;
    },
    unlikePost: async (_, { id, current_like }) => {
      await Post.updateOne(
        { _id: id },
        {$set: {'likes': current_like - 1 }}
      );
      const post = await Post.findOne({ _id: id });
      return post.likes;
    },
    supportUser: async (_, { id, current_supporters }) => {
      await User.updateOne(
        { _id: id },
        {$set: {'supporters': current_supporters + 1}}
      );
      const user = await User.findOne({ _id: id });
      return user.supporters;
    },
    unsupportUser: async (_, { id, current_supporters }) => {
      await User.updateOne(
        { _id: id },
        {$set: {'supporters': current_supporters - 1}}
      );
      const user = await User.findOne({ _id: id });
      return user.supporters;
    },
    deletePost: async (_, { id }) => {
      await Post.deleteOne({ _id: id });
      return true;
    },
    createCategories: async (_, {  }) => {
      const categories = await Category.find();
      if(categories.length > 0) {
        return categories;
      } else {
        (await Category.create({ title: "Racism", description: "This is a category where anything that you feel is discriminating by race in politics, cities, or even your own job. You can feel free to be as detailed as you would like!" })).save();
        (await Category.create({ title: "Politics", description: "This is a category where you can post to whenever you find news that you feel the need to share about. Whethere it is a national update, or a small city construction update, if you feel the need to put it online, put it on Project Sh@re!" })).save();
        (await Category.create({ title: "Issues", description: "This is a category where you can post anything about any issues that you are facing, you see others facing, or even the nation or world facing. This can be as little as a small manifacture mistake, all the way to a global pandemic." })).save();
        (await Category.create({ title: "Campaigning", description: "Feel free to post anything that promotes your channel, accounts, or political status on Project Sh@are using this category!" })).save();
        (await Category.create({ title: "Introduction", description: "Project Sh@re is a online world, just like any other, and usually it helps to introduce yourself before trying to get famous or even post anything online. In this category, you can post anything about yourself or anything you feel the need to share with others about yourself!" })).save();
        (await Category.create({ title: "Anything", description: "This category is for really anything. Mainly used for comments and user feedback, many authors use this category to let their supporters talk to them and let them know what they would like to hear from the author." })).save();
        (await Category.create({ title: "Economics", description: "This category is for any new business or economic spikes or downfalls. You can use this category to update the users of Project Sh@re on what is going on in the world of economics, stocks, trade market, and finance as a whole!" })).save();
        return await Category.find();
      }
    },
    newRequest: async(_, { name, description }) => {
      const r = await Request.create({ name, description });
      return r;
    },
    deleteRequest: async (_, { id}) => {
      await Request.deleteOne({ _id: id }); 
      return true;
    }
  }
};