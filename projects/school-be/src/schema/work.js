import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    works: [Work!]!
  }

  type Work {
    id: ID!
    service: Service!
    price: Int!
    date: Date!
  }

  extend type Mutation {
    addWork(work: WorkCreateInput!): Work! 
    removeWork(id: ID!): Boolean
    updateWork(work: WorkUpdateInput!): Work!
  }

  input WorkCreateInput{
    serviceId: ID!
    price: Int!
    date: Date!
  }

  input WorkUpdateInput{
    id: ID!
    serviceId: ID
    price: Int
    date: Date!
  }
`;