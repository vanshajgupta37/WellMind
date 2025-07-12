import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoutes.js';
import therapistRouter from './routes/therapistRoutes.js'
import userRouter from './routes/userRoute.js';
//app  config
const app=express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

const corsOptions = {
    origin: ['https://well-mind2-adminside.vercel.app'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "token", "user_token", "dToken"],
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))

// app.use(cors())


//api endpoints

app.use('/api/admin',adminRouter)
// localhost:5000/api/admin/add-therapist

app.use('/api/therapist', therapistRouter)

app.use('/api/user', userRouter)

app.get("/",(req,res)=>{    
    res.send("Server is ready");
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
