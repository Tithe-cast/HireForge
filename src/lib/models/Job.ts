import mongoose, { Schema, models, model } from "mongoose";

export interface JobDocument extends mongoose.Document {
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workMode: "Remote" | "Hybrid" | "On-site";
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
  experienceLevel: "Entry" | "Mid" | "Senior" | "Lead";
  salaryMin: number;
  salaryMax: number;
  currency: string;
  shortDescription: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
  techStack: string[];
  category: string;
  postedBy: mongoose.Types.ObjectId;
  postedByName: string;
  applicantsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<JobDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    company: { type: String, required: true, trim: true, maxlength: 100 },
    companyLogo: { type: String },
    location: { type: String, required: true, trim: true },
    workMode: { type: String, enum: ["Remote", "Hybrid", "On-site"], required: true },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Freelance"],
      required: true,
    },
    experienceLevel: { type: String, enum: ["Entry", "Mid", "Senior", "Lead"], required: true },
    salaryMin: { type: Number, required: true, min: 0 },
    salaryMax: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "USD" },
    shortDescription: { type: String, required: true, maxlength: 220 },
    fullDescription: { type: String, required: true },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    techStack: [{ type: String }],
    category: { type: String, required: true, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postedByName: { type: String, required: true },
    applicantsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

JobSchema.index({ title: "text", company: "text", techStack: "text" });

export default models.Job || model<JobDocument>("Job", JobSchema);
