import express, { urlencoded } from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import env from "dotenv";
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";
import orderRouter from "./routers/order.router";

env.config();
const port = 8080;

mongoose.connect(process.env.MONGO_URI!).then(()=>{
   console.log(process.env.MONGO_URI)
   console.log("Connected to MongoDB");
   app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
   })
}).catch((error) => {
   console.log(error, "Connectin Failed");
 });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false}))


app.use('/api', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/orders', orderRouter);





