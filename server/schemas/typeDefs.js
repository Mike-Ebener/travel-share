const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    trips: [Trip]
    friends: [User]
  }

  type Trip {
    _id: ID
    tripText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    trips(username: String): [Trip]
    trip(_id: ID!): Trip
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addTrip(tripText: String!): Trip
    addReaction(tripId: ID!, reactionBody: String!): Trip
    addFriend(friendId: ID!): User
  }
`;

module.exports = typeDefs;