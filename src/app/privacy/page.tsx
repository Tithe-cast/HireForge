export const metadata = { title: "Privacy & Terms — HireForge" };

const SECTIONS = [
  {
    title: "1. Information we collect",
    body: "When you create an account, we collect your name, email address, and role (candidate or employer). Employers additionally provide a company name. We do not collect data beyond what's required to operate the platform.",
  },
  {
    title: "2. How we use your information",
    body: "Candidate information is shared with an employer only when you apply to their listing. Employer information is shown publicly on the listings they post. We never sell account data to third parties.",
  },
  {
    title: "3. Job listing accuracy",
    body: "Employers are responsible for the accuracy of salary, location, and role details they publish. HireForge requires a salary range on every listing but does not independently verify employer-submitted content.",
  },
  {
    title: "4. Account termination",
    body: "You may delete your account at any time by contacting support. Employers may remove individual job listings from the Manage Jobs dashboard without affecting the rest of their account.",
  },
  {
    title: "5. Cookies",
    body: "HireForge uses a single essential cookie to keep you signed in. We do not use third-party advertising or tracking cookies.",
  },
  {
    title: "6. Changes to these terms",
    body: "We'll post any material changes to this page with an updated effective date. Continued use of HireForge after a change constitutes acceptance of the updated terms.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="container-hf max-w-2xl py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight">Privacy &amp; Terms</h1>
      <p className="mt-3 text-sm text-graphite-500">Effective date: January 1, 2026</p>

      <div className="mt-10 space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-base font-semibold text-graphite-900">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-graphite-600">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
