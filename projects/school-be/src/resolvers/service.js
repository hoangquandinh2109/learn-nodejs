import { isAuthenticated } from "./authorization";
import { combineResolvers } from 'graphql-resolvers';

export default {
  Query: {
    services: combineResolvers(
      isAuthenticated,
      (_, { }, { models }) => {
        return models.Service.find()
      }
    )
  },
  Mutation: {
    addService: combineResolvers(
      isAuthenticated,
      async (_, { service }, { models }) => {
        const aservice = new models.Service(service);
        await aservice.save();
        return aservice;
      }),
    updateService: combineResolvers(
      isAuthenticated,
      async (_, { service }, { models }) => {
        return await models.Service.findByIdAndUpdate(
          service.id,
          service,
          { new: true },
        );
    }),
    removeService: combineResolvers(
      isAuthenticated,
      async (_, { id }, { models, me }) => {
        const service = await models.Service.findById(id);
  
        if (service) {
          await service.remove();
          return true;
        } else {
          return false;
        }
      }
    )

  }
};
