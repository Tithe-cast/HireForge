import mongoose, { Schema, models, model } from "mongoose";

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  passwordHash?: string;
  role: "candidate" | "employer";
  company?: string;
  avatarUrl?: string;
  authProvider: "credentials" | "google";
  googleId?: string;
  createdAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Not required at the schema level: social-login accounts have no password.
    passwordHash: { type: String },
    role: { type: String, enum: ["candidate", "employer"], required: true },
    company: { type: String, trim: true, maxlength: 100 },
    avatarUrl: { type: String },
    authProvider: { type: String, enum: ["credentials", "google"], default: "credentials" },
    googleId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export default models.User || model<UserDocument>("User", UserSchema);