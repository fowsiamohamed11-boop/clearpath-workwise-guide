# Clearpath Workwise Guide

Build a clean, fast, complete single-page web application called "ClearPath Legal & Pay" for the PLP Mini Hackathon under Track 2: Legal & Financial Access (SDGs 8, 10 & 16). Keep the codebase lightweight and self-contained using React state and localStorage (no heavy backend setup needed) so it builds completely in one pass.

UI & Auth (Lightweight & Complete):

- Modern light-first fintech SaaS design (slate-navy & emerald accents, fully mobile-responsive).

- Top navbar with a working Language Switcher (English, French, Swahili, Somali) that updates key UI labels, plus logged-in user badge and Sign Out button.

- Complete Auth Screen (Sign In, Sign Up with Full Name, Email, Password, Role [Displaced Talent / Employer], Host Country, Preferred Language, plus 2 prominent "1-Click Demo Login" buttons for Judges).

3 Core Working Tabs:

1. Compliance Checker: Select Host Country (Kenya, Uganda, Germany, Canada, Remote), Work Type (Remote Contractor, Local Hire, Paid Fellowship), and ID Status -> displays instant Compliance Readiness Score, required legal steps, interactive checklist, and "Copy Summary" button.

2. Payout & Invoice Generator: Interactive payout readiness check (Bank, Mobile Money, Cross-border) + working Invoice Generator (client name, service item, amount, currency [USD, KES, EUR, UGX], live preview, and Print/Export).

3. Multilingual Legal Guide: Clean Q&A / Scenario cards covering Work Authorization, Contracting Safely, Tax & Payouts, and Dispute Rights in plain language.

Include 3 pre-loaded sample scenarios and a clean PLP Hackathon Track 2 (SDGs 8, 10 & 16) footer.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://clearpath-workwise-guide.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6a2e9053-59ea-4e49-bc83-e8d3c7cd9052).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
