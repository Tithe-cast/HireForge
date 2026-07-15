import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import { getSessionUser } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const mine = searchParams.get("mine");
    const q = searchParams.get("q")?.trim();
    const category = searchParams.get("category");
    const workMode = searchParams.get("workMode");
    const jobType = searchParams.get("jobType");
    const experienceLevel = searchParams.get("experienceLevel");
    const location = searchParams.get("location");
    const sort = searchParams.get("sort") || "newest";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.min(24, Math.max(1, parseInt(searchParams.get("pageSize") || "8", 10)));

    const filter: Record<string, unknown> = {};

    if (mine === "true") {
      const user = await getSessionUser();
      if (!user) return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
      filter.postedBy = user.userId;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { company: { $regex: q, $options: "i" } },
        { techStack: { $regex: q, $options: "i" } },
      ];
    }
    if (category && category !== "all") filter.category = category;
    if (workMode && workMode !== "all") filter.workMode = workMode;
    if (jobType && jobType !== "all") filter.jobType = jobType;
    if (experienceLevel && experienceLevel !== "all") filter.experienceLevel = experienceLevel;
    if (location && location !== "all") filter.location = { $regex: location, $options: "i" };

    let sortSpec: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort === "salary_high") sortSpec = { salaryMax: -1 };
    if (sort === "salary_low") sortSpec = { salaryMin: 1 };
    if (sort === "oldest") sortSpec = { createdAt: 1 };

    const total = await Job.countDocuments(filter);
    const jobs = await Job.find(filter)
      .sort(sortSpec)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    return NextResponse.json({
      jobs,
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    });
  } catch (err) {
    console.error("Jobs GET error:", err);
    return NextResponse.json({ error: "Failed to load jobs." }, { status: 500 });
  }
}

const JobSchema = z.object({
  title: z.string().min(3).max(120),
  company: z.string().min(2).max(100),
  companyLogo: z.string().url().optional().or(z.literal("")),
  images: z.array(z.string().url()).max(6).optional().default([]),
  location: z.string().min(2),
  workMode: z.enum(["Remote", "Hybrid", "On-site"]),
  jobType: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Freelance"]),
  experienceLevel: z.enum(["Entry", "Mid", "Senior", "Lead"]),
  salaryMin: z.number().min(0),
  salaryMax: z.number().min(0),
  shortDescription: z.string().min(10).max(220),
  fullDescription: z.string().min(30),
  responsibilities: z.array(z.string()).default([]),
  requirements: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  category: z.string().min(2),
});

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
    if (user.role !== "employer") {
      return NextResponse.json({ error: "Only employer accounts can post jobs." }, { status: 403 });
    }

    const body = await req.json();
    const parsed = JobSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
      return NextResponse.json({ error: "Validation failed", fieldErrors }, { status: 400 });
    }

    if (parsed.data.salaryMax < parsed.data.salaryMin) {
      return NextResponse.json(
        { error: "Validation failed", fieldErrors: { salaryMax: "Max salary must be greater than min salary" } },
        { status: 400 }
      );
    }

    await connectDB();
    const job = await Job.create({
      ...parsed.data,
      postedBy: user.userId,
      postedByName: user.name,
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (err) {
    console.error("Jobs POST error:", err);
    return NextResponse.json({ error: "Failed to create job." }, { status: 500 });
  }
}
