import express from "express";

import {addTherapist,loginAdmin } from "../controllers/adminController.js";

import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post('/add-therapist',authAdmin,upload.single('image'),addTherapist)
adminRouter.post('/login',loginAdmin);



export default adminRouter;