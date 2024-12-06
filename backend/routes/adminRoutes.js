import express from "express";

import {addTherapist } from "../controllers/adminController.js";

import upload from "../middleware/multer.js";

const adminRouter = express.Router();

adminRouter.post('/add-therapist',upload.single('image'),addTherapist)



export default adminRouter;