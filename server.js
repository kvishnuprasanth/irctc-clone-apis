import express from "express"
import bodyParser from "body-parser"
import 'dotenv/config'
import pg from "pg"
import cors from 'cors'
import router from "./routes/userRoute.js"
import trainRouter from "./routes/trainRoute.js"
import bookingRouter from "./routes/bookingRoute.js"

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors())

app.use('/api/user',router)
app.use('/api/train',trainRouter)
app.use('/api/booking',bookingRouter)

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect()
  .then(()=>console.log('Database connected....'))
  .catch(err=>console.log('Error: ' + err))

app.listen(PORT,()=>{
    console.log(`SERVER running on port ${PORT}`)
})

