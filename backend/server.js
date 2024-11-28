import express from 'express';
import cors from 'cors';


const app=express();
app.use(express.json());

import 'dotenv/config'
import mongoose from 'mongoose';
import clientRoutes from "./routes/clientRoutes.js";
import therapistRoutes from "./routes/therapistRoutes.js";

const corsOptions = {
    origin: process.env.CORS_ORIGIN || "*", // Adjust according to your frontend domain or use '*' for all origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connected to MongoDB"))
.catch((error)=>console.log(error));

app.use("/clients",clientRoutes);
app.use("/therapists",therapistRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});