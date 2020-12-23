import { AES } from 'crypto-js';
import { FBauth } from './Fbauth';
import { Award } from './models/Award';
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
      console.log(user)
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
    leaderboard: async () => {
      let l = await User.find().sort({ supporters: -1 }).limit(5)
      for(var i = 0; i < l.length; i++) {
        const current = l[i];
        const next = l[i + 1];
        const curr_sup = current.supporters;
        const next_sup = next.supporters;
        const range = curr_sup / 10;
        if(curr_sup - next_sup > range) {
          continue;
        } else {
        if(next && current) {
          if(next.points > current.points) {
            l[i + 1] = current;
            l[i] = next;
          }
          if(next.awards.length > current.awards.length) {
            l[i + i] = current;
            l[i] = next;
          } else {
            l[i] = current;
            l[i + 1] = next;
          }
        } else {
          break;
        }

        } 
      };
      console.log(l);
      return l;
    },
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
      return await Message.find({ userId: id });
    }
  },
  Mutation: {
    signup: async (_, { handle, password, imageUrl, bio }) => {
      const users = await User.find({ handle });
      if(users.length > 0) {
        return null;
      } else {
        const crypt_pass = AES.encrypt(password, 'key').toString();
        const awards = [];
        const points = 0;
        const user = await User.create({ handle, password: crypt_pass, supporters: 0, points, layout: 0, awards, imageUrl, bio, liked: [], supported: [], supporting: [] });
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
    newPost: async (_, { token, title, date, category, body }) => {
      const user = await FBauth(token);
      if(user) {
        const post = await Post.create({ title, date, layout: 0, category, author: user.handle, likes: 0, body, liked: [] });
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
      return true;
    },
    createMessage: async (_, { token, body, userId }) => {
      const user = await FBauth(token);
      const message = await Message.create({ body, userId, author: user.handle });
      return message;
    },
    likePost: async (_, { id, current_like, token }) => {
      let post = await Post.findOne({ _id: id });
      if(post) {
        await Post.updateOne(
          { _id: id },
          {$set:{'likes': current_like + 1}}
        );
        if(token) {
          const user = await User.findOne({ password: token });
          if(user) {
            let liked = user.liked;
            let post_liked = post.liked;
            if(post_liked.includes(token)) {
              return null;
            } else {
              post_liked.push(token);
              liked.push(id);
              await Post.updateOne(
                { _id: id },
                {$set: {'liked': post_liked}}
              );
              await User.updateOne(
                { password: token },
                {$set:{'liked': liked}}
              );
            }
          }
        } 
        post = await Post.findOne({ _id: id });
        return post.likes;
      } else {
        return null;
      }
    },
    unlikePost: async (_, { id, current_like, token }) => {
      let post = await Post.findOne({ _id: id });
      let user = await User.findOne({ password: token });
      if(post) {
        await Post.updateOne(
          {_id: id},
          {$set: {'likes': current_like - 1}}
        )
        if(token && user) {
          let liked = user.liked;
          let post_liked = post.liked;
          post_liked.remove(token);
          liked.remove(id);
          console.log(liked);
          console.log(post_liked);
          await Post.updateOne(
            { _id: id },
            {$set: {'liked': post_liked}}
          );
          await User.updateOne(
            { password: token },
            {$set:{'liked': liked}}
          );
        }
        post = await Post.findOne({ _id: id });
        return post.likes;
      }
      return null;
    },
    supportUser: async (_, { id, current_supporters, token }) => {
      let main_user = await User.findOne({ password: id });
      let user = await User.findOne({ password: token });
      if(main_user && user) {
        const supported = user.supported;
        const supporting = user.supporting;
        if(supported.includes(token) || supporting.includes(id)) {
          return null;
        } else {
          supported.push(id);
          supporting.push(token);
          await User.updateOne(
            { password: id },
            {$set: {'supporting': supporting, 'supporters': current_supporters + 1}}
          );
          await User.updateOne(
            { password: token },
            {$set: {'supported': supported}}
          );
          main_user = await User.findOne({ password: id });
          user = await User.findOne({ password: token });
          return main_user.supporters;
        } 
      } 
      return null;
    },
    unsupportUser: async (_, { id, current_supporters, token }) => {
      let main_user = await User.findOne({ password: id });
      let user = await User.findOne({ password: token });
      if(main_user && user) {
        const supported = user.supported;
        const supporting = user.supporting;
        if(supported.includes(token) || supporting.includes(id)) {
          return null;
        } else {
          supported.remove(id);
          supporting.remove(token);
          await User.updateOne(
            { password: id },
            {$set: {'supporting': supporting, 'supporters': current_supporters - 1}}
          );
          await User.updateOne(
            { password: token },
            {$set: {'supported': supported}}
          );
          main_user = await User.findOne({ password: id });
          user = await User.findOne({ password: token });
          return main_user.supporters;
        } 
      } 
      return null;
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
    deleteRequest: async (_, { id }) => {
      await Request.deleteOne({ _id: id }); 
      return true;
    },
    newAward: async (_, { token, title, points }) => {
      const award = await Award.create({ title, points });
      let user = await User.findOne({ password: token });
      if(user) {
        let awards = user.awards;
        console.log(user.points);
        awards.push(award);
        console.log(awards);
        const p = user.points + points;
        await User.updateOne(
          { password: token },
          {
            $set: { points: p, awards }
          }
        );
        user = await User.findOne({ password: token });
        console.log(user);
        return true;
      } else {
        return null;
      }
    },
    updateUser: async (_, { token, bio, layout }) => {
      const user = await User.findOne({ password: token });
      if(user) {
        await User.updateOne(
          { _id: user.id },
          { $set: { 
              bio,
              layout
           } 
          }
        );
        const r = await User.findOne({ _id: user.id });
        return r;
      } else {
        return null;
      }
    },
    newPassword: async (_, { token, new_pass }) => {
      const user = await User.findOne({ password: token });
      if(user) {
        const new_password = AES.encrypt('hi', 'key')
        await User.updateOne(
          { id: user.id },
          { $set: { password: new_password }}
        )
        return true;
      } else {
        return false;
      }
    }
  }
};