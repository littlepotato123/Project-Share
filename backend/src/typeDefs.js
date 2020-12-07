import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    homePage: [Post!]!
    getComments(id: String!): [Comment!]!
    user(handle: String!): User
    getCategories: [Category!]
    categoryPosts(category: String!): [Post!]
    userPosts(handle: String!): [Post!]
    getMessages(userId: String!): [Message!]
    categoryPost(category: String!): Post
    leaderboard: [User!]
    getPopular: [Post!]
    getOneCategory(category: String!): Post
    tokenUser(token: String!): User
    userOnePost(handle: String!): Post
    getCategory(category: String!): Category
    requests: [Request!]
    allMessages(id: String!): [Message!]!
  }

  type Request {
    id: ID!
    name: String!
    description: String!
  }

  type Message {
    id: ID!
    body: String!
    author: String!
    userId: String!
  }

  type Comment {
    id: ID!
    body: String!
    author: String!
    postId: String!
  }

  type Post {
    id: ID!
    title: String!
    author: String!
    category: String!
    likes: Int!
    date: String!
    body: String!
  }

  type Category {
    id: ID!
    title: String!
    description: String!
  }

  type User {
    id: ID!
    handle: String!
    password: String!
    imageUrl: String
    supporters: Int!
    bio: String!
  }

  type Mutation {
    signup(handle: String!, password: String!, imageUrl: String, bio: String!): User
    login(handle: String!, password: String!): String
    clear: Boolean!
    newPost(token: String!, date: String!, title: String!, category: String!, body: String!): Post
    newComment(token: String!, body: String!, id: String!): Boolean!
    getComments(id: String!): [Comment!]
    createMessage(token: String!, body: String!, userId: String!): Message!
    likePost(id: String!, current_like: Int!): Int!
    unlikePost(id:String!, current_like: Int!): Int!
    supportUser(id: String!, current_supporters: Int!): Int!
    unsupportUser(id: String!, current_supporters: Int!): Int!
    deletePost(id: String!): Boolean!
    createCategories: [Category!]
    newRequest(name: String!, description: String!): Request!
    deleteRequest(id: String!): Boolean!
  }
`;