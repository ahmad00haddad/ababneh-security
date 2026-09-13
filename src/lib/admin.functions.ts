import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

import type { LeadItem, PackageItem, ServiceItem } from "./site-content";

type AdminSession = { unlocked?: boolean };

function sessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "ababneh-admin",
    maxAge: 60 * 60 * 12,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function passwordMatches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

async function requireAdmin() {
  const session = await useSession<AdminSession>(sessionConfig());
  if (!session.data.unlocked) throw new Error("UNAUTHORIZED");
  return session;
}

async function db() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => ({ password: String(data.password ?? "") }))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected) throw new Error("لم يتم ضبط كلمة مرور الإدارة");
    if (!passwordMatches(data.password, expected)) return { ok: false as const };
    const session = await useSession<AdminSession>(sessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  return { unlocked: session.data.unlocked === true };
});

export const adminGetData = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const supabase = await db();
  const [packages, services, leads] = await Promise.all([
    supabase.from("packages").select("*").order("sort_order"),
    supabase.from("services").select("*").order("sort_order"),
    supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(200),
  ]);
  return {
    packages: (packages.data ?? []) as unknown as PackageItem[],
    services: (services.data ?? []) as unknown as ServiceItem[],
    leads: (leads.data ?? []) as unknown as LeadItem[],
  };
});

export const savePackage = createServerFn({ method: "POST" })
  .inputValidator((data: Partial<PackageItem>) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const supabase = await db();
    const row = {
      name: String(data.name ?? "").slice(0, 200),
      label: String(data.label ?? "").slice(0, 80),
      price: Number(data.price ?? 0),
      featured: Boolean(data.featured),
      features: (data.features ?? []).map((f) => String(f).slice(0, 300)).filter(Boolean),
      sort_order: Number(data.sort_order ?? 0),
      visible: data.visible !== false,
    };
    const query = data.id
      ? supabase.from("packages").update(row).eq("id", data.id)
      : supabase.from("packages").insert(row);
    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deletePackage = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const supabase = await db();
    const { error } = await supabase.from("packages").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const saveService = createServerFn({ method: "POST" })
  .inputValidator((data: Partial<ServiceItem>) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const supabase = await db();
    const row = {
      title: String(data.title ?? "").slice(0, 200),
      text: String(data.text ?? "").slice(0, 600),
      icon: String(data.icon ?? "ShieldCheck").slice(0, 40),
      sort_order: Number(data.sort_order ?? 0),
      visible: data.visible !== false,
    };
    const query = data.id
      ? supabase.from("services").update(row).eq("id", data.id)
      : supabase.from("services").insert(row);
    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteService = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const supabase = await db();
    const { error } = await supabase.from("services").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const updateLead = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; status: string }) => ({
    id: String(data.id),
    status: String(data.status).slice(0, 30),
  }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const supabase = await db();
    const { error } = await supabase.from("leads").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteLead = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => ({ id: String(data.id) }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const supabase = await db();
    const { error } = await supabase.from("leads").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
