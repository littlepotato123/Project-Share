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
    }
//     app.get('/getPopular', (req, res) => {
//   db
//     .collection('posts')
//     .orderBy('likes', 'desc')
//     .limit(20)
//     .get()
//     .then(data => {
//       let posts = [];
//       data.forEach(doc => {
//         posts.push({
//           postId: doc.id,
//           body: doc.data().body,
//           userHandle: doc.data().userHandle,
//           createdAt: doc.data().createdAt,
//           author: doc.data().author,
//           likes: doc.data().likes,
//           category: doc.data().category,
//           title: doc.data().title
//         })
//       });
//       return res.json(posts);
//     })
//     .catch(err => {
//       res.status(500).json({ error: 'Something went wrong' })
//     })
// })
//     app.get('/leaderboard', (req, res) => {
//   db
//     .collection('users')
//     .orderBy('supporters', 'desc')
//     .limit(10)
//     .get()
//     .then(data => {
//       let users = [];
//       data.forEach(doc => {
//         users.push(doc.data())
//       });
//       return res.json(users);
//     })
//     .catch(err => {
//       res.status(500).json({ error: 'Something went wrong' })
//     })
// })
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
      await User.deleteMany({});
      await Post.deleteMany({});
      await Comment.deleteMany({});
      await Category.deleteMany({});
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
    }
  }
};