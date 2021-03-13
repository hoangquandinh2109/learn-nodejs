import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    services: [Service!]!
  }

  type Service {
    id: ID!
    name: String!
    prices: [Int!]
  }

  extend type Mutation {
    addService(service: ServiceCreateInput!): Service! 
    removeService(id: ID!): Boolean
    updateService(service: ServiceUpdateInput!): Service!
  }

  input ServiceCreateInput{
    name: String!
    prices: [Int!]
  }

  input ServiceUpdateInput{
    id: ID!
    name: String
    prices: [Int!]
  }
`;