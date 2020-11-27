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
      const messages = await Message.find({ userId });
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
      const post = await Post.findOne({ author: handle });
      return post;
    },
    getCategory: async(_, { category }) => {
      return await Category.findOne({ title: category });
    },
    requests: async (_, {}) => await Request.find({}).limit(25)
  },
  Mutation: {
    signup: async (_, { handle, email, password, imageUrl, bio }) => {
      const users = await User.find({ handle });
      if(users.length > 0) {
        return null;
      } else {
        const crypt_pass = AES.encrypt(password, 'key').toString();
        const user = await User.create({ handle, email, password: crypt_pass, supporters: 0, imageUrl, bio })
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
      return true;
    },
    unsupportUser: async (_, { id, current_supporters }) => {
      await User.updateOne(
        { _id: id },
        {$set: {'supporters': current_supporters - 1}}
      );
      console.log(await User.findOne())
      return true;
    },
    deletePost: async (_, { id }) => {
      await Post.deleteOne({ _id: id });
      return true;
    },
    createCategories: async (_, {  }) => {
      (await Category.create({ title: "SampleCategory", description: "Sample Category is cool" })).save();
      return await Category.find();
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