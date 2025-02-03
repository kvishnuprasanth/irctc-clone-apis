import express from 'express';
import { addTrain,getTrains } from '../controllers/trainsController.js';
import onlyAdmin from '../middleware/adminAuth.js';

const trainRouter = express.Router()

trainRouter.post('/add',onlyAdmin,addTrain)
trainRouter.post('/get',getTrains)

export default trainRouter;