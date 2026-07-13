import mongoose, { Schema, models, model } from "mongoose";

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "candidate" | "employer";
  company?: string;
  avatarUrl?: string;
  createdAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["candidate", "employer"], required: true },
    company: { type: String, trim: true, maxlength: 100 },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

export default models.User || model<UserDocument>("User", UserSchema);
