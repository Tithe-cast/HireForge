import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import { getSessionUser } from "@/lib/session";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }
    await connectDB();
    const job = await Job.findById(params.id).lean();
    if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });
    return NextResponse.json({ job });
  } catch (err) {
    console.error("Job GET error:", err);
    return NextResponse.json({ error: "Failed to load job." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    await connectDB();
    const job = await Job.findById(params.id);
    if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

    if (job.postedBy.toString() !== user.userId) {
      return NextResponse.json({ error: "You can only delete jobs you posted." }, { status: 403 });
    }

    await job.deleteOne();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Job DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete job." }, { status: 500 });
  }
}
