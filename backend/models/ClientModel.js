import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    age: Number,
    Gender: String,
    history: [
      {
        therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
        date: Date,
        notes: String
      }
    ]
  },
}, { timestamps: true });

export default mongoose.model('Client', ClientSchema);
