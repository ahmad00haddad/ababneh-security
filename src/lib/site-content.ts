import {
  AlarmClock,
  Building2,
  Camera,
  Fingerprint,
  Headphones,
  Home,
  KeyRound,
  LockKeyhole,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type PackageItem = {
  id: string;
  name: string;
  label: string;
  price: number;
  featured: boolean;
  features: string[];
  sort_order: number;
  visible: boolean;
};

export type ServiceItem = {
  id: string;
  title: string;
  text: string;
  icon: string;
  sort_order: number;
  visible: boolean;
};

export type LeadItem = {
  id: string;
  name: string;
  phone: string;
  message: string;
  source: string;
  status: string;
  created_at: string;
};

export const serviceIcons: Record<string, LucideIcon> = {
  AlarmClock,
  Building2,
  Camera,
  Fingerprint,
  Headphones,
  Home,
  KeyRound,
  LockKeyhole,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Zap,
};

export const serviceIconNames = Object.keys(serviceIcons);

export function getServiceIcon(name: string): LucideIcon {
  return serviceIcons[name] ?? ShieldCheck;
}
