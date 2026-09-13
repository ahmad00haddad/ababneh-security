import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState } from "react";
import { Loader2, LockKeyhole, LogOut, Plus, RefreshCw, Save, Trash2 } from "lucide-react";

import {
  adminGetData,
  adminLogin,
  adminLogout,
  adminStatus,
  deleteLead,
  deletePackage,
  deleteService,
  savePackage,
  saveService,
  updateLead,
} from "../lib/admin.functions";
import { serviceIconNames, type LeadItem, type PackageItem, type ServiceItem } from "../lib/site-content";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "لوحة الإدارة | Ababneh Security" },
      { name: "description", content: "لوحة تحكم خاصة لإدارة الباقات والخدمات وطلبات العملاء." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "لوحة الإدارة | Ababneh Security" },
      { property: "og:description", content: "لوحة تحكم خاصة لإدارة محتوى الموقع وطلبات العملاء." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const card = "rounded-2xl border border-border bg-surface p-5 shadow-lg";
const input =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-action";
const btn =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all hover:-translate-y-0.5";

function AdminPage() {
  const login = useServerFn(adminLogin);
  const logout = useServerFn(adminLogout);
  const status = useServerFn(adminStatus);
  const getData = useServerFn(adminGetData);

  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"leads" | "packages" | "services">("leads");
  const [data, setData] = useState<{
    packages: PackageItem[];
    services: ServiceItem[];
    leads: LeadItem[];
  }>({ packages: [], services: [], leads: [] });
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setData(await getData({}));
    } finally {
      setLoading(false);
    }
  }, [getData]);

  useEffect(() => {
    (async () => {
      const res = await status({});
      setUnlocked(res.unlocked);
      setChecking(false);
      if (res.unlocked) void refresh();
    })();
  }, [status, refresh]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await login({ data: { password } });
    if (!res.ok) {
      setError("كلمة المرور غير صحيحة");
      return;
    }
    setPassword("");
    setUnlocked(true);
    void refresh();
  }

  if (checking) {
    return (
      <main dir="rtl" className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-action" />
      </main>
    );
  }

  if (!unlocked) {
    return (
      <main dir="rtl" className="flex min-h-screen items-center justify-center bg-background px-5">
        <form onSubmit={handleLogin} className={`${card} w-full max-w-sm space-y-5 text-center`}>
          <LockKeyhole className="mx-auto size-10 text-action" />
          <h1 className="text-2xl font-black">لوحة الإدارة</h1>
          <p className="text-sm text-muted-foreground">أدخل كلمة المرور للمتابعة</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={input}
            placeholder="كلمة المرور"
            autoComplete="current-password"
          />
          {error && <p className="text-xs font-bold text-red-500">{error}</p>}
          <button className={`${btn} w-full bg-action text-white`}>دخول</button>
        </form>
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-background px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-black">لوحة إدارة الموقع</h1>
          <div className="flex gap-2">
            <button onClick={() => void refresh()} className={`${btn} border border-border`}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />} تحديث
            </button>
            <button
              onClick={async () => {
                await logout({});
                setUnlocked(false);
              }}
              className={`${btn} border border-border text-red-500`}
            >
              <LogOut className="size-4" /> خروج
            </button>
          </div>
        </header>

        <nav className="flex gap-2 rounded-2xl border border-border bg-surface p-2">
          {(
            [
              ["leads", `الطلبات (${data.leads.length})`],
              ["packages", "الباقات"],
              ["services", "الخدمات"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 rounded-xl px-3 py-2 text-sm font-bold transition-colors ${
                tab === key ? "bg-action text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {tab === "leads" && <LeadsTab leads={data.leads} refresh={refresh} />}
        {tab === "packages" && <PackagesTab packages={data.packages} refresh={refresh} />}
        {tab === "services" && <ServicesTab services={data.services} refresh={refresh} />}
      </div>
    </main>
  );
}

function LeadsTab({ leads, refresh }: { leads: LeadItem[]; refresh: () => Promise<void> }) {
  const update = useServerFn(updateLead);
  const remove = useServerFn(deleteLead);

  if (leads.length === 0) {
    return <p className={`${card} text-center text-sm text-muted-foreground`}>لا توجد طلبات بعد.</p>;
  }

  return (
    <div className="space-y-3">
      {leads.map((lead) => (
        <div key={lead.id} className={`${card} flex flex-wrap items-center justify-between gap-3`}>
          <div>
            <p className="font-bold">{lead.name || "بدون اسم"}</p>
            <a href={`tel:${lead.phone}`} dir="ltr" className="block text-sm font-bold text-action">
              {lead.phone}
            </a>
            {lead.message && <p className="mt-1 text-sm text-muted-foreground">{lead.message}</p>}
            <p className="mt-1 text-[11px] text-muted-foreground">
              {new Date(lead.created_at).toLocaleString("ar-JO")} · {lead.source}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={lead.status}
              onChange={async (e) => {
                await update({ data: { id: lead.id, status: e.target.value } });
                await refresh();
              }}
              className={`${input} w-32`}
            >
              <option value="new">جديد</option>
              <option value="contacted">تم التواصل</option>
              <option value="done">مغلق</option>
            </select>
            <button
              onClick={async () => {
                await remove({ data: { id: lead.id } });
                await refresh();
              }}
              className={`${btn} border border-border text-red-500`}
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const emptyPackage: Partial<PackageItem> = {
  name: "",
  label: "",
  price: 0,
  featured: false,
  features: [],
  sort_order: 0,
  visible: true,
};

function PackagesTab({ packages, refresh }: { packages: PackageItem[]; refresh: () => Promise<void> }) {
  const save = useServerFn(savePackage);
  const remove = useServerFn(deletePackage);
  const [items, setItems] = useState<Partial<PackageItem>[]>(packages);

  useEffect(() => setItems(packages), [packages]);

  const patch = (idx: number, value: Partial<PackageItem>) =>
    setItems((prev) => prev.map((item, i) => (i === idx ? { ...item, ...value } : item)));

  return (
    <div className="space-y-4">
      <button onClick={() => setItems((p) => [...p, { ...emptyPackage }])} className={`${btn} bg-action text-white`}>
        <Plus className="size-4" /> باقة جديدة
      </button>
      {items.map((item, idx) => (
        <div key={item.id ?? `new-${idx}`} className={`${card} space-y-3`}>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1 text-xs font-bold">
              اسم الباقة
              <input className={input} value={item.name ?? ""} onChange={(e) => patch(idx, { name: e.target.value })} />
            </label>
            <label className="space-y-1 text-xs font-bold">
              الشارة
              <input className={input} value={item.label ?? ""} onChange={(e) => patch(idx, { label: e.target.value })} />
            </label>
            <label className="space-y-1 text-xs font-bold">
              السعر (د.أ)
              <input
                type="number"
                className={input}
                value={item.price ?? 0}
                onChange={(e) => patch(idx, { price: Number(e.target.value) })}
              />
            </label>
            <label className="space-y-1 text-xs font-bold">
              الترتيب
              <input
                type="number"
                className={input}
                value={item.sort_order ?? 0}
                onChange={(e) => patch(idx, { sort_order: Number(e.target.value) })}
              />
            </label>
          </div>
          <label className="block space-y-1 text-xs font-bold">
            المميزات (سطر لكل ميزة)
            <textarea
              rows={4}
              className={input}
              value={(item.features ?? []).join("\n")}
              onChange={(e) => patch(idx, { features: e.target.value.split("\n") })}
            />
          </label>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={Boolean(item.featured)}
                onChange={(e) => patch(idx, { featured: e.target.checked })}
              />
              الأكثر طلباً
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.visible !== false}
                onChange={(e) => patch(idx, { visible: e.target.checked })}
              />
              ظاهرة في الموقع
            </label>
            <div className="ms-auto flex gap-2">
              <button
                onClick={async () => {
                  await save({ data: { ...item, features: (item.features ?? []).filter((f) => f.trim()) } });
                  await refresh();
                }}
                className={`${btn} bg-action text-white`}
              >
                <Save className="size-4" /> حفظ
              </button>
              <button
                onClick={async () => {
                  if (item.id) {
                    await remove({ data: { id: item.id } });
                    await refresh();
                  } else {
                    setItems((p) => p.filter((_, i) => i !== idx));
                  }
                }}
                className={`${btn} border border-border text-red-500`}
              >
                <Trash2 className="size-4" /> حذف
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const emptyService: Partial<ServiceItem> = {
  title: "",
  text: "",
  icon: "ShieldCheck",
  sort_order: 0,
  visible: true,
};

function ServicesTab({ services, refresh }: { services: ServiceItem[]; refresh: () => Promise<void> }) {
  const save = useServerFn(saveService);
  const remove = useServerFn(deleteService);
  const [items, setItems] = useState<Partial<ServiceItem>[]>(services);

  useEffect(() => setItems(services), [services]);

  const patch = (idx: number, value: Partial<ServiceItem>) =>
    setItems((prev) => prev.map((item, i) => (i === idx ? { ...item, ...value } : item)));

  return (
    <div className="space-y-4">
      <button onClick={() => setItems((p) => [...p, { ...emptyService }])} className={`${btn} bg-action text-white`}>
        <Plus className="size-4" /> خدمة جديدة
      </button>
      {items.map((item, idx) => (
        <div key={item.id ?? `new-${idx}`} className={`${card} space-y-3`}>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1 text-xs font-bold">
              العنوان
              <input className={input} value={item.title ?? ""} onChange={(e) => patch(idx, { title: e.target.value })} />
            </label>
            <label className="space-y-1 text-xs font-bold">
              الأيقونة
              <select className={input} value={item.icon ?? "ShieldCheck"} onChange={(e) => patch(idx, { icon: e.target.value })}>
                {serviceIconNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block space-y-1 text-xs font-bold">
            الوصف
            <textarea rows={2} className={input} value={item.text ?? ""} onChange={(e) => patch(idx, { text: e.target.value })} />
          </label>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
            <label className="flex items-center gap-2">
              الترتيب
              <input
                type="number"
                className={`${input} w-20`}
                value={item.sort_order ?? 0}
                onChange={(e) => patch(idx, { sort_order: Number(e.target.value) })}
              />
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.visible !== false}
                onChange={(e) => patch(idx, { visible: e.target.checked })}
              />
              ظاهرة في الموقع
            </label>
            <div className="ms-auto flex gap-2">
              <button
                onClick={async () => {
                  await save({ data: item });
                  await refresh();
                }}
                className={`${btn} bg-action text-white`}
              >
                <Save className="size-4" /> حفظ
              </button>
              <button
                onClick={async () => {
                  if (item.id) {
                    await remove({ data: { id: item.id } });
                    await refresh();
                  } else {
                    setItems((p) => p.filter((_, i) => i !== idx));
                  }
                }}
                className={`${btn} border border-border text-red-500`}
              >
                <Trash2 className="size-4" /> حذف
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
