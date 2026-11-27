export const COUNTRIES = ["Kenya", "Uganda", "Germany", "Canada", "Remote"] as const;
export const WORK_TYPES = ["Remote Contractor", "Local Hire", "Paid Fellowship"] as const;
export const ID_STATUSES = ["Refugee ID / Alien Card", "Valid Passport", "Asylum Seeker Pass", "No Documents Yet"] as const;
export type Country = (typeof COUNTRIES)[number];
export type WorkType = (typeof WORK_TYPES)[number];
export type IdStatus = (typeof ID_STATUSES)[number];

const countrySteps: Record<Country, string[]> = {
  Kenya: ["Obtain KRA PIN via iTax (refugee ID accepted)", "Apply for Class M work permit if locally employed", "Register for SHA/NSSF if on payroll"],
  Uganda: ["Register with Office of the Prime Minister (OPM) for refugee status", "Get a TIN from Uganda Revenue Authority", "Refugees may work without a separate permit"],
  Germany: ["Check residence title allows employment (Beschäftigung gestattet)", "Get approval from Ausländerbehörde if required", "Obtain a tax ID (Steuer-ID) and register address (Anmeldung)"],
  Canada: ["Hold a valid work permit or open work permit", "Apply for a Social Insurance Number (SIN)", "Report income to CRA annually"],
  Remote: ["Confirm your residence country allows self-employment", "Keep a signed contract stating you are an independent contractor", "Declare foreign income where you are tax-resident"],
};
const workSteps: Record<WorkType, string[]> = {
  "Remote Contractor": ["Sign a written service agreement with scope, rate and payment terms", "Issue invoices for every payment"],
  "Local Hire": ["Get a written employment contract", "Confirm employer registers you for statutory benefits"],
  "Paid Fellowship": ["Get a fellowship letter stating stipend and duration", "Check whether the stipend is taxable locally"],
};
const idScore: Record<IdStatus, number> = { "Valid Passport": 45, "Refugee ID / Alien Card": 38, "Asylum Seeker Pass": 25, "No Documents Yet": 5 };
const workScore: Record<WorkType, number> = { "Remote Contractor": 30, "Paid Fellowship": 28, "Local Hire": 20 };
const countryScore: Record<Country, number> = { Uganda: 25, Remote: 22, Kenya: 18, Canada: 15, Germany: 12 };

export function assess(c: Country, w: WorkType, id: IdStatus) {
  const score = Math.min(100, idScore[id] + workScore[w] + countryScore[c]);
  const steps = [...countrySteps[c], ...workSteps[w]];
  if (id === "No Documents Yet") steps.unshift("Contact UNHCR or a legal aid clinic to start documentation");
  if (id === "Asylum Seeker Pass") steps.unshift("Confirm your pass permits work while your claim is pending");
  return { score, steps };
}

export const SCENARIOS: { title: string; who: string; c: Country; w: WorkType; id: IdStatus }[] = [
  { title: "Amina — Web developer in Kakuma", who: "Refugee in Kenya, contracting for a US startup", c: "Kenya", w: "Remote Contractor", id: "Refugee ID / Alien Card" },
  { title: "Jean — Data analyst in Kampala", who: "Refugee in Uganda, local NGO job offer", c: "Uganda", w: "Local Hire", id: "Refugee ID / Alien Card" },
  { title: "Omar — Fellow relocating to Berlin", who: "Asylum seeker, paid tech fellowship", c: "Germany", w: "Paid Fellowship", id: "Asylum Seeker Pass" },
];

export const GUIDE: { topic: string; q: string; a: string; scenario: string }[] = [
  { topic: "Work Authorization", q: "Can I legally work where I live?", a: "Most host countries allow refugees to work, but some need a permit first. Your ID card type usually decides this. Check with the immigration office or a legal aid clinic before signing.", scenario: "Amina has a Kenyan Alien Card. She can do freelance work but needs a Class M permit for a salaried job." },
  { topic: "Work Authorization", q: "What if my documents expired?", a: "Renew early. Many offices give a receipt that proves renewal is in progress — keep it with you and share it with employers.", scenario: "Jean's ID expired; his OPM renewal slip let him keep working." },
  { topic: "Contracting Safely", q: "What must a contract include?", a: "Names of both sides, the work to do, the payment amount and currency, payment dates, how either side can end it, and what happens in a dispute.", scenario: "A client asked Amina to start without a contract. She sent a one-page agreement first and got paid on time." },
  { topic: "Contracting Safely", q: "Red flags to watch for", a: "Requests to pay a fee to get the job, holding your ID documents, vague payment terms, or pressure to sign today.", scenario: "Omar was asked for a 'visa processing fee' — a common scam." },
  { topic: "Tax & Payouts", q: "Do I pay tax on remote income?", a: "Usually yes, in the country where you live. Keep invoices and payment records; register for a tax number when you start earning regularly.", scenario: "Amina registered for a KRA PIN and files a yearly return." },
  { topic: "Tax & Payouts", q: "How can I receive money without a bank?", a: "Mobile money (like M-Pesa or MTN MoMo) works with refugee IDs in many countries. Cross-border services can pay into mobile wallets directly.", scenario: "Jean receives USD payments converted straight to his MoMo wallet." },
  { topic: "Dispute Rights", q: "My client won't pay. What now?", a: "Send a written reminder with the invoice. If unpaid, contact a legal aid clinic or labour office — you keep your rights regardless of refugee status.", scenario: "With help from a clinic, Omar recovered two months of unpaid stipend." },
  { topic: "Dispute Rights", q: "Can I be fired for being a refugee?", a: "No. Discrimination based on nationality or refugee status is unlawful in most host countries. Write down what happened and seek legal aid.", scenario: "Jean reported unfair dismissal to the labour officer and was compensated." },
];
