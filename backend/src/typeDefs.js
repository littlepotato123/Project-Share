import { gql } from "apollo-server-express";

export const typeDefs = gql`
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

  type Award {
    id: ID!
    title: String!
    points: Int!
  }

  type Post {
    id: ID!
    title: String!
    author: String!
    category: String!
    likes: Int!
    date: String!
    body: String!
    liked: [String!]
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
    liked: [String!]
    supported: [String!]
    supporting: [String!]
    points: Int!
    awards: [Award!]!
    layout: Int!
  }

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
    getComments(id: String!): [Comment!]
  }

  type Mutation {
    signup(handle: String!, password: String!, imageUrl: String, bio: String!): User
    login(handle: String!, password: String!): String
    newPost(token: String!, date: String!, title: String!, category: String!, body: String!): Post
    newComment(token: String!, body: String!, id: String!): Boolean!
    createMessage(token: String!, body: String!, userId: String!): Message!
    likePost(id: String!, current_like: Int!, token: String): Int
    unlikePost(id:String!, current_like: Int!, token: String): Int
    supportUser(id: String!, current_supporters: Int!, token: String!): Int
    unsupportUser(id: String!, current_supporters: Int!, token: String!): Int
    deletePost(id: String!): Boolean!
    createCategories: [Category!]
    newRequest(name: String!, description: String!): Request!
    deleteRequest(id: String!): Boolean!
    newAward(token: String!, title: String!, points: Int!): Boolean
    updateUser(token: String!, bio: String!, layout: Int!): User
    newPassword(token: String!, new_pass: String!): Boolean!
  }
`