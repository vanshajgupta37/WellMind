import mongoose from 'mongoose';

const TherapistSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
        expertise: [String],
        qualification: String,
        availability: {
            online: { type: Boolean, default: false },
            workHours: { start: String, end: String }
        },
        approvalStatus: { type: String, enum: ['Pending', 'Approved'], default: 'Pending' },
        experience: Number,
        consultationFee: Number
    }
}, { timestamps: true });

export default mongoose.model('Therapist', TherapistSchema);
