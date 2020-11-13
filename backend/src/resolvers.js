import { AES } from 'crypto-js';
import { FBauth } from './Fbauth';
import { Category } from './models/Category';
import { Comment } from './models/Comment';
import { Message } from './models/Message';
import { Post } from './models/Post';
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
    handle: async (_, { token }) => {
      const user = await FBauth(token);
      return user.handle;
    },
    getMessages: async (_, { userId }) => {
      const messages = await Message.find({ userId });
      return messages;
    },
    categoryPost: async (_, { category }) => {
      const post = await Post.findOne({ category });
      return post;
    },
    leaderboard: async () => await User.find().sort({ supporters: -1 }).limit(5),
    getPopular: async () => await Post.find().sort({ likes: -1 }).limit(20)
  },
  Mutation: {
    signup: async (_, { handle, email, password }) => {
      const users = await User.find({ handle });
      if(users.length > 0) {
        return null;
      } else {
        const crypt_pass = AES.encrypt(password, 'key').toString().substring(0, 10);
        const user = await User.create({ handle, email, password: crypt_pass, supporters: 0, imageUrl: "" })
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
      return true;
    },
    login: async(_, { handle, password }) => {
      const user = await User.findOne({ handle });
      if(user == null) {
        return null;
      }
      const encrypt = AES.encrypt(password, 'key').toString().substring(0, 10);
      if(encrypt == user.password) {
        return user.password;
      } else {
        return null;
      }
    },
    newPost: async (_, { token, title, category, body }) => {
      const user = await FBauth(token);
      const post = await Post.create({ title, category, author: user.handle, likes: 0, body });
      await post.save();
      await Category.create({ title: category });
      return post;
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
      return true;
    },
    unlikePost: async (_, { id, current_like }) => {
      await Post.updateOne(
        { _id: id },
        {$set: {'likes': current_like - 1 }}
      );
      return true;
    },
    supportUser: async (_, { id, current_supporters }) => {
      await User.updateOne(
        { _id: id },
        {$set: {'supporters': current_supporters + 1}}
      );
      return true;
    },
    unsupportUser: async (_, { id, current_supporters }) => {
      await User.updateOne(
        { _id: id },
        {$set: {'supporters': current_supporters - 1}}
      );
      console.log(await User.findOne())
      return true;
    }
  }
};