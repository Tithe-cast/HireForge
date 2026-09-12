import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/session";

const InputSchema = z.object({
  title: z.string().min(3),
  techStack: z.array(z.string()).min(1),
  category: z.string().min(2),
  experienceLevel: z.string(),
  jobType: z.string(),
  workMode: z.string(),
  company: z.string().min(1),
});

interface GeneratedDraft {
  shortDescription: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
    if (user.role !== "employer") {
      return NextResponse.json({ error: "Only employer accounts can generate job posts." }, { status: 403 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI generation isn't configured yet. Add GEMINI_API_KEY to your environment variables." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const parsed = InputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Add a job title and at least one tech stack tag first." }, { status: 400 });
    }
    const { title, techStack, category, experienceLevel, jobType, workMode, company } = parsed.data;

    const prompt = `You are helping an employer draft a job listing for a developer job board called HireForge.

Job details:
- Title: ${title}
- Company: ${company}
- Category: ${category}
- Experience level: ${experienceLevel}
- Job type: ${jobType}
- Work mode: ${workMode}
- Tech stack: ${techStack.join(", ")}

Write a realistic, specific, professional job listing draft. Avoid generic filler phrases like "fast-paced environment" or "rockstar developer." Be concrete about what the role would actually involve given the stack and seniority.

Respond with ONLY valid JSON in exactly this shape, no markdown fences, no commentary:
{
  "shortDescription": "one or two sentences, under 220 characters, shown on the job card",
  "fullDescription": "two to three paragraphs describing the team, the role, and why it's open",
  "responsibilities": ["4 to 5 specific responsibility bullet points"],
  "requirements": ["4 to 5 specific requirement bullet points"]
}`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1200 },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, errText);
      return NextResponse.json({ error: "AI generation failed. Please try again." }, { status: 502 });
    }

    const data = await geminiRes.json();
    const rawText: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let draft: GeneratedDraft;
    try {
      draft = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse AI response as JSON:", rawText, parseErr);
      return NextResponse.json({ error: "AI returned an unexpected format. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ draft });
  } catch (err) {
    console.error("AI job post generation error:", err);
    return NextResponse.json({ error: "Something went wrong generating the draft." }, { status: 500 });
  }
}