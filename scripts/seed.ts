import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../src/lib/models/User";
import Job from "../src/lib/models/Job";

const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set. Copy .env.example to .env.local first.");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB. Seeding…");

  await Job.deleteMany({});
  await User.deleteMany({ email: { $in: ["employer@hireforge.dev", "candidate@hireforge.dev"] } });

  const passwordHash = await bcrypt.hash("demo1234", 10);

  const employer = await User.create({
    name: "Marcus Webb",
    email: "employer@hireforge.dev",
    passwordHash,
    role: "employer",
    company: "Northwind Labs",
  });

  await User.create({
    name: "Alicia Torres",
    email: "candidate@hireforge.dev",
    passwordHash,
    role: "candidate",
  });

  const jobs = [
    {
      title: "Senior Frontend Engineer",
      company: "Northwind Labs",
      location: "Austin, TX",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Senior",
      salaryMin: 145000,
      salaryMax: 185000,
      shortDescription: "Own the checkout and pricing UI for a Series B fintech serving 40,000 merchants.",
      fullDescription:
        "Northwind Labs builds payment infrastructure for small e-commerce businesses. You'll join a 6-person frontend team rebuilding our merchant dashboard in Next.js, working directly with design and the payments API team to ship a faster, more reliable checkout experience.",
      responsibilities: [
        "Lead the migration of the merchant dashboard from Create React App to Next.js App Router",
        "Partner with design to define and maintain our component library",
        "Mentor two mid-level engineers on the frontend team",
        "Own frontend performance budgets and Core Web Vitals",
      ],
      requirements: [
        "5+ years building production React applications",
        "Deep experience with TypeScript and modern state management",
        "Comfortable owning a feature end-to-end, from design review to production",
        "Experience with design systems at scale",
      ],
      techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      category: "Frontend",
    },
    {
      title: "Backend Engineer, Payments",
      company: "Northwind Labs",
      location: "Austin, TX",
      workMode: "Hybrid",
      jobType: "Full-time",
      experienceLevel: "Mid",
      salaryMin: 130000,
      salaryMax: 165000,
      shortDescription: "Build the ledger and settlement systems that move real money for 40,000 merchants.",
      fullDescription:
        "You'll join our payments platform team, working on the systems that reconcile and settle merchant transactions. This role touches distributed systems, financial correctness, and third-party banking integrations daily.",
      responsibilities: [
        "Design and maintain ledger services handling millions of daily transactions",
        "Integrate with banking partners and payment processors",
        "Write and review code with a strong emphasis on correctness and auditability",
        "Participate in an on-call rotation with strong tooling support",
      ],
      requirements: [
        "3+ years with Node.js or a similar backend language in production",
        "Experience with relational databases and transactional integrity",
        "Comfort working in a regulated, audit-heavy environment",
      ],
      techStack: ["Node.js", "PostgreSQL", "TypeScript", "AWS", "Kafka"],
      category: "Backend",
    },
    {
      title: "Staff Backend Engineer",
      company: "Ridgeline Analytics",
      location: "Remote (US)",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Lead",
      salaryMin: 190000,
      salaryMax: 235000,
      shortDescription: "Set technical direction for our data pipeline serving 200+ enterprise customers.",
      fullDescription:
        "Ridgeline Analytics helps logistics companies forecast demand. As Staff Backend Engineer, you'll set architectural direction across three backend teams, with a focus on our real-time data ingestion pipeline processing 4TB daily.",
      responsibilities: [
        "Define architecture standards across backend teams",
        "Lead design reviews for major system changes",
        "Directly mentor senior engineers and support their growth into tech lead roles",
        "Partner with the CTO on multi-quarter technical roadmap",
      ],
      requirements: [
        "8+ years of backend engineering experience, including distributed systems",
        "Track record of leading technical direction across multiple teams",
        "Experience with high-throughput data pipelines",
      ],
      techStack: ["Go", "Kafka", "PostgreSQL", "Kubernetes", "gRPC"],
      category: "Backend",
    },
    {
      title: "iOS Engineer",
      company: "Ridgeline Analytics",
      location: "Remote (US)",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Mid",
      salaryMin: 125000,
      salaryMax: 155000,
      shortDescription: "Build the driver-facing app used by 12,000 delivery drivers every day.",
      fullDescription:
        "You'll join a 3-person mobile team maintaining and extending the driver app that powers route optimization and delivery confirmation for our logistics customers.",
      responsibilities: [
        "Ship new features in the driver app end to end",
        "Improve offline-first sync reliability in low-connectivity areas",
        "Work closely with backend engineers on API contracts",
      ],
      requirements: [
        "3+ years of Swift development shipped to the App Store",
        "Experience with offline-first mobile architecture",
        "Comfortable working directly with end users for feedback",
      ],
      techStack: ["Swift", "SwiftUI", "Combine", "CoreData"],
      category: "Mobile",
    },
    {
      title: "Machine Learning Engineer",
      company: "Ridgeline Analytics",
      location: "Remote (US)",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Senior",
      salaryMin: 160000,
      salaryMax: 205000,
      shortDescription: "Improve the demand-forecasting models at the core of our product.",
      fullDescription:
        "Our forecasting models directly drive customer-facing predictions used to plan warehouse inventory. You'll own model development from experimentation through production deployment.",
      responsibilities: [
        "Develop and validate time-series forecasting models",
        "Own the full ML lifecycle: training, evaluation, deployment, monitoring",
        "Collaborate with data engineering on feature pipelines",
      ],
      requirements: [
        "4+ years of applied ML experience with production model deployment",
        "Strong background in time-series forecasting or similar",
        "Comfortable with both research and production engineering",
      ],
      techStack: ["Python", "PyTorch", "Airflow", "AWS SageMaker"],
      category: "Data & ML",
    },
    {
      title: "Site Reliability Engineer",
      company: "Fenwick Cloud",
      location: "Remote (Global)",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Senior",
      salaryMin: 155000,
      salaryMax: 195000,
      shortDescription: "Keep a multi-region Kubernetes platform running at 99.99% uptime.",
      fullDescription:
        "Fenwick Cloud provides managed infrastructure for mid-market SaaS companies. You'll join our SRE team responsible for the reliability of our customer-facing platform across three cloud regions.",
      responsibilities: [
        "Own incident response and postmortems for platform-wide issues",
        "Build and improve observability tooling across services",
        "Drive infrastructure-as-code adoption across engineering teams",
      ],
      requirements: [
        "5+ years in an SRE, DevOps, or platform engineering role",
        "Deep Kubernetes and cloud infrastructure experience",
        "Comfortable being part of an on-call rotation",
      ],
      techStack: ["Kubernetes", "Terraform", "Go", "Prometheus", "AWS"],
      category: "DevOps / SRE",
    },
    {
      title: "Security Engineer",
      company: "Fenwick Cloud",
      location: "Remote (Global)",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Mid",
      salaryMin: 135000,
      salaryMax: 170000,
      shortDescription: "Harden the infrastructure that 300+ SaaS companies trust with their data.",
      fullDescription:
        "You'll join our two-person security team, running vulnerability assessments, hardening internal tooling, and supporting customer security questionnaires ahead of SOC 2 audits.",
      responsibilities: [
        "Run regular vulnerability assessments across infrastructure",
        "Support customer-facing security reviews and audits",
        "Build internal tooling for automated compliance checks",
      ],
      requirements: [
        "3+ years in an application or infrastructure security role",
        "Familiarity with SOC 2 or similar compliance frameworks",
        "Strong understanding of cloud security fundamentals",
      ],
      techStack: ["Python", "AWS", "Terraform", "OWASP"],
      category: "Security",
    },
    {
      title: "Product Designer, Platform",
      company: "Fenwick Cloud",
      location: "Remote (Global)",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Senior",
      salaryMin: 130000,
      salaryMax: 165000,
      shortDescription: "Design the console developers use to manage their production infrastructure.",
      fullDescription:
        "You'll own end-to-end design for our infrastructure console, working closely with engineering to design interfaces for complex, high-stakes workflows like scaling and deployment.",
      responsibilities: [
        "Lead design for the infrastructure console from concept to shipped feature",
        "Run usability sessions with practicing engineers",
        "Maintain and evolve our design system",
      ],
      requirements: [
        "4+ years designing developer tools or technical products",
        "A portfolio showing complex workflow design, not just visual polish",
        "Comfortable presenting design rationale directly to engineering leadership",
      ],
      techStack: ["Figma", "Design Systems", "React"],
      category: "Product Design",
    },
    {
      title: "Engineering Manager, Core Platform",
      company: "Northwind Labs",
      location: "Austin, TX",
      workMode: "Hybrid",
      jobType: "Full-time",
      experienceLevel: "Lead",
      salaryMin: 175000,
      salaryMax: 220000,
      shortDescription: "Lead a team of 6 engineers building the core payments platform.",
      fullDescription:
        "You'll manage a team responsible for the ledger and settlement systems underpinning our payments product, balancing hands-on technical guidance with people leadership.",
      responsibilities: [
        "Manage and grow a team of 6 backend engineers",
        "Partner with product on quarterly roadmap planning",
        "Stay hands-on with architecture decisions and code review",
      ],
      requirements: [
        "2+ years of direct engineering management experience",
        "Prior hands-on backend engineering background",
        "Experience managing through ambiguity in a fast-growing company",
      ],
      techStack: ["Node.js", "PostgreSQL", "AWS", "Leadership"],
      category: "Engineering Mgmt",
    },
    {
      title: "Junior Frontend Developer",
      company: "Meridian Health",
      location: "Remote (US)",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Entry",
      salaryMin: 78000,
      salaryMax: 95000,
      shortDescription: "Start your career building patient-facing tools used by 50,000 patients monthly.",
      fullDescription:
        "Meridian Health builds scheduling and telehealth software for independent clinics. This is a great first role for a developer who wants direct mentorship and meaningful ownership early on.",
      responsibilities: [
        "Ship small to medium features under the guidance of senior engineers",
        "Fix bugs and improve test coverage across the patient portal",
        "Participate in code review and pair programming sessions",
      ],
      requirements: [
        "0-2 years of professional or internship experience with React",
        "A portfolio or GitHub showing personal or coursework projects",
        "Eagerness to learn healthcare domain constraints",
      ],
      techStack: ["React", "JavaScript", "CSS", "REST APIs"],
      category: "Frontend",
    },
    {
      title: "Backend Engineer, Scheduling",
      company: "Meridian Health",
      location: "Remote (US)",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Mid",
      salaryMin: 115000,
      salaryMax: 145000,
      shortDescription: "Build the scheduling engine that coordinates appointments across 400 clinics.",
      fullDescription:
        "You'll work on the scheduling service that handles appointment booking, provider availability, and conflict resolution across hundreds of independent clinics with different workflows.",
      responsibilities: [
        "Extend the scheduling engine to support new appointment types",
        "Improve reliability of provider-availability sync",
        "Write integration tests covering edge cases in clinic workflows",
      ],
      requirements: [
        "3+ years building backend services in a production environment",
        "Experience with relational data modeling for complex scheduling logic",
      ],
      techStack: ["Python", "Django", "PostgreSQL", "Celery"],
      category: "Backend",
    },
    {
      title: "Data Engineer",
      company: "Meridian Health",
      location: "Remote (US)",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Mid",
      salaryMin: 120000,
      salaryMax: 150000,
      shortDescription: "Build pipelines that power clinical reporting for 400 independent clinics.",
      fullDescription:
        "You'll design and maintain the ETL pipelines that aggregate appointment, billing, and outcomes data into reporting dashboards used by clinic administrators.",
      responsibilities: [
        "Build and maintain ETL pipelines across multiple data sources",
        "Ensure data quality and consistency for clinical reporting",
        "Partner with analytics stakeholders on new reporting needs",
      ],
      requirements: [
        "3+ years of data engineering experience",
        "Strong SQL and experience with a modern data pipeline tool",
        "Comfort working with sensitive healthcare data under HIPAA constraints",
      ],
      techStack: ["Python", "Airflow", "Snowflake", "dbt"],
      category: "Data & ML",
    },
    {
      title: "Android Engineer",
      company: "Fenwick Cloud",
      location: "Remote (Global)",
      workMode: "Remote",
      jobType: "Contract",
      experienceLevel: "Senior",
      salaryMin: 90,
      salaryMax: 130,
      currency: "USD",
      shortDescription: "6-month contract to rebuild our companion Android app in Kotlin.",
      fullDescription:
        "We're modernizing our Android companion app from Java to Kotlin with Jetpack Compose. This is a defined 6-month contract with strong possibility of extension.",
      responsibilities: [
        "Migrate existing Java screens to Kotlin and Jetpack Compose incrementally",
        "Maintain feature parity throughout the migration",
        "Document migration patterns for the eventual in-house team to continue",
      ],
      requirements: [
        "5+ years of Android development, including Kotlin and Compose",
        "Experience leading a legacy migration project",
        "Available for a defined 6-month contract engagement",
      ],
      techStack: ["Kotlin", "Jetpack Compose", "Coroutines"],
      category: "Mobile",
    },
    {
      title: "DevOps Engineer",
      company: "Meridian Health",
      location: "Remote (US)",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Mid",
      salaryMin: 118000,
      salaryMax: 148000,
      shortDescription: "Own CI/CD and infrastructure for a HIPAA-compliant healthcare platform.",
      fullDescription:
        "You'll manage our deployment pipelines and cloud infrastructure, with particular attention to the compliance requirements of handling protected health information.",
      responsibilities: [
        "Maintain and improve CI/CD pipelines across six services",
        "Manage infrastructure-as-code for our AWS environment",
        "Support engineering teams with deployment and environment issues",
      ],
      requirements: [
        "3+ years in a DevOps or platform engineering role",
        "Experience with AWS and infrastructure-as-code tools",
        "Familiarity with HIPAA or similarly regulated environments a plus",
      ],
      techStack: ["AWS", "Terraform", "Docker", "GitHub Actions"],
      category: "DevOps / SRE",
    },
    {
      title: "Full-Stack Engineer",
      company: "Northwind Labs",
      location: "Austin, TX",
      workMode: "On-site",
      jobType: "Full-time",
      experienceLevel: "Mid",
      salaryMin: 125000,
      salaryMax: 158000,
      shortDescription: "Work across our merchant dashboard and internal admin tooling.",
      fullDescription:
        "A generalist role for someone who enjoys moving between frontend and backend. You'll split time between our merchant-facing dashboard and internal tools used by our operations team.",
      responsibilities: [
        "Build features spanning our Next.js frontend and Node.js backend",
        "Build internal admin tools for the operations and support teams",
        "Participate in architecture discussions across the stack",
      ],
      requirements: [
        "3+ years of full-stack development experience",
        "Comfortable owning a feature from database schema to UI",
      ],
      techStack: ["React", "Node.js", "PostgreSQL", "TypeScript"],
      category: "Backend",
    },
    {
      title: "QA / Test Automation Engineer",
      company: "Ridgeline Analytics",
      location: "Remote (US)",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Mid",
      salaryMin: 105000,
      salaryMax: 135000,
      shortDescription: "Build the automated test suite protecting our forecasting pipeline releases.",
      fullDescription:
        "You'll own our end-to-end and integration test automation, working closely with backend and ML engineers to catch regressions before they reach production.",
      responsibilities: [
        "Design and maintain automated test suites across services",
        "Partner with engineers to define testable acceptance criteria",
        "Investigate and triage flaky tests to keep CI reliable",
      ],
      requirements: [
        "3+ years in a QA automation or SDET role",
        "Experience with Python or a similar language for test tooling",
        "Comfortable reading and reasoning about backend service code",
      ],
      techStack: ["Python", "Pytest", "CI/CD", "Docker"],
      category: "Backend",
    },
    {
      title: "Frontend Engineering Intern",
      company: "Meridian Health",
      location: "Remote (US)",
      workMode: "Remote",
      jobType: "Internship",
      experienceLevel: "Entry",
      salaryMin: 30,
      salaryMax: 38,
      shortDescription: "12-week summer internship building real features in our patient portal.",
      fullDescription:
        "A paid, 12-week internship for a current student or recent graduate. You'll be paired with a mentor and ship real features to the patient portal, not busywork.",
      responsibilities: [
        "Ship a defined feature over the course of the internship, with mentor support",
        "Participate in code review and team standups",
        "Present your work at the end-of-internship demo day",
      ],
      requirements: [
        "Currently pursuing or recently completed a CS degree or bootcamp",
        "Some experience with JavaScript and React, coursework counts",
      ],
      techStack: ["React", "JavaScript", "Git"],
      category: "Frontend",
    },
    {
      title: "Cloud Infrastructure Engineer",
      company: "Fenwick Cloud",
      location: "Remote (Global)",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Senior",
      salaryMin: 150000,
      salaryMax: 190000,
      shortDescription: "Design multi-region infrastructure for a platform serving 300+ SaaS companies.",
      fullDescription:
        "You'll design and implement the infrastructure patterns other engineering teams build on top of, with a focus on multi-region failover and cost efficiency at scale.",
      responsibilities: [
        "Design multi-region infrastructure patterns for new services",
        "Drive cost optimization initiatives across cloud spend",
        "Provide infrastructure consulting to product engineering teams",
      ],
      requirements: [
        "5+ years of cloud infrastructure experience at scale",
        "Deep AWS or GCP expertise with multi-region architectures",
      ],
      techStack: ["AWS", "Terraform", "Kubernetes", "Go"],
      category: "DevOps / SRE",
    },
    {
      title: "Data Scientist, Growth",
      company: "Ridgeline Analytics",
      location: "Remote (US)",
      workMode: "Remote",
      jobType: "Full-time",
      experienceLevel: "Mid",
      salaryMin: 128000,
      salaryMax: 160000,
      shortDescription: "Analyze product usage data to guide our growth team's roadmap.",
      fullDescription:
        "You'll partner with the growth team to design experiments, analyze funnel data, and build the dashboards that guide prioritization decisions across the company.",
      responsibilities: [
        "Design and analyze A/B tests for the growth team",
        "Build self-serve dashboards for product and marketing stakeholders",
        "Present findings directly to leadership on a monthly cadence",
      ],
      requirements: [
        "3+ years in a data science or analytics role",
        "Strong SQL and experience with experimentation frameworks",
      ],
      techStack: ["Python", "SQL", "dbt", "Looker"],
      category: "Data & ML",
    },
    {
      title: "Freelance Design Systems Consultant",
      company: "Northwind Labs",
      location: "Remote (Global)",
      workMode: "Remote",
      jobType: "Freelance",
      experienceLevel: "Senior",
      salaryMin: 80,
      salaryMax: 120,
      shortDescription: "3-month freelance engagement to audit and rebuild our component library.",
      fullDescription:
        "We're looking for a design systems specialist to audit our current component library, identify inconsistencies, and lead a rebuild in partnership with our design and frontend teams.",
      responsibilities: [
        "Audit the existing component library for consistency gaps",
        "Propose and implement a token-based design system architecture",
        "Train the in-house team to maintain the system after handoff",
      ],
      requirements: [
        "Demonstrated design systems work at a prior company, portfolio required",
        "Comfortable working independently on a fixed-scope engagement",
      ],
      techStack: ["Figma", "React", "Storybook", "Design Tokens"],
      category: "Product Design",
    },
  ];

  const jobsWithMeta = jobs.map((j) => ({
    ...j,
    currency: j.currency || "USD",
    postedBy: employer._id,
    postedByName: employer.name,
    applicantsCount: Math.floor(Math.random() * 40),
  }));

  await Job.insertMany(jobsWithMeta);

  console.log(`Seeded ${jobsWithMeta.length} jobs and 2 demo users.`);
  console.log("Demo employer login: employer@hireforge.dev / demo1234");
  console.log("Demo candidate login: candidate@hireforge.dev / demo1234");

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
