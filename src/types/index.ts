export type UserRole = "candidate" | "employer";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  avatarUrl?: string;
  createdAt: string;
}

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
export type WorkMode = "Remote" | "Hybrid" | "On-site";
export type ExperienceLevel = "Entry" | "Mid" | "Senior" | "Lead";

export interface IJob {
  _id: string;
  title: string;
  company: string;
  companyLogo?: string;
  images?: string[];
  location: string;
  workMode: WorkMode;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  shortDescription: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
  techStack: string[];
  category: string;
  postedBy: string;
  postedByName: string;
  applicantsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobListResponse {
  jobs: IJob[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
  fieldErrors?: Record<string, string>;
}
