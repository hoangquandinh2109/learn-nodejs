import express from 'express';
import searchController from '../app/controllers/search.controller';

const searchRouter = express.Router();

searchRouter.use('/', searchController.index);

module.exports = searchRouter;
