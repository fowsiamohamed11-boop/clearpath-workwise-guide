import { useState } from "react";
import { Button, Card, Input, Select } from "./ui";
import { COUNTRIES } from "./data";
import { LANGS, t, type Lang } from "./i18n";

export type User = { name: string; email: string; password: string; role: "Displaced Talent" | "Employer"; country: string; lang: Lang };
const ROLES = ["Displaced Talent", "Employer"] as const;
export const DEMOS: User[] = [
  { name: "Amina Yusuf", email: "talent@demo.clearpath", password: "demo", role: "Displaced Talent", country: "Kenya", lang: "en" },
  { name: "Daniel Okello", email: "employer@demo.clearpath", password: "demo", role: "Employer", country: "Uganda", lang: "en" },
];
const load = (): User[] => { try { return JSON.parse(localStorage.getItem("cp_users") ?? "[]") as User[]; } catch { return []; } };

export function Auth({ lang, onLogin }: { lang: Lang; onLogin: (u: User) => void }) {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [err, setErr] = useState("");
  const [f, setF] = useState<User>({ name: "", email: "", password: "", role: "Displaced Talent", country: "Kenya", lang });
  const set = (k: keyof User) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setErr("");
    const users = load();
    if (mode === "up") {
      if (!f.name || !f.email || f.password.length < 4) return setErr("Please fill all fields (password 4+ characters).");
      if (users.some((u) => u.email === f.email)) return setErr("An account with this email already exists.");
      localStorage.setItem("cp_users", JSON.stringify([...users, f])); onLogin(f);
    } else {
      const u = [...users, ...DEMOS].find((x) => x.email === f.email && x.password === f.password);
      if (!u) return setErr("Email or password is incorrect."); onLogin(u);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
      <div className="flex flex-col justify-center">
        <span className="mb-3 w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">PLP Hackathon · Track 2</span>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">ClearPath <span className="text-success">Legal & Pay</span></h1>
        <p className="mt-4 text-lg text-muted-foreground">{t(lang, "tagline")}</p>
        <div className="mt-8 space-y-3">
          <p className="text-sm font-semibold">For judges — {t(lang, "demo")}:</p>
          <Button variant="accent" className="w-full py-3" onClick={() => onLogin(DEMOS[0]!)}>⚡ Demo: Displaced Talent (Amina)</Button>
          <Button className="w-full py-3" onClick={() => onLogin(DEMOS[1]!)}>⚡ Demo: Employer (Daniel)</Button>
        </div>
      </div>
      <Card className="p-6">
        <div className="mb-5 grid grid-cols-2 rounded-lg bg-muted p-1">
          {(["in", "up"] as const).map((m) => (
            <button key={m} onClick={() => { setMode(m); setErr(""); }} className={`rounded-md py-2 text-sm font-semibold ${mode === m ? "bg-card shadow-xs" : "text-muted-foreground"}`}>
              {t(lang, m === "in" ? "signIn" : "signUp")}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="space-y-3">
          {mode === "up" && <Input label="Full Name" value={f.name} onChange={set("name")} />}
          <Input label="Email" type="email" value={f.email} onChange={set("email")} required />
          <Input label="Password" type="password" value={f.password} onChange={set("password")} required />
          {mode === "up" && (<>
            <Select label="Role" options={ROLES} value={f.role} onChange={set("role")} />
            <Select label={t(lang, "country")} options={COUNTRIES} value={f.country} onChange={set("country")} />
            <label className="block"><span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Preferred Language</span>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={f.lang} onChange={set("lang")}>
                {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
              </select></label>
          </>)}
          {err && <p className="text-sm text-destructive">{err}</p>}
          <Button type="submit" className="w-full">{t(lang, mode === "in" ? "signIn" : "signUp")}</Button>
        </form>
      </Card>
    </div>
  );
}
