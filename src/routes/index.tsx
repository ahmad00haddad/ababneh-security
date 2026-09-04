import { createFileRoute } from "@tanstack/react-router";
import {
  AlarmClock,
  ArrowLeft,
  BadgeCheck,
  Building2,
  Camera,
  Check,
  ChevronDown,
  Clock3,
  Facebook,
  Headphones,
  Home,
  Instagram,
  KeyRound,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  MoonStar,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import heroImage from "../assets/security-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "أنظمة حماية وكاميرات مراقبة | Ababneh Security" },
      {
        name: "description",
        content:
          "تركيب كاميرات مراقبة وأنظمة إنذار وحماية متكاملة في الأردن مع كفالة حقيقية ودعم فني سريع.",
      },
      { property: "og:title", content: "Ababneh Security | أنظمة حماية متطورة" },
      {
        property: "og:description",
        content: "حلول كاميرات مراقبة وإنذار ذكية لحماية منزلك وعملك على مدار الساعة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// قم بوضع رقم هاتف المبيعات هنا (بدون أصفار بالبداية وبدون علامة +) مثال للأردن: 962790000000
const whatsappNumber = "962788757801";
const whatsappBase = `https://wa.me/${whatsappNumber}?text=`;

const services = [
  {
    icon: AlarmClock,
    title: "أنظمة الإنذار الذكية",
    text: "حماية فورية ضد السرقة والحريق مع تنبيهات مباشرة إلى هاتفك.",
  },
  {
    icon: Building2,
    title: "أنظمة الإنتركم",
    text: "تحكم بالصوت والصورة للفلل والعمارات والمكاتب بأعلى وضوح.",
  },
  {
    icon: KeyRound,
    title: "التحكم بالدخول",
    text: "بصمة ووجه وبطاقات ذكية لإدارة دخول الموظفين والزوار بأمان.",
  },
  {
    icon: Home,
    title: "المنزل الذكي",
    text: "تحكم متكامل بالإضاءة والستائر والتكييف من تطبيق واحد.",
  },
];

const packages = [
  {
    name: "باقة 2 ميجابكسل ColorVu",
    label: "الاقتصادية",
    price: 150,
    featured: false,
    features: [
      "3 كاميرات Hikvision / Dahua (تصوير ملون)",
      "جهاز تسجيل DVR بأربع قنوات",
      "قرص تخزين 1 تيرابايت (يكفي لتسجيل 15-30 يوم)",
      "تركيب وبرمجة كاملة (كفالة حقيقية)",
    ],
  },
  {
    name: "باقة 5 ميجابكسل ColorVu",
    label: "الأكثر طلباً",
    price: 190,
    featured: true,
    features: [
      "3 كاميرات Hikvision / Dahua (تصوير ملون)",
      "جهاز تسجيل DVR بدقة 5MP",
      "قرص تخزين 1 تيرابايت (يكفي لتسجيل 15-30 يوم)",
      "تركيب وبرمجة كاملة (كفالة حقيقية)",
    ],
  },
];

function ActionLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "whatsapp";
  className?: string;
}) {
  const styles = {
    primary: "bg-action text-action-foreground shadow-action hover:bg-action-hover",
    outline: "border border-hero-border bg-hero-glass text-hero-foreground backdrop-blur-md hover:bg-hero-glass-hover",
    whatsapp: "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-hover",
  };
  return (
    <a
      href={href}
      className={`group relative overflow-hidden inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${styles[variant]} ${className}`}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      )}
      <span className="relative flex items-center gap-2">{children}</span>
    </a>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`flex items-center gap-3 ${light ? "text-hero-foreground" : "text-foreground"}`} aria-label="العودة إلى أعلى الصفحة">
      <span className="grid size-11 shrink-0 place-items-center rounded-md bg-action text-action-foreground shadow-action">
        <ShieldCheck className="size-6" strokeWidth={2.3} />
      </span>
      <span className="min-w-0 leading-tight">
        <strong className="block truncate font-display text-lg">Ababneh Security</strong>
        <span className={`block text-[11px] ${light ? "text-hero-muted" : "text-muted-foreground"}`}>أنظمة حماية متكاملة</span>
      </span>
    </a>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cameras, setCameras] = useState(4);
  const [resolution, setResolution] = useState("2MP ColorVu");
  const [alarm, setAlarm] = useState(false);

  const estimate = useMemo(() => {
    let base = 60; // التكلفة الأساسية (جهاز التسجيل، التركيب، هارد ديسك)
    let unit = 30; // تكلفة الكاميرا الواحدة
    if (resolution === "5MP ColorVu") {
      base = 70;
      unit = 40;
    } else if (resolution === "IP 4K") {
      base = 150; // أجهزة شبكية NVR مكلفة أكثر
      unit = 60;
    }
    return base + (cameras * unit) + (alarm ? 185 : 0);
  }, [alarm, cameras, resolution]);

  const cameraHint = cameras <= 4 ? "مثالي للشقق والمكاتب الصغيرة" : cameras <= 8 ? "ممتاز للفلل والمحلات التجارية" : "مصمم للمستودعات والشركات الكبيرة";
  const resolutionHint = resolution === "2MP ColorVu" ? "وضوح ممتاز للمراقبة العامة" : resolution === "5MP ColorVu" ? "دقة عالية للوجوه ولوحات السيارات" : "أقصى دقة للمنشآت الحساسة";

  const quoteMessage = encodeURIComponent(
    `مرحباً، أريد عرض سعر لنظام مكوّن من ${cameras} كاميرات بدقة ${resolution}${alarm ? " مع نظام إنذار AX PRO" : ""}. السعر التقديري ${estimate} د.أ.`,
  );

  return (
    <main id="top" dir="rtl" className="overflow-x-hidden bg-background text-foreground">
      <section className="relative min-h-[92svh] overflow-hidden bg-hero text-hero-foreground">
        <img
          src={heroImage}
          alt="كاميرا مراقبة حديثة تحمي منزلاً ذكياً في المساء"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
        />
        <div className="absolute inset-0 bg-hero-overlay" />

        <header className="relative z-20 border-b border-hero-border">
          <div className="mx-auto grid min-h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:px-12">
            <Brand light />
            <nav className="hidden items-center gap-8 text-sm font-semibold text-hero-muted lg:flex" aria-label="التنقل الرئيسي">
              <a className="transition-colors hover:text-hero-foreground" href="#about">من نحن</a>
              <a className="transition-colors hover:text-hero-foreground" href="#packages">الباقات</a>
              <a className="transition-colors hover:text-hero-foreground" href="#custom">كوّن نظامك</a>
              <a className="transition-colors hover:text-hero-foreground" href="#services">خدماتنا</a>
              <a className="transition-colors hover:text-hero-foreground" href="#contact">تواصل معنا</a>
            </nav>
            <div className="hidden lg:block">
              <ActionLink href={`${whatsappBase}${encodeURIComponent("مرحباً، أريد حجز كشف مجاني")}`} variant="primary">
                <Phone className="size-4" /> احجز كشفاً مجانياً
              </ActionLink>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="grid size-11 place-items-center rounded-md border border-hero-border bg-hero-glass text-hero-foreground lg:hidden"
              aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
          {menuOpen && (
            <nav className="border-t border-hero-border bg-hero-glass px-5 py-4 backdrop-blur-xl lg:hidden" aria-label="قائمة الهاتف">
              <div className="mx-auto grid max-w-7xl gap-1">
                {[
                  ["من نحن", "#about"],
                  ["الباقات", "#packages"],
                  ["كوّن نظامك", "#custom"],
                  ["خدماتنا", "#services"],
                  ["تواصل معنا", "#contact"],
                ].map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold text-hero-muted hover:bg-hero-glass-hover hover:text-hero-foreground">
                    {label}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(92svh-5rem)] max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-12">
          <div className="max-w-3xl animate-reveal">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-hero-border bg-hero-glass px-4 py-2 text-xs font-bold text-hero-muted backdrop-blur-lg sm:text-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-action opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-action" />
              </span>
              حماية متصلة على مدار الساعة
            </div>
            <h1 className="max-w-3xl font-display text-4xl font-black leading-[1.25] sm:text-5xl lg:text-7xl">
              أنظمة حماية متطورة<br />
              <span className="text-action">لأمان عائلتك وعملك</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-hero-muted sm:text-lg">
              شاهد كل التفاصيل بألوان حقيقية ليلاً مع تقنية ColorVu، وابقَ مطمئناً مع مراقبة ذكية ودعم فني سريع على مدار الساعة.
            </p>
            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="flex w-full flex-col gap-2 sm:w-auto">
                <ActionLink href={`${whatsappBase}${encodeURIComponent("مرحباً، أريد حجز كشف مجاني")}`} className="w-full sm:w-auto">
                  احجز كشفاً مجانياً <ArrowLeft className="size-4" />
                </ActionLink>
                <span className="text-center text-[10px] text-hero-muted opacity-80 sm:text-right">بدون التزام مالي - كشف الموقع مجاني بالكامل</span>
              </div>
              <ActionLink href="#packages" variant="outline" className="w-full sm:w-auto">
                عرض الباقات
              </ActionLink>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-hero-muted sm:text-sm">
              <span className="flex items-center gap-2"><Check className="size-4 text-action" /> كشف ميداني مجاني</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-action" /> تركيب احترافي ونظيف</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-action" /> كفالة موثقة</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="مزايا الخدمة" className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
          {[
            { icon: ShieldCheck, title: "كفالة حقيقية سنتين", text: "راحة بال مضمونة" },
            { icon: BadgeCheck, title: "فنيون معتمدون", text: "تركيب بمعايير احترافية" },
            { icon: MoonStar, title: "تصوير ملون ليلاً", text: "تفاصيل واضحة 24/7" },
            { icon: Headphones, title: "دعم فني سريع", text: "نحن معك بعد التركيب" },
          ].map(({ icon: Icon, title, text }, index) => (
            <div key={title} className={`flex items-center gap-3 py-6 sm:gap-4 lg:px-6 ${index % 2 === 0 ? "border-l border-border" : ""} ${index > 1 ? "border-t border-border lg:border-t-0" : ""}`}>
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent text-primary sm:size-12">
                <Icon className="size-5 sm:size-6" />
              </span>
              <span className="min-w-0">
                <strong className="block text-sm sm:text-base">{title}</strong>
                <span className="mt-1 hidden text-xs text-muted-foreground sm:block">{text}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="العلامات التجارية المعتمدة" className="border-b border-border bg-background py-10 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-12">
          <p className="text-sm font-semibold text-muted-foreground mb-6">نعتمد أفضل العلامات التجارية العالمية لضمان الجودة العالية</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70 grayscale sm:gap-16">
            <span className="font-display text-2xl font-black text-foreground">HIKVISION</span>
            <span className="font-display text-2xl font-black text-foreground">alhua</span>
            <span className="font-display text-xl font-bold text-foreground">Western Digital</span>
            <span className="font-display text-2xl font-black text-foreground">EZVIZ</span>
            <span className="font-display text-2xl font-black text-foreground">ZKTeco</span>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 border-b border-border bg-surface px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="section-kicker">من نحن</span>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">خبرة تمتد لسنوات في السوق الأردني</h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">نحن في <strong>Ababneh Security</strong> نؤمن بأن الأمان ليس مجرد كاميرات تُعلق على الحائط، بل هو منظومة متكاملة تبدأ من دراسة الموقع بعناية، اختيار المعدات الأصلية، وانتهاءً بتركيب احترافي لا يشوه ديكور المكان.</p>
            <ul className="mt-8 space-y-4 font-semibold">
              <li className="flex items-center gap-3"><Check className="size-5 text-action" /> فريق هندسي وفني متخصص.</li>
              <li className="flex items-center gap-3"><Check className="size-5 text-action" /> سرعة في الاستجابة وخدمة ما بعد البيع.</li>
              <li className="flex items-center gap-3"><Check className="size-5 text-action" /> مشاريع منجزة في كافة محافظات المملكة.</li>
            </ul>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border shadow-2xl sm:aspect-[4/3] lg:aspect-square">
            <img src={heroImage} alt="فني تركيب كاميرات" className="h-full w-full object-cover grayscale transition-all duration-1000 hover:grayscale-0 hover:scale-105" />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply pointer-events-none" />
            <div className="absolute bottom-6 right-6 rounded-lg bg-background/90 p-4 shadow-xl backdrop-blur-md">
              <div className="font-display text-3xl font-black text-action">+500</div>
              <div className="text-sm font-bold text-foreground">مشروع منجز بنجاح</div>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="باقات جاهزة" title="حماية موثوقة، بسعر واضح" text="اختر الدقة التي تناسبك. جميع الباقات تشمل الأجهزة الأصلية والتركيب والبرمجة الكاملة." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {packages.map((item) => (
              <article key={item.name} className={`relative overflow-hidden rounded-lg border p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${item.featured ? "border-primary bg-primary text-primary-foreground shadow-premium" : "border-border bg-card text-card-foreground shadow-card"}`}>
                {item.featured && <div className="absolute left-0 top-0 rounded-br-lg bg-action px-4 py-2 text-xs font-black text-action-foreground">الأكثر طلباً</div>}
                <span className={`text-sm font-bold ${item.featured ? "text-primary-soft" : "text-primary"}`}>{item.label}</span>
                <h3 className="mt-3 font-display text-2xl font-black sm:text-3xl">{item.name}</h3>
                <div className="mt-7 flex items-end gap-2">
                  <strong className={`font-display text-6xl font-black ${item.featured ? "text-action" : "text-primary"}`}>{item.price}</strong>
                  <span className={`pb-2 text-sm ${item.featured ? "text-primary-soft" : "text-muted-foreground"}`}>د.أ / شامل التركيب</span>
                </div>
                <ul className={`my-8 space-y-4 border-y py-7 ${item.featured ? "border-primary-border" : "border-border"}`}>
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm sm:text-base">
                      <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${item.featured ? "bg-action text-action-foreground" : "bg-accent text-primary"}`}><Check className="size-3" strokeWidth={3} /></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <ActionLink href={`${whatsappBase}${encodeURIComponent(`مرحباً، أريد طلب ${item.name} بسعر ${item.price} د.أ`)}`} variant={item.featured ? "primary" : "outline"} className="w-full">
                  <Check className="size-5" /> اختيار هذه الباقة
                </ActionLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="custom" className="scroll-mt-20 bg-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="section-kicker">حل مصمم لك</span>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">كوّن نظام الحماية المناسب لاحتياجك</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">حدّد خياراتك وسنحسب لك سعراً تقديرياً فورياً، ثم يراجع الفني الموقع ويؤكد العرض النهائي مجاناً.</p>
            <div className="mt-8 flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"><Users className="size-6" /></span>
              <div><strong className="block">استشارة مجانية من خبير</strong><span className="text-sm text-muted-foreground">نساعدك في اختيار الزوايا والتغطية المناسبة</span></div>
            </div>
          </div>

          <div className="rounded-lg border border-panel-border bg-panel p-5 shadow-premium backdrop-blur-xl sm:p-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border pb-6">
              <div className="min-w-0"><h3 className="truncate font-display text-xl font-black sm:text-2xl">حاسبة النظام</h3><p className="mt-1 text-sm text-muted-foreground">السعر يتغير مباشرة حسب اختياراتك</p></div>
              <Sparkles className="size-6 shrink-0 text-primary" />
            </div>
            <div className="mt-7 space-y-8">
              <div>
                <div className="mb-4 flex items-center justify-between"><label htmlFor="camera-count" className="font-bold">عدد الكاميرات</label><output htmlFor="camera-count" className="grid min-w-12 place-items-center rounded-md bg-primary px-3 py-1.5 font-display text-lg font-black text-primary-foreground">{cameras}</output></div>
                <input id="camera-count" aria-label="عدد الكاميرات" type="range" min="1" max="16" value={cameras} onChange={(event) => setCameras(Number(event.target.value))} className="w-full accent-primary" />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>1 كاميرا</span><span className="font-semibold text-action transition-all duration-300">{cameraHint}</span><span>16 كاميرا</span></div>
              </div>
              <div>
                <label htmlFor="resolution" className="mb-3 block font-bold">دقة الكاميرا</label>
                <div className="relative">
                  <select id="resolution" value={resolution} onChange={(event) => setResolution(event.target.value)} className="h-13 w-full appearance-none rounded-md border border-input bg-background px-4 pl-10 font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20">
                    <option>2MP ColorVu</option><option>5MP ColorVu</option><option>IP 4K</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <p className="mt-2 text-[11px] font-semibold text-action transition-all duration-300">{resolutionHint}</p>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-md border border-border bg-background p-4">
                <div className="min-w-0"><label htmlFor="alarm" className="block font-bold">نظام إنذار ذكي</label><span className="text-sm text-muted-foreground">Hikvision AX PRO لاسلكي</span></div>
                <button id="alarm" type="button" role="switch" aria-checked={alarm} onClick={() => setAlarm((value) => !value)} className={`relative h-7 w-13 shrink-0 rounded-full transition-all duration-300 ${alarm ? "bg-action shadow-[0_0_12px_rgba(var(--action),0.6)]" : "bg-muted-foreground/35"}`} aria-label="إضافة نظام إنذار ذكي">
                  <span className={`absolute top-1 size-5 rounded-full bg-background shadow-sm transition-all ${alarm ? "right-7" : "right-1"}`} />
                </button>
              </div>
            </div>
            <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div><span className="text-xs text-muted-foreground">السعر التقديري يبدأ من</span><div className="font-display text-3xl font-black text-primary">{estimate} <span className="text-base">د.أ</span></div><p className="mt-1 max-w-[200px] text-[10px] text-muted-foreground/80 leading-tight">*يشمل الأجهزة، التركيب، هارد ديسك، وكفالة حقيقية.</p></div>
              <ActionLink href={`${whatsappBase}${quoteMessage}`}>احصل على السعر فوراً <ArrowLeft className="size-4" /></ActionLink>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="خدماتنا" title="منظومة أمان واحدة، لكل تفاصيل يومك" text="حلول مترابطة للمنزل والعمل، ننفذها بعناية ونبقى قريبين منك بعد التركيب." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, text }) => (
              <article key={title} className="group bg-card p-7 transition-colors hover:bg-accent sm:p-8">
                <span className="grid size-13 place-items-center rounded-md bg-primary text-primary-foreground transition-transform duration-300 group-hover:-translate-y-1"><Icon className="size-6" /></span>
                <h3 className="mt-6 font-display text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
                <a href={`${whatsappBase}${encodeURIComponent(`مرحباً، أريد الاستفسار عن ${title}`)}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">استفسر الآن <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="قطاعات نخدمها" title="حماية مصممة خصيصاً لكل بيئة" text="سواء كنت تبحث عن تأمين منزلك وعائلتك، أو حماية بضائعك وموظفيك، لدينا الحل الأمثل." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "الفلل والمنازل", desc: "أنظمة أنيقة ومخفية تحافظ على جمال الديكور وتوفر حماية محيطية كاملة.", icon: Home },
              { title: "المحلات والصيدليات", desc: "كاميرات قراءة العملات وتغطية الكاشير مع تسجيل صوتي عالي النقاء.", icon: Building2 },
              { title: "المكاتب والشركات", desc: "تحكم بدخول الموظفين بالبصمة وأنظمة مراقبة قابلة للربط بالإدارة.", icon: Users },
              { title: "المستودعات والمصانع", desc: "كاميرات ليلية بمدى طويل وأنظمة إنذار لاسلكية لتغطية المساحات الشاسعة.", icon: Zap },
            ].map((sector) => (
              <div key={sector.title} className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <sector.icon className="size-8 text-primary" />
                <h3 className="mt-4 font-display text-lg font-bold">{sector.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="الأسئلة الشائعة" title="كل ما تحتاج معرفته قبل التركيب" text="إجابات شفافة على أكثر الأسئلة التي تهمك." />
          <div className="mt-12 space-y-4">
            {[
              { q: "هل السعر يشمل التركيب والأسلاك؟", a: "نعم، جميع الباقات لدينا تشمل التركيب الاحترافي، البرمجة، والتمديدات القياسية اللازمة." },
              { q: "كم مدة الكفالة؟ وماذا تغطي؟", a: "نوفر كفالة حقيقية لمدة عامين (24 شهراً) على الكاميرات وأجهزة التسجيل ضد العيوب المصنعية مع استبدال فوري." },
              { q: "هل يمكنني مشاهدة الكاميرات من هاتفي؟", a: "بالتأكيد! نقوم بربط النظام بالإنترنت وبرمجته على هواتف جميع أفراد العائلة لتتمكن من المراقبة من أي مكان في العالم." },
              { q: "كم يوماً يسجل الهارد ديسك؟", a: "نستخدم أقراص تخزين مخصصة للمراقبة (مثل WD Purple). قرص 1 تيرابايت يكفي لتسجيل 15 إلى 30 يوماً حسب الحركة، ويمكن زيادة السعة حسب الطلب." },
            ].map((faq, i) => (
              <details key={i} className="group rounded-lg border border-border bg-surface [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between p-5 font-bold text-foreground outline-none">
                  {faq.q}
                  <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-border p-5 text-sm leading-7 text-muted-foreground">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-16 text-primary-foreground sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div><span className="text-sm font-bold text-action">أمانك يبدأ بخطوة</span><h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">دعنا نعاين موقعك ونقترح الحل الأفضل</h2><p className="mt-3 text-primary-soft">معاينة مجانية، عرض واضح، وتركيب احترافي دون أي التزام.</p></div>
          <ActionLink href={`${whatsappBase}${encodeURIComponent("مرحباً، أريد حجز معاينة مجانية للموقع")}`}>احجز معاينة مجانية <ArrowLeft className="size-4" /></ActionLink>
        </div>
      </section>

      <footer id="contact" className="bg-footer px-5 pb-8 pt-16 text-footer-foreground sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-footer-border pb-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div><Brand light /><p className="mt-5 max-w-sm text-sm leading-7 text-footer-muted">نحمي المنازل والأعمال بحلول مراقبة وإنذار ذكية، وتركيب نهتم فيه بأدق التفاصيل.</p></div>
          <div><h3 className="font-bold">تواصل معنا</h3><div className="mt-5 space-y-4 text-sm text-footer-muted"><a className="flex items-center gap-3 hover:text-footer-foreground" href={whatsappBase}><MessageCircle className="size-4 text-action" /> تواصل معنا عبر واتساب</a><p className="flex items-center gap-3"><Phone className="size-4 text-action" /> <span dir="ltr">+962 7 8875 7801</span></p><p className="flex items-center gap-3"><Users className="size-4 text-action" /> بإدارة: علي عبابنة</p><p className="flex items-center gap-3"><MapPin className="size-4 text-action" /> عمّان، الأردن</p></div></div>
          <div><h3 className="font-bold">ساعات العمل</h3><div className="mt-5 flex items-start gap-3 text-sm text-footer-muted"><Clock3 className="mt-0.5 size-4 text-action" /><p>السبت – الخميس<br /><span className="mt-1 block text-footer-foreground">9:00 صباحاً – 7:00 مساءً</span></p></div><div className="mt-6 flex gap-2"><a href="#" aria-label="فيسبوك" className="grid size-9 place-items-center rounded-md border border-footer-border hover:border-action hover:text-action"><Facebook className="size-4" /></a><a href="#" aria-label="إنستغرام" className="grid size-9 place-items-center rounded-md border border-footer-border hover:border-action hover:text-action"><Instagram className="size-4" /></a></div></div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-7 text-xs text-footer-muted sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Ababneh Security. جميع الحقوق محفوظة.</p><p className="flex items-center gap-2"><LockKeyhole className="size-3" /> خصوصيتك وأمانك أولويتنا</p></div>
      </footer>

      <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
        <a href={`${whatsappBase}${encodeURIComponent("مرحباً، أريد الاستفسار عن أنظمة الحماية")}`} aria-label="تواصل عبر واتساب" className="group flex h-14 items-center gap-3 overflow-hidden rounded-full border border-border/40 bg-background/60 pl-2 pr-6 text-foreground shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:bg-background/80 hover:shadow-emerald-500/20 sm:h-16">
          <div className="relative grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-lg sm:size-12">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-40 duration-1000" />
            <MessageCircle className="relative size-5 transition-transform group-hover:rotate-12 group-hover:scale-110 sm:size-6" fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-muted-foreground">تحتاج استشارة؟</span>
            <span className="text-sm font-bold tracking-wide">تحدث مع خبير</span>
          </div>
        </a>
      </div>
    </main>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="section-kicker">{eyebrow}</span>
      <h2 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-muted-foreground">{text}</p>
    </div>
  );
}