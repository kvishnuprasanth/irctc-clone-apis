import express from 'express';
import { addTrain,getTrains } from '../controllers/trainsController.js';
import adminAuth from '../middleware/adminAuth.js';

const trainRouter = express.Router()

trainRouter.post('/add',adminAuth,addTrain)
trainRouter.post('/get',getTrains)

export default trainRouter;