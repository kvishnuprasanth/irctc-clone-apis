import express from 'express';
import { bookSeat,getBookingDetails } from '../controllers/bookingsController.js';
import checkAuth from '../middleware/auth.js'

const bookingRouter = express.Router()

bookingRouter.post('/book',checkAuth,bookSeat)
bookingRouter.get('/get',checkAuth,getBookingDetails)

export default bookingRouter;