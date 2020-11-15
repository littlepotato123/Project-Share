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
    body: String!
  }

  type Category {
    id: ID!
    title: String!
  }

  type User {
    id: ID!
    handle: String!
    email: String!
    password: String!
    imageUrl: String!
    supporters: Int!
  }

  type Mutation {
    signup(handle: String!, email: String!, password: String!, imageUrl: String): User
    login(handle: String!, password: String!): String
    clear: Boolean!
    newPost(token: String!, title: String!, category: String!, body: String!): Post
    newComment(token: String!, body: String!, id: String!): Boolean!
    getComments(id: String!): [Comment!]
    createMessage(token: String!, body: String!, userId: String!): Message!
    likePost(id: String!, current_like: Int!): Boolean!
    unlikePost(id:String!, current_like: Int!): Boolean!
    supportUser(id: String!, current_supporters: Int!): Boolean!
    unsupportUser(id: String!, current_supporters: Int!): Boolean!
  }
`;