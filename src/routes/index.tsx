import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Auth, type User } from "@/components/clearpath/Auth";
import { Compliance } from "@/components/clearpath/Compliance";
import { Payout } from "@/components/clearpath/Payout";
import { Guide } from "@/components/clearpath/Guide";
import { LANGS, t, type Lang } from "@/components/clearpath/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClearPath Legal & Pay — Work legally, get paid safely" },
      { name: "description", content: "Compliance checker, payout and invoice tools, and a plain-language legal guide for displaced talent." },
      { property: "og:title", content: "ClearPath Legal & Pay" },
      { property: "og:description", content: "Compliance, payouts and legal guidance for displaced talent." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Tab = "compliance" | "payout" | "guide";

function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [tab, setTab] = useState<Tab>("compliance");

  useEffect(() => {
    try {
      const u = localStorage.getItem("cp_session"); if (u) setUser(JSON.parse(u) as User);
      const l = localStorage.getItem("cp_lang") as Lang | null; if (l) setLang(l);
    } catch { /* ignore */ }
  }, []);
  const changeLang = (l: Lang) => { setLang(l); localStorage.setItem("cp_lang", l); };
  const login = (u: User) => { setUser(u); changeLang(u.lang); localStorage.setItem("cp_session", JSON.stringify(u)); };
  const logout = () => { setUser(null); localStorage.removeItem("cp_session"); };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b bg-card/90 backdrop-blur-sm print:hidden">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2 font-bold">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">C</span>
            <span>ClearPath <span className="text-success">Legal & Pay</span></span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <select aria-label="Language" value={lang} onChange={(e) => changeLang(e.target.value as Lang)} className="rounded-lg border bg-background px-2 py-1.5 text-sm">
              {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
            {user && (<>
              <span className="hidden items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground sm:flex">
                <span className="grid size-5 place-items-center rounded-full bg-success text-success-foreground">{user.name[0]}</span>{user.name} · {user.role}
              </span>
              <button onClick={logout} className="rounded-lg border px-3 py-1.5 text-sm font-semibold hover:bg-muted">{t(lang, "signOut")}</button>
            </>)}
          </div>
        </div>
      </header>
      <main className="flex-1">
        {!user ? <Auth lang={lang} onLogin={login} /> : (
          <div className="mx-auto max-w-6xl px-4 py-8">
            <h2 className="text-2xl font-bold">{t(lang, "welcome")}, {user.name.split(" ")[0]} 👋</h2>
            <p className="mb-6 text-muted-foreground">{t(lang, "tagline")}</p>
            <nav className="mb-6 grid grid-cols-3 gap-1 rounded-xl bg-muted p-1 print:hidden">
              {(["compliance", "payout", "guide"] as Tab[]).map((k) => (
                <button key={k} onClick={() => setTab(k)} className={`rounded-lg px-2 py-2.5 text-sm font-semibold ${tab === k ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"}`}>{t(lang, k)}</button>
              ))}
            </nav>
            {tab === "compliance" && <Compliance lang={lang} defaultCountry={user.country} />}
            {tab === "payout" && <Payout lang={lang} userName={user.name} />}
            {tab === "guide" && <Guide />}
          </div>
        )}
      </main>
      <footer className="border-t bg-primary text-primary-foreground print:hidden">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-sm">
          <p className="font-semibold">PLP Mini Hackathon · Track 2: Legal & Financial Access</p>
          <div className="flex gap-2">
            {["SDG 8 Decent Work", "SDG 10 Reduced Inequalities", "SDG 16 Peace & Justice"].map((s) => <span key={s} className="rounded-full bg-primary-foreground/15 px-3 py-1 text-xs">{s}</span>)}
          </div>
        </div>
      </footer>
    </div>
  );
}
