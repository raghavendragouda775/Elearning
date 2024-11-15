import express from "express";
import dotenv from"dotenv";
import userRoutes from "./routes/user.js"
import { connectdb } from "./database/db.js";
import coursesRoute from "./routes/courses.js"
import adminRoute from "./routes/admin.js"
// import RazorPay from "razorpay";
import cors from "cors"

dotenv.config();
// const instance=new RazorPay({
//     key_id:process.env.RazorPay_Key,
//     key_secret:process.env.RazorPay_Secret,
// })

const app=express();
app.use(cors({
    origin: "https://elearning-frontend-x1kn.vercel.app", credentials: true,methods:["GET","POST","DELETE","PUT"]
}));

app.use(express.json());

const port=process.env.PORT||7000;

app.get('/',(req,res)=>{
    res.send("server is running ")
})
app.use("/uploads",express.static("uploads"))
app.use('/api',userRoutes);
app.use('/api',coursesRoute);
app.use('/api',adminRoute);
app.listen(port,()=>{
    console.log(`Server is Running on ${port}`);
      connectdb();
})
