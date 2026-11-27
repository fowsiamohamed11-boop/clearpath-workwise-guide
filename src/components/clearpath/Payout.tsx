import { useState } from "react";
import { Button, Card, Input, Label, ScoreRing, Select } from "./ui";
import { t, type Lang } from "./i18n";

const METHODS = {
  Bank: ["Bank account in my name", "Government-recognised ID on file", "Proof of address", "SWIFT/IBAN details ready"],
  "Mobile Money": ["Registered SIM in my name", "Wallet verified with refugee ID", "Transaction limit fits my income", "Know withdrawal agents nearby"],
  "Cross-border": ["Account on a payout platform (e.g. Wise, Payoneer)", "Identity verification passed", "Linked local bank or wallet", "Understand conversion fees"],
} as const;
type Method = keyof typeof METHODS;
const CURRENCIES = ["USD", "KES", "EUR", "UGX"] as const;

export function Payout({ lang, userName }: { lang: Lang; userName: string }) {
  const [m, setM] = useState<Method>("Mobile Money");
  const [ok, setOk] = useState<Record<string, boolean>>({});
  const items = METHODS[m];
  const score = Math.round((items.filter((i) => ok[i]).length / items.length) * 100);
  const [inv, setInv] = useState({ client: "Acme Remote Inc.", item: "Website development — November", amount: "850", currency: "USD" });
  const [no] = useState(() => `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`);
  const amt = Number(inv.amount) || 0;
  const fmt = new Intl.NumberFormat("en", { style: "currency", currency: inv.currency }).format(amt);

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="mb-3 font-semibold">{t(lang, "readiness")}</h3>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {(Object.keys(METHODS) as Method[]).map((k) => (
            <button key={k} onClick={() => setM(k)} className={`rounded-lg border px-2 py-2 text-sm font-semibold ${m === k ? "border-success bg-accent text-accent-foreground" : "hover:bg-muted"}`}>{k}</button>
          ))}
        </div>
        <div className="grid items-center gap-4 md:grid-cols-[auto_1fr]">
          <ScoreRing value={score} />
          <div className="grid gap-2 sm:grid-cols-2">
            {items.map((i) => (
              <label key={i} className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm hover:bg-muted">
                <input type="checkbox" className="size-4 accent-(--success)" checked={!!ok[i]} onChange={() => setOk({ ...ok, [i]: !ok[i] })} />{i}
              </label>
            ))}
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{score === 100 ? "✅ You're ready to receive payouts via " + m + "." : "Complete the remaining items to receive payouts safely."}</p>
      </Card>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <Card className="space-y-3">
          <h3 className="font-semibold">{t(lang, "invoice")}</h3>
          <Input label="Client name" value={inv.client} onChange={(e) => setInv({ ...inv, client: e.target.value })} />
          <Input label="Service item" value={inv.item} onChange={(e) => setInv({ ...inv, item: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Amount" type="number" min="0" value={inv.amount} onChange={(e) => setInv({ ...inv, amount: e.target.value })} />
            <Select label="Currency" options={CURRENCIES} value={inv.currency} onChange={(e) => setInv({ ...inv, currency: e.target.value })} />
          </div>
          <Button variant="accent" className="w-full" onClick={() => window.print()}>🖨 {t(lang, "print")}</Button>
        </Card>
        <Card className="print-area p-8">
          <div className="flex items-start justify-between gap-4 border-b pb-4">
            <div><p className="text-2xl font-bold">INVOICE</p><p className="text-sm text-muted-foreground">{no}</p></div>
            <div className="text-right text-sm"><p className="font-semibold">{userName}</p><p className="text-muted-foreground">{new Date().toLocaleDateString()}</p></div>
          </div>
          <div className="py-4"><Label>Bill to</Label><p className="font-semibold">{inv.client || "—"}</p></div>
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-muted-foreground"><th className="py-2">Description</th><th className="py-2 text-right">Amount</th></tr></thead>
            <tbody><tr className="border-b"><td className="py-3">{inv.item || "—"}</td><td className="py-3 text-right">{fmt}</td></tr></tbody>
          </table>
          <div className="mt-4 flex justify-end"><div className="rounded-lg bg-accent px-4 py-2 text-right"><p className="text-xs text-accent-foreground">Total due</p><p className="text-xl font-bold">{fmt}</p></div></div>
          <p className="mt-6 text-xs text-muted-foreground">Payment via {m}. Payment due within 14 days. Generated with ClearPath Legal & Pay.</p>
        </Card>
      </div>
    </div>
  );
}
