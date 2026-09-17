import { Resend } from "resend";

let resendClient: Resend | null = null;

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) resendClient = new Resend(apiKey);
  return resendClient;
}

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

// Fails soft: if Resend isn't configured, or a send fails, we log and move on
// rather than blocking the underlying action (applying, posting a job) on email delivery.
export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<void> {
  const client = getClient();
  if (!client) {
    console.warn("RESEND_API_KEY not set — skipping email:", subject);
    return;
  }

  try {
    const from = process.env.EMAIL_FROM || "HireForge <onboarding@resend.dev>";
    await client.emails.send({ from, to, subject, html });
  } catch (err) {
    console.error("Failed to send email:", subject, err);
  }
}