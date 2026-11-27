import { useState } from "react";
import { Card } from "./ui";
import { GUIDE } from "./data";

const TOPICS = ["All", "Work Authorization", "Contracting Safely", "Tax & Payouts", "Dispute Rights"];
export function Guide() {
  const [topic, setTopic] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((x) => <button key={x} onClick={() => setTopic(x)} className={`rounded-full border px-3 py-1.5 text-sm font-medium ${topic === x ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}>{x}</button>)}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {GUIDE.filter((g) => topic === "All" || g.topic === topic).map((g) => (
          <Card key={g.q}>
            <span className="text-xs font-semibold uppercase tracking-wide text-success">{g.topic}</span>
            <h3 className="mt-1 font-semibold">{g.q}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{g.a}</p>
            <button className="mt-3 text-sm font-semibold text-primary underline-offset-4 hover:underline" onClick={() => setOpen(open === g.q ? null : g.q)}>{open === g.q ? "Hide scenario" : "See real scenario"}</button>
            {open === g.q && <p className="mt-2 rounded-lg bg-accent p-3 text-sm text-accent-foreground">{g.scenario}</p>}
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">General information, not legal advice. Contact UNHCR, a legal aid clinic or a labour office for your case.</p>
    </div>
  );
}
