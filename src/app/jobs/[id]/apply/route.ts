import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import User from "@/lib/models/User";
import { getSessionUser } from "@/lib/session";
import { sendEmail } from "@/lib/email";

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "You must be logged in to apply." }, { status: 401 });
    if (user.role !== "candidate") {
      return NextResponse.json({ error: "Only candidate accounts can apply to jobs." }, { status: 403 });
    }
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    await connectDB();
    const job = await Job.findById(params.id);
    if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });

    job.applicantsCount = (job.applicantsCount || 0) + 1;
    await job.save();

    const employer = await User.findById(job.postedBy);

    // Fire both emails without blocking the response on either — a slow or
    // failed email send should never prevent the application from going through.
    void sendEmail({
      to: user.email,
      subject: `You applied to ${job.title} at ${job.company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #14161A;">Application received</h2>
          <p>Hi ${user.name},</p>
          <p>Your application for <strong>${job.title}</strong> at <strong>${job.company}</strong> has been submitted successfully.</p>
          <p style="color: #6B7078; font-size: 14px;">The hiring team at ${job.company} will follow up directly if they'd like to move forward.</p>
          <p style="margin-top: 24px; font-size: 13px; color: #9297A0;">— The HireForge team</p>
        </div>
      `,
    });

    if (employer?.email) {
      void sendEmail({
        to: employer.email,
        subject: `New applicant for ${job.title}`,
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
            <h2 style="color: #14161A;">New application</h2>
            <p>${user.name} (${user.email}) just applied to your listing for <strong>${job.title}</strong>.</p>
            <p style="color: #6B7078; font-size: 14px;">You now have ${job.applicantsCount} total applicant${job.applicantsCount === 1 ? "" : "s"} for this role.</p>
            <p style="margin-top: 24px; font-size: 13px; color: #9297A0;">— The HireForge team</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, applicantsCount: job.applicantsCount });
  } catch (err) {
    console.error("Apply error:", err);
    return NextResponse.json({ error: "Failed to submit application." }, { status: 500 });
  }
}