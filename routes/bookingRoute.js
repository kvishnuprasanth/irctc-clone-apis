import express from 'express';
import { bookSeat,getBookingDetails } from '../controllers/bookingsController.js';
import authUser from "../middleware/auth.js";

const bookingRouter = express.Router()

bookingRouter.post('/book',authUser,bookSeat)
bookingRouter.post('/get',authUser,getBookingDetails)

export default bookingRouter;