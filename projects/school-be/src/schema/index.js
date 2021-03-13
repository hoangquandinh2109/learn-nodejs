import service from './service';
import user from './user';
import work from './work';
import { gql } from 'apollo-server-express';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [
  linkSchema,
  service,
  user,
  work
];