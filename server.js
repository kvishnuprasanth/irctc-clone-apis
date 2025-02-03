import express from "express"
import bodyParser from "body-parser"
import 'dotenv/config'
import pg from "pg"
import cors from 'cors'
import router from "./routes/userRoute.js"
import trainRouter from "./routes/trainRoute.js"
import bookingRouter from "./routes/bookingRoute.js"
import sequelize from "./sequelize.js"
import cookieParser from "cookie-parser"
import db from "./db.js"
import User from "./modals/User.js"
import bookings from "./modals/bookings.js"
import trains from "./modals/trains.js"

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
})();



const app = express();
const PORT = 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static("public"));
app.use(cors())

app.use('/api/user',router)
app.use('/api/train',trainRouter)
app.use('/api/booking',bookingRouter)






  db.connect()
  .then(()=>console.log('Database connected....'))
  .catch(err=>console.log('Error: ' + err))

app.listen(PORT,()=>{
    console.log(`SERVER running on port ${PORT}`)
})

