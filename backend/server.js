import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoutes.js';


//app  config
const app=express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

const corsOptions = {
    origin: process.env.CORS_ORIGIN || "*", // Adjust according to your frontend domain or use '*' for all origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
};
app.use(cors(corsOptions));


//api endpoints

app.use('/api/admin',adminRouter)
// localhost:5000/api/admin/add-doctor


app.get("/",(req,res)=>{    
    res.send("Server is ready");
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});