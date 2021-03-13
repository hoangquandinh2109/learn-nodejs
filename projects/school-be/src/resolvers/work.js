import { isAuthenticated } from "./authorization";
import { combineResolvers } from "graphql-resolvers";

export default {
  Query: {
    works: combineResolvers(isAuthenticated, (_, {}, { models }) => {
      return models.Work.find();
    }),
  },
  Mutation: {
    addWork: combineResolvers(
      isAuthenticated,
      async (_, { work }, { models }) => {
        const awork = new models.Work(work);
        await awork.save();
        return awork;
      }
    ),
    updateWork: combineResolvers(
      isAuthenticated,
      async (_, { work }, { models }) => {
        return await models.Work.findByIdAndUpdate(work.id, work, {
          new: true,
        });
      }
    ),
    removeWork: combineResolvers(
      isAuthenticated,
      async (_, { id }, { models }) => {
        const work = await models.Work.findById(id);

        if (work) {
          await work.remove();
          return true;
        } else {
          return false;
        }
      }
    ),
  },
  Work: {
    service: async (work, {}, { models }) => {
      return await models.Service.findById(work.serviceId);
    },
  },
};
