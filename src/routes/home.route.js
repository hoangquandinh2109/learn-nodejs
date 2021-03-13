import express from 'express';
import homeController from '../app/controllers/home.controller';

const homeRouter = express.Router();

homeRouter.use('/', homeController.index);

module.exports = homeRouter;
