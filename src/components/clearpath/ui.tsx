import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes, ButtonHTMLAttributes } from "react";

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-xl border bg-card p-5 shadow-xs ${className}`}>{children}</div>
);
export const Label = ({ children }: { children: ReactNode }) => (
  <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">{children}</span>
);
const field = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-hidden focus:ring-2 focus:ring-ring";
export const Select = ({ label, options, ...p }: { label: string; options: readonly string[] } & SelectHTMLAttributes<HTMLSelectElement>) => (
  <label className="block"><Label>{label}</Label>
    <select className={field} {...p}>{options.map((o) => <option key={o}>{o}</option>)}</select>
  </label>
);
export const Input = ({ label, ...p }: { label: string } & InputHTMLAttributes<HTMLInputElement>) => (
  <label className="block"><Label>{label}</Label><input className={field} {...p} /></label>
);
export const Button = ({ variant = "primary", className = "", ...p }: { variant?: "primary" | "accent" | "outline" } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const v = { primary: "bg-primary text-primary-foreground hover:bg-primary/90", accent: "bg-success text-success-foreground hover:bg-success/90", outline: "border bg-background hover:bg-muted" }[variant];
  return <button className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${v} ${className}`} {...p} />;
};
export const ScoreRing = ({ value }: { value: number }) => {
  const color = value >= 70 ? "var(--success)" : value >= 45 ? "var(--warning)" : "var(--destructive)";
  return (
    <div className="relative grid size-28 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(${color} ${value * 3.6}deg, var(--muted) 0)` }}>
      <div className="grid size-22 place-items-center rounded-full bg-card text-2xl font-bold">{value}%</div>
    </div>
  );
};
