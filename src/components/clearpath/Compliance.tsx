import { useEffect, useMemo, useState } from "react";
import { Button, Card, ScoreRing, Select } from "./ui";
import { assess, COUNTRIES, ID_STATUSES, SCENARIOS, WORK_TYPES, type Country, type IdStatus, type WorkType } from "./data";
import { t, type Lang } from "./i18n";

export function Compliance({ lang, defaultCountry }: { lang: Lang; defaultCountry: string }) {
  const [c, setC] = useState<Country>((COUNTRIES as readonly string[]).includes(defaultCountry) ? (defaultCountry as Country) : "Kenya");
  const [w, setW] = useState<WorkType>("Remote Contractor");
  const [id, setId] = useState<IdStatus>("Refugee ID / Alien Card");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const { score, steps } = useMemo(() => assess(c, w, id), [c, w, id]);
  useEffect(() => setDone({}), [c, w, id]);
  const progress = steps.filter((s) => done[s]).length;
  const final = Math.round(score + (100 - score) * (progress / steps.length));

  const copy = async () => {
    const txt = `ClearPath Compliance Summary\nCountry: ${c}\nWork type: ${w}\nID: ${id}\nReadiness: ${final}%\n\nSteps:\n${steps.map((s) => `[${done[s] ? "x" : " "}] ${s}`).join("\n")}`;
    await navigator.clipboard.writeText(txt); setCopied(true); setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="mb-3 text-sm font-semibold">{t(lang, "scenarios")}</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {SCENARIOS.map((s) => (
            <button key={s.title} onClick={() => { setC(s.c); setW(s.w); setId(s.id); }} className="rounded-lg border p-3 text-left transition-colors hover:border-success hover:bg-accent">
              <p className="text-sm font-semibold">{s.title}</p><p className="text-xs text-muted-foreground">{s.who}</p>
            </button>
          ))}
        </div>
      </Card>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Card className="space-y-4">
          <Select label={t(lang, "country")} options={COUNTRIES} value={c} onChange={(e) => setC(e.target.value as Country)} />
          <Select label={t(lang, "workType")} options={WORK_TYPES} value={w} onChange={(e) => setW(e.target.value as WorkType)} />
          <Select label={t(lang, "idStatus")} options={ID_STATUSES} value={id} onChange={(e) => setId(e.target.value as IdStatus)} />
          <div className="flex items-center gap-4 rounded-lg bg-muted p-4">
            <ScoreRing value={final} />
            <div><p className="font-semibold">{t(lang, "score")}</p>
              <p className="text-sm text-muted-foreground">Base {score}% · {progress}/{steps.length} steps done</p></div>
          </div>
        </Card>
        <Card>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="font-semibold">{t(lang, "steps")}</h3>
            <Button variant="outline" onClick={copy}>{copied ? t(lang, "copied") : t(lang, "copy")}</Button>
          </div>
          <ul className="space-y-2">
            {steps.map((s) => (
              <li key={s}><label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 hover:bg-muted">
                <input type="checkbox" className="mt-0.5 size-4 accent-(--success)" checked={!!done[s]} onChange={() => setDone({ ...done, [s]: !done[s] })} />
                <span className={`text-sm ${done[s] ? "text-muted-foreground line-through" : ""}`}>{s}</span>
              </label></li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
