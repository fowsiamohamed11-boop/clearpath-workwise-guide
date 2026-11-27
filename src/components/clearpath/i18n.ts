export type Lang = "en" | "fr" | "sw" | "so";
export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "sw", label: "Kiswahili" },
  { code: "so", label: "Soomaali" },
];
const dict = {
  en: { compliance: "Compliance Checker", payout: "Payout & Invoice", guide: "Legal Guide", signOut: "Sign Out", signIn: "Sign In", signUp: "Sign Up", tagline: "Work legally. Get paid safely. Know your rights.", score: "Compliance Readiness Score", steps: "Required legal steps", copy: "Copy Summary", copied: "Copied!", scenarios: "Sample scenarios", country: "Host Country", workType: "Work Type", idStatus: "ID Status", readiness: "Payout Readiness", invoice: "Invoice Generator", print: "Print / Export PDF", demo: "1-Click Demo Login", welcome: "Welcome" },
  fr: { compliance: "Vérificateur de conformité", payout: "Paiement & Facture", guide: "Guide juridique", signOut: "Déconnexion", signIn: "Connexion", signUp: "Inscription", tagline: "Travaillez légalement. Soyez payé en sécurité. Connaissez vos droits.", score: "Score de conformité", steps: "Étapes juridiques requises", copy: "Copier le résumé", copied: "Copié !", scenarios: "Scénarios d'exemple", country: "Pays d'accueil", workType: "Type de travail", idStatus: "Statut d'identité", readiness: "Préparation au paiement", invoice: "Générateur de facture", print: "Imprimer / Exporter PDF", demo: "Connexion démo en 1 clic", welcome: "Bienvenue" },
  sw: { compliance: "Kikagua Uzingatiaji", payout: "Malipo na Ankara", guide: "Mwongozo wa Kisheria", signOut: "Ondoka", signIn: "Ingia", signUp: "Jisajili", tagline: "Fanya kazi kihalali. Lipwa kwa usalama. Jua haki zako.", score: "Alama ya Utayari", steps: "Hatua za kisheria zinazohitajika", copy: "Nakili Muhtasari", copied: "Imenakiliwa!", scenarios: "Mifano ya hali", country: "Nchi Mwenyeji", workType: "Aina ya Kazi", idStatus: "Hali ya Kitambulisho", readiness: "Utayari wa Malipo", invoice: "Kitengeneza Ankara", print: "Chapisha / Hamisha PDF", demo: "Kuingia Demo kwa Mbofyo 1", welcome: "Karibu" },
  so: { compliance: "Hubiyaha Waafaqsanaanta", payout: "Lacag-bixin & Qaansheeg", guide: "Hagaha Sharciga", signOut: "Ka Bax", signIn: "Gal", signUp: "Isdiiwaangeli", tagline: "Si sharci ah u shaqee. Si ammaan ah lacag u hel. Ogow xuquuqdaada.", score: "Dhibcaha Diyaargarowga", steps: "Tallaabooyinka sharciga ee loo baahan yahay", copy: "Koobi Soo Koobid", copied: "Waa la koobiyay!", scenarios: "Tusaalooyin", country: "Waddanka Martida", workType: "Nooca Shaqada", idStatus: "Xaaladda Aqoonsiga", readiness: "Diyaargarowga Lacagta", invoice: "Sameeyaha Qaansheegga", print: "Daabac / PDF", demo: "Gelitaan Demo 1-Guji", welcome: "Soo dhawoow" },
};
export type TKey = keyof typeof dict.en;
export const t = (lang: Lang, k: TKey) => dict[lang][k];
