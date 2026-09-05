import { createFileRoute, Link } from "@tanstack/react-router";
import { AlarmClock, ArrowLeft, BadgeCheck, Building2, Camera, Check, ChevronDown, Clock3, Facebook, Fingerprint, Headphones, Home, Instagram, KeyRound, LockKeyhole, MapPin, Menu, MessageCircle, MoonStar, Phone, Settings, ShieldAlert, ShieldCheck, Sparkles, Users, Volume2, VolumeX, X, Zap, Download, ScanSearch } from "lucide-react";
import { useMemo, useState, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroMan from "../assets/hero-man.jpg";
import cameraCloseup from "../assets/camera-closeup.jpg";
import camerasCluster from "../assets/cameras-cluster.jpg";

export const Route = createFileRoute("/contact")({
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
  component: Contact,
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
    price: 165,
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
    price: 199,
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
    primary: "bg-gradient-to-r from-primary via-action to-primary animate-chroma text-white shadow-premium hover:shadow-[0_0_20px_rgba(var(--action),0.4)] border border-white/20 backdrop-blur-md",
    outline: "border border-hero-border bg-hero-glass text-hero-foreground backdrop-blur-md hover:bg-hero-glass-hover",
    whatsapp: "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-hover",
  };
  return (
    <a
      href={href}
      className={`group relative overflow-hidden inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${styles[variant]} ${className}`}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      )}
      <span className="relative flex items-center gap-2">{children}</span>
    </a>
  );
}

function LogoMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left half - slides in */}
      <path d="M50 0 A50 50 0 0 0 50 100 Z" fill="currentColor" className="animate-slide-left origin-center" />
      {/* Top right arc - radar scan effect */}
      <path d="M50 0 A50 50 0 0 1 100 50 L75 50 A25 25 0 0 0 50 25 Z" fill="currentColor" className="animate-radar origin-center" />
      {/* Bottom right dot - pulses like a recording indicator */}
      <circle cx="75" cy="75" r="14" fill="currentColor" className="animate-pulse origin-center" />
    </svg>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`group flex items-center gap-3 ${light ? "text-hero-foreground" : "text-foreground"}`} aria-label="العودة إلى أعلى الصفحة">
      <span className="grid size-11 shrink-0 place-items-center rounded-md bg-transparent text-action transition-transform hover:scale-110">
        <LogoMark className="size-9" />
      </span>
      <span className="min-w-0 leading-tight">
        <strong className="flex items-center gap-2 truncate font-display text-lg group-hover:animate-glitch">
          Ababneh Security
          <span className="relative flex size-2" title="System Online">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-red-600" />
          </span>
        </strong>
        {/* Contextual hover hint */}
        <span className="relative block h-4 overflow-hidden">
          <span className={`absolute inset-0 block text-[11px] transition-transform duration-300 group-hover:-translate-y-full ${light ? "text-hero-muted" : "text-muted-foreground"}`}>أنظمة حماية متكاملة</span>
          <span className="absolute inset-0 top-full block text-[11px] font-bold text-action transition-transform duration-300 group-hover:-translate-y-full">■ SECURE CONNECTION</span>
        </span>
      </span>
    </a>
  );
}

function CCTVTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("");
  
  
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toISOString().replace("T", " ").substring(0, 19));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`pointer-events-none flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-widest text-white/70 drop-shadow-md ${className}`}>
      <span className="flex items-center gap-1.5 text-red-500">
        <span className="size-2 rounded-full bg-red-500 animate-pulse" />
        REC
      </span>
      {time}
    </div>
  );
}

function SlideToUnlock({ onUnlock, text }: { onUnlock: () => void, text: string }) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState(0); // 0 to 100
  const trackRef = useRef<HTMLDivElement>(null);
  const startAllowed = useRef(false);

  const handleMove = (clientX: number) => {
    if (unlocked || !trackRef.current || !startAllowed.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const thumbW = 48; // 56px (h-14) - 8px (p-1 * 2)
    const trackW = rect.width - thumbW - 8;
    // RTL logic: distance from the RIGHT edge
    const x = Math.max(0, Math.min(rect.right - clientX - thumbW / 2, trackW));
    const val = Math.round((x / trackW) * 100);
    
    setValue(val);
    if (val >= 95) {
      setUnlocked(true);
      navigator.vibrate?.([100, 50, 100]);
      setValue(100);
      setTimeout(() => {
        onUnlock();
      }, 800);
    }
  };

  const onStart = (clientX: number) => {
    if (unlocked || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    // Only allow drag if starting on the RIGHT half of the slider (RTL)
    if (rect.right - clientX < rect.width / 2) {
      startAllowed.current = true;
      handleMove(clientX);
    }
  };

  const onEnd = () => {
    startAllowed.current = false;
    if (!unlocked) setValue(0);
  };

  return (
    <div
      ref={trackRef}
      dir="rtl"
      className="relative h-14 w-full select-none overflow-hidden rounded-full border border-action/30 bg-card p-1 shadow-inner cursor-pointer touch-none"
      onTouchStart={(e) => onStart(e.touches[0]?.clientX || 0)}
      onTouchMove={(e) => handleMove(e.touches[0]?.clientX || 0)}
      onTouchEnd={onEnd}
      onTouchCancel={onEnd}
      onMouseDown={(e) => onStart(e.clientX)}
      onMouseMove={(e) => {
        if (e.buttons === 1) handleMove(e.clientX);
      }}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-bold text-muted-foreground">
        {unlocked ? "✓ تم تأكيد الاتصال" : text}
      </div>
      <div
        className="pointer-events-none absolute top-1 bottom-1 aspect-square rounded-full bg-action grid place-items-center text-action-foreground shadow-md"
        style={{
          right: `calc(4px + ${value}% * (100% - 56px) / 100)`,
          transition: unlocked ? "none" : value === 0 ? "right 0.3s ease" : "none",
        }}
      >
        {unlocked ? <Check className="size-5" /> : <LockKeyhole className="size-5" />}
      </div>
    </div>
  );
}

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500); // Wait for fade out
        }, 300);
      }
      setProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible && progress === 100) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
       <div className="absolute inset-0 bg-hero-overlay opacity-50" />
       <div className="pointer-events-none fixed inset-0 z-10 mix-blend-overlay opacity-10 animate-noise bg-[url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
       <div className="relative z-20 flex flex-col items-center">
         <LogoMark className="mb-8 size-16 text-action animate-pulse" />
         <div className="font-mono text-5xl font-black tracking-tighter text-action">{progress}%</div>
         <div className="mt-4 text-xs font-bold tracking-widest text-muted-foreground uppercase animate-pulse">Initializing System...</div>
         <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-border">
           <div className="h-full bg-action transition-all duration-100" style={{ width: `${progress}%` }} />
         </div>
       </div>
    </div>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [ripple, setRipple] = useState<{x:number, y:number, id:number}[]>([]);
  const addRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple([...ripple, { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() }]);
  };

    // Check Peak Time (Outside 9 AM - 7 PM)
    useEffect(() => {
      const hour = new Date().getHours();
      if (hour < 9 || hour >= 19) {
        setPeakTimeNudge("نحن خارج أوقات الدوام، لكن اترك رسالتك وسنرد فوراً في الصباح!");
      }
    }, []);

    // Smart PWA Prompt based on visits
    useEffect(() => {
      const visits = parseInt(localStorage.getItem("visitCount") || "0");
      if (visits > 0) {
        setPwaHint(true);
      }
      localStorage.setItem("visitCount", (visits + 1).toString());
    }, []);
  const [appReady, setAppReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cameras, setCameras] = useState(4);
  const [resolution, setResolution] = useState("2MP ColorVu");
  const [alarm, setAlarm] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [pwaToast, setPwaToast] = useState(false);

  // 10 Ideas: Interaction States
  const [threats, setThreats] = useState(24051);
  const [glitch, setGlitch] = useState(false);
  const [fabVisible, setFabVisible] = useState(true);
  const [peakTimeNudge, setPeakTimeNudge] = useState("");
  const [faqHint, setFaqHint] = useState("");
  const [pwaHint, setPwaHint] = useState(false);
  const faqTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [fabText, setFabText] = useState("تحدث مع خبير");
  const [fingerprint, setFingerprint] = useState(false);
  const [scarcityHint, setScarcityHint] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const triggerGlitch = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 200);
  };

  useEffect(() => {
    const i = setInterval(() => setThreats(p => p + Math.floor(Math.random() * 3)), 3500);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 3500) setFabText("طلب معاينة مجانية");
      else if (y > 1500) setFabText("احسب تكلفة نظامك");
      else setFabText("تحدث مع خبير");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setScarcityHint(true), 15000);
    return () => clearTimeout(t);
  }, []);

  // Refs for video elements — needed to fix iOS muted state bug
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Fix: React does NOT update the `muted` DOM attribute after initial render on iOS.
  // We must use a ref to set it directly, then call .play() to prevent freezing.
  useEffect(() => {
    [desktopVideoRef, mobileVideoRef].forEach((ref) => {
      if (ref.current) {
        ref.current.muted = isMuted;
        // Re-trigger play to prevent iOS freeze after unmute
        ref.current.play().catch(() => {});
      }
    });
  }, [isMuted]);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setPwaToast(true);
      setTimeout(() => setPwaToast(false), 4000);
    }
  };

  const estimate = useMemo(() => {
    let base = 60; // التكلفة الأساسية (جهاز التسجيل، التركيب الأساسي، هارد ديسك)
    let unit = 35; // تكلفة الكاميرا الواحدة مع هامش ربح وتمديداتها
    if (resolution === "5MP ColorVu") {
      base = 64;
      unit = 45;
    } else if (resolution === "IP 4K") {
      base = 150; // أجهزة شبكية NVR متقدمة
      unit = 80;
    }
    return base + (cameras * unit) + (alarm ? 185 : 0);
  }, [alarm, cameras, resolution]);

  const cameraHint = cameras <= 4 ? "مثالي للشقق والمكاتب الصغيرة" : cameras <= 8 ? "ممتاز للفلل والمحلات التجارية" : "مصمم للمستودعات والشركات الكبيرة";
  const resolutionHint = resolution === "2MP ColorVu" ? "وضوح ممتاز للمراقبة العامة" : resolution === "5MP ColorVu" ? "دقة عالية للوجوه ولوحات السيارات" : "أقصى دقة للمنشآت الحساسة";

  const quoteMessage = encodeURIComponent(
    `مرحباً، أريد عرض سعر لنظام مكوّن من ${cameras} كاميرات بدقة ${resolution}${alarm ? " مع نظام إنذار AX PRO" : ""}. السعر التقديري ${estimate} د.أ.`,
  );

  return (
    <>
      {!appReady && <Preloader onComplete={() => setAppReady(true)} />}
      {/* PWA Install Guide Modal */}
      {pwaToast && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 p-5 backdrop-blur-sm" onClick={() => setPwaToast(false)}>
          <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl" onClick={e => e.stopPropagation()} dir="rtl">
            <button onClick={() => setPwaToast(false)} className="absolute left-4 top-4 text-muted-foreground hover:text-foreground">
              <X className="size-5" />
            </button>
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-4 grid size-16 place-items-center rounded-2xl bg-action/10 text-action">
                <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-black">كيفية تثبيت التطبيق</h3>
              <p className="mt-2 text-sm text-muted-foreground">ثبّت التطبيق للوصول السريع لخدماتنا بنقرة واحدة من شاشتك الرئيسية.</p>
            </div>
            
            <div className="space-y-3 text-sm font-semibold">
              <div className="flex items-center gap-4 rounded-lg bg-surface p-3 border border-border">
                <div className="grid size-7 shrink-0 place-items-center rounded-full bg-background text-foreground shadow-sm">1</div>
                <p>انقر على أيقونة <strong className="text-action text-base leading-none px-1">⍐</strong> أو <strong className="text-action text-lg leading-none px-1">⋮</strong> في متصفحك.</p>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-surface p-3 border border-border">
                <div className="grid size-7 shrink-0 place-items-center rounded-full bg-background text-foreground shadow-sm">2</div>
                <p>اختر <strong>"إضافة إلى الشاشة الرئيسية"</strong><br/><span className="text-xs text-muted-foreground font-normal">(Add to Home Screen)</span></p>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-surface p-3 border border-border">
                <div className="grid size-7 shrink-0 place-items-center rounded-full bg-background text-foreground shadow-sm">3</div>
                <p>أكّد العملية بالضغط على <strong>"إضافة"</strong>.</p>
              </div>
            </div>
            
            <button onClick={() => setPwaToast(false)} className="mt-8 w-full rounded-lg bg-action py-3 font-bold text-action-foreground transition-all hover:bg-action/90 shadow-premium">
              حسناً، فهمت
            </button>
          </div>
        </div>
      )}
      <main id="top" dir="rtl" className={`relative bg-background text-foreground ${!appReady ? "h-screen overflow-hidden" : "overflow-x-hidden"} ${glitch ? "animate-glitch brightness-150 contrast-125 saturate-0" : ""}`} onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}>
        
        {/* Full screen static glitch overlay */}
        {glitch && (
          <div className="pointer-events-none fixed inset-0 z-[9999] opacity-20 mix-blend-difference bg-[url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>
        )}

        <header className="fixed left-0 right-0 top-0 z-50 border-b border-hero-border bg-hero-glass/95 backdrop-blur-md shadow-sm">
          <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3 text-hero-foreground">
              <LogoMark className="size-8 sm:size-10 text-action" />
              <div className="group relative">
                <div className="absolute inset-0 bg-action/20 blur-md transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
                <h1 className="font-display text-xl sm:text-2xl font-black tracking-tight leading-none">Ababneh <span className="text-action">Security</span></h1>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-hero-muted group-hover:hidden">Commercial Scale</p>
                <p className="hidden text-[10px] font-bold uppercase tracking-[0.1em] text-action group-hover:block transition-all duration-300">■ SECURE CONNECTION</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-sm font-bold text-hero-muted lg:flex">
              <Link className="transition-colors hover:text-hero-foreground" to="/" onClick={triggerGlitch}>الرئيسية</Link>
              <a className="transition-colors hover:text-hero-foreground" href="/#packages" onClick={triggerGlitch}>باقات الحماية</a>
              <a className="transition-colors hover:text-hero-foreground" href="/#custom" onClick={triggerGlitch}>احسب تكلفتك</a>
              <Link className="transition-colors hover:text-hero-foreground" to="/contact" onClick={triggerGlitch}>الدعم</Link>
            </nav>
            <div className="flex items-center gap-4 sm:gap-6">
              
              
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="grid size-10 sm:size-11 place-items-center rounded-md border border-hero-border bg-hero-glass text-hero-foreground lg:hidden"
                aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
          {/* Mobile Nav */}
          {menuOpen && (
            <nav className="absolute left-0 top-full w-full border-b border-hero-border bg-hero-glass px-5 py-3 backdrop-blur-xl lg:hidden">
              {[["من نحن","#about"],["الباقات","#packages"],["كوّن نظامك","#custom"],["خدماتنا","#services"],["تواصل معنا","#contact"]].map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-3 text-sm font-semibold text-hero-muted hover:bg-hero-glass-hover hover:text-hero-foreground">{label}</a>
              ))}
            </nav>
          )}
        </header>
      <div className="pt-24 lg:pt-32 bg-background"></div>

          {/* Support Hero */}
          <section className="bg-surface px-5 pt-32 pb-16 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="font-display text-4xl font-black text-foreground sm:text-5xl">مركز <span className="text-action">الدعم</span></h1>
              <p className="mt-4 text-muted-foreground">نحن هنا لخدمتك والإجابة على كافة استفساراتك، قبل وبعد التركيب.</p>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                 <div className="relative"><button onClick={handleInstallClick} className="flex items-center gap-2 rounded-full bg-action px-6 py-3 text-sm font-bold text-action-foreground transition-all hover:bg-action-hover hover:scale-105 shadow-lg shadow-action/20 mx-auto">
                    <Download className="size-4" />
                    تثبيت التطبيق السريع (PWA)
                 </button>
                 {pwaHint && (
                   <div className="absolute -top-10 left-1/2 w-max -translate-x-1/2 rounded-full bg-foreground text-background px-3 py-1 text-[10px] font-bold animate-bounce z-20 shadow-xl after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-foreground">
                     تزورنا كثيراً؟ ثبت التطبيق للوصول بضغطة واحدة!
                   </div>
                 )}
                 </div>
              </div>
            </div>
          </section>

          {/* Contact Grid */}
          <section className="bg-background px-5 py-16 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
               <div className="flex flex-col items-center text-center gap-3 p-8 rounded-2xl border border-border bg-surface transition-transform hover:-translate-y-1 hover:shadow-xl">
                  <Phone className="size-8 text-action" />
                  <h3 className="font-bold">الاتصال المباشر</h3>
                  <a href="tel:0788757801" className="text-lg font-black tracking-widest text-foreground hover:text-action" dir="ltr">078 875 7801</a>
                  <p className="text-xs text-muted-foreground">بإدارة: علي عبابنة</p>
               </div>
               
               <div className="flex flex-col items-center text-center gap-3 p-8 rounded-2xl border border-border bg-surface transition-transform hover:-translate-y-1 hover:shadow-xl">
                  <MessageCircle className="size-8 text-emerald-500" />
                  <h3 className="font-bold">واتساب</h3>
                  <a href={whatsappBase} className="text-sm font-bold text-foreground hover:text-emerald-500">تواصل معنا الآن</a>
                  <p className="text-xs text-muted-foreground">استجابة سريعة لطلبات الصيانة</p>
               </div>

               <div className="flex flex-col items-center text-center gap-3 p-8 rounded-2xl border border-border bg-surface transition-transform hover:-translate-y-1 hover:shadow-xl">
                  <Clock3 className="size-8 text-action" />
                  <h3 className="font-bold">ساعات العمل</h3>
                  <p className="text-sm font-bold text-foreground">السبت – الخميس</p>
                  <p className="text-xs text-muted-foreground">9:00 صباحاً – 7:00 مساءً</p>
               </div>

               <div className="flex flex-col items-center text-center gap-3 p-8 rounded-2xl border border-border bg-surface transition-transform hover:-translate-y-1 hover:shadow-xl">
                  <MapPin className="size-8 text-action" />
                  <h3 className="font-bold">موقعنا</h3>
                  <p className="text-sm font-bold text-foreground">إربد - بشرى</p>
                  <p className="text-xs text-muted-foreground">بالقرب من إشارة بردى</p>
               </div>
            </div>
          </section>

          {/* Map Section */}
            <section className="bg-background px-5 pb-16 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-7xl h-[400px] w-full overflow-hidden rounded-3xl border border-border bg-surface relative group shadow-2xl">
                 <iframe 
                   src="https://maps.google.com/maps?q=32.546595,35.886633&z=15&output=embed" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }} 
                   className="transition-all duration-700 group-hover:filter-none"
                   allowFullScreen 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                 ></iframe>
                 
                 {/* Overlay hint that fades out on hover */}
                 <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm transition-all duration-700 group-hover:backdrop-blur-none group-hover:bg-transparent pointer-events-none">
                    <div className="flex flex-col items-center gap-2 bg-background/90 p-4 rounded-xl border border-border shadow-xl backdrop-blur-md transition-opacity duration-300 group-hover:opacity-0">
                       <motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", bounce: 0.7, duration: 1 }}><MapPin className="size-8 text-action" /></motion.div>
                       <span className="font-bold">موقعنا على الخريطة</span>
                    </div>
                 </div>
              </div>
            </section>
<section id="faq" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="الأسئلة الشائعة" title="كل ما تحتاج معرفته قبل التركيب" text="إجابات شفافة على أكثر الأسئلة التي تهمك بناءً على مواصفات الأجهزة الحقيقية." />
          <div className="mt-12 space-y-4">
            {[
              { q: "هل السعر المعروض نهائي ويشمل الضريبة؟", a: "نعم، السعر الظاهر هو السعر النهائي الشامل للضريبة ولجميع رسوم التركيب الأساسية. لا توجد أي تكاليف مخفية مفاجئة." },
              { q: "هل الكاميرات تسجل صوتاً أم صورة فقط؟", a: "معظم كاميرات Hikvision ColorVu و EZVIZ التي نعتمدها (بالأخص الموديلات التي تنتهي بحرف U أو S) تحتوي على مايكروفون مدمج (Built-in Mic) عالي النقاء لتسجيل الصوت والصورة معاً عبر نفس الكيبل بفضل تقنية (AoC)." },
              { q: "هل أحتاج إلى إنترنت منزلي لكي يعمل النظام؟", a: "النظام يسجل بشكل محلي على القرص الصلب (Hard Disk) ويعمل 100% بدون إنترنت. لكنك ستحتاج إلى إنترنت فقط إذا أردت مراقبة الكاميرات من خارج المنزل عبر هاتفك المحمول (تطبيق Hik-Connect)." },
              { q: "ماذا يحدث للكاميرات إذا انقطعت الكهرباء؟", a: "كاميرات المراقبة تحتاج إلى مصدر طاقة. عند انقطاع الكهرباء ستتوقف عن العمل والتسجيل. إذا كان انقطاع الكهرباء متكرراً في منطقتك، ننصحك بإضافة جهاز (UPS) لضمان استمرار تشغيل النظام لعدة ساعات." },
              { q: "كم متراً من الأسلاك يشمل التركيب المجاني؟", a: "يشمل التركيب المجاني تمديدات تصل إلى 15-20 متراً لكل كاميرا كحد أقصى (تغطي 90% من المنازل والمحلات). الأمتار الإضافية يتم احتسابها بسعر التكلفة وبشفافية تامة قبل بدء العمل." },
              { q: "كم مدة الكفالة؟ وماذا تغطي؟", a: "نوفر كفالة حقيقية لمدة عامين (24 شهراً) على الكاميرات وأجهزة التسجيل ضد العيوب المصنعية مع استبدال فوري. الكفالة لا تشمل التلف الناتج عن سوء الاستخدام، العبث، الكسر، أو الحوادث الناتجة عن تماس كهربائي خارجي." }
            ].map((faq, i) => (
              <motion.details key={i} layout transition={{ type: "spring", stiffness: 300, damping: 30 }} className="group rounded-lg border border-border bg-surface [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between p-5 font-bold text-foreground outline-none">
                  {faq.q}
                  <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-border p-5 text-sm leading-7 text-muted-foreground">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      
      
      <footer className="bg-background px-5 pb-28 pt-8 sm:px-8 lg:px-12 sm:pb-8 border-t border-border/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row text-xs text-muted-foreground">
          
          <div className="order-2 sm:order-1">
             <p>© 2026 Ababneh Security. جميع الحقوق محفوظة.</p>
          </div>
          
          <div className="order-1 sm:order-2 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 scale-90">
            <Brand />
          </div>

          <div className="flex items-center gap-5 order-3">
            <a href="#" aria-label="فيسبوك" className="hover:text-action transition-colors"><Facebook className="size-4" /></a>
            <a href="#" aria-label="إنستغرام" className="hover:text-action transition-colors"><Instagram className="size-4" /></a>
          </div>

        </div>
      </footer>

            {fabVisible && (
        <div className="fixed bottom-24 right-5 z-50 sm:bottom-7 sm:right-7 flex flex-col gap-3 items-end animate-in fade-in slide-in-from-bottom-5">
          <button onClick={() => setFabVisible(false)} aria-label="Dismiss" className="grid size-6 place-items-center rounded-full bg-background/80 border border-border text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-background hover:text-foreground">
            <X className="size-3" />
          </button>
        {/* Direct Call Button */}
        <a href="tel:0788757801" onClick={() => navigator.vibrate?.([50])} aria-label="اتصال هاتفي" className="group flex h-12 items-center gap-3 overflow-hidden rounded-full border border-border/40 bg-surface/80 pl-2 pr-4 text-foreground shadow-lg backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-action/40 hover:bg-surface hover:shadow-action/10">
          <div className="relative grid size-8 shrink-0 place-items-center rounded-full bg-background border border-border/50 text-foreground shadow-sm">
            <Phone className="relative size-4 transition-transform group-hover:rotate-12 text-action" />
          </div>
          <span className="text-xs font-bold tracking-wide">اتصال سريع</span>
        </a>
        
        {/* WhatsApp Button (Smart FAB) */}
        <div className="relative group/fab">
            {peakTimeNudge && (
              <div className="absolute -top-14 right-0 w-max max-w-[200px] rounded-t-xl rounded-bl-xl rounded-br-sm bg-background border border-border p-3 text-[10px] font-bold text-muted-foreground shadow-xl animate-in fade-in slide-in-from-bottom-2 z-50">
                <Clock3 className="inline size-3 text-amber-500 mr-1" /> {peakTimeNudge}
              </div>
            )}
            <a href={`${whatsappBase}${encodeURIComponent("مرحباً، أريد الاستفسار عن أنظمة الحماية")}`} onClick={() => navigator.vibrate?.([50, 50, 50])} aria-label="تواصل عبر واتساب" className="group flex h-14 items-center gap-3 overflow-hidden rounded-full border border-action/30 bg-action/10 pl-2 pr-6 text-foreground shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:bg-action/20 hover:shadow-action/20 sm:h-16">
          <div className="relative grid size-10 shrink-0 place-items-center rounded-full bg-action text-action-foreground shadow-lg sm:size-12">
            <span className="absolute inset-0 animate-ping rounded-full bg-action opacity-40 duration-1000" />
            <MessageCircle className="relative size-5 transition-transform group-hover:rotate-12 group-hover:scale-110 sm:size-6" fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-action/80">تحتاج مساعدة؟</span>
            <span className="text-sm font-bold tracking-wide transition-all duration-300 text-action-foreground drop-shadow-md">{fabText}</span>
          </div>
        </a>
          </div>
      </div>

            )}

      {/* Mobile Bottom App Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-background/90 pb-safe backdrop-blur-xl sm:hidden">
        <Link to="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-action">
          <ShieldCheck className="size-5" />
          <span className="text-[10px] font-bold">????????</span>
        </Link>
        <a href="/#packages" onClick={() => navigator.vibrate?.(50)} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-action">
          <Zap className="size-5" />
          <span className="text-[10px] font-bold">الباقات</span>
        </a>
        <a href="/#custom" onClick={() => navigator.vibrate?.(50)} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-action">
          <Settings className="size-5" />
          <span className="text-[10px] font-bold">حاسبة</span>
        </a>
        <Link to="/contact" className="flex flex-col items-center gap-1 text-action hover:text-action-hover">
          <MessageCircle className="size-5" />
          <span className="text-[10px] font-bold">الدعم</span>
        </Link>
      </nav>
    </main>
    </>
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
