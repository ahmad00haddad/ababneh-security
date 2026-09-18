import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import type { PackageItem, ServiceItem } from "./site-content";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const [packagesRes, servicesRes, settingsRes] = await Promise.all([
    supabase.from("packages").select("*").eq("visible", true).order("sort_order"),
    supabase.from("services").select("*").eq("visible", true).order("sort_order"),
    supabase.from("site_settings").select("key, value"),
  ]);

  const settings: Record<string, string> = {};
  for (const row of (settingsRes.data ?? []) as { key: string; value: string }[]) {
    settings[row.key] = row.value;
  }

  return {
    packages: (packagesRes.data ?? []) as unknown as PackageItem[],
    services: (servicesRes.data ?? []) as unknown as ServiceItem[],
    settings,
  };
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: { name?: string; phone: string; message?: string; source?: string }) => {
    const phone = String(data.phone ?? "").trim();
    if (phone.replace(/\D/g, "").length < 9) throw new Error("رقم هاتف غير صالح");
    return {
      name: String(data.name ?? "").slice(0, 120),
      phone: phone.slice(0, 40),
      message: String(data.message ?? "").slice(0, 2000),
      source: String(data.source ?? "website").slice(0, 40),
    };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").insert(data);
    if (error) throw new Error("تعذر حفظ الطلب");
    return { ok: true as const };
  });
