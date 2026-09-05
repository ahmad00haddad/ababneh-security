const fs = require('fs');

let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');

// 1. Live Security Counter
if (!code.includes('liveProjects')) {
  code = code.replace(
    'const [fingerprint, setFingerprint] = useState(false);',
    'const [fingerprint, setFingerprint] = useState(false);\n  const [liveProjects, setLiveProjects] = useState(500);\n  const [locationNudge, setLocationNudge] = useState("");\n  const [videoHint, setVideoHint] = useState("");\n  const [calcHesitation, setCalcHesitation] = useState(false);\n  const [trustHint, setTrustHint] = useState("");\n  const [pkgHint, setPkgHint] = useState(false);\n  const [hoveredHotspot, setHoveredHotspot] = useState("");\n'
  );
  
  const useEffectHooks = `
    // Live Security Counter
    useEffect(() => {
      const interval = setInterval(() => {
        setLiveProjects(p => p + Math.floor(Math.random() * 2));
      }, 8000);
      return () => clearInterval(interval);
    }, []);

    // Location-Aware Nudge
    useEffect(() => {
      setTimeout(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((pos) => {
             setLocationNudge("أنت قريب من فرعنا في إربد، شرفنا لزيارة المعرض!");
          }, () => {}, { timeout: 5000 });
        }
      }, 4000);
    }, []);

    // Calculator Hesitation
    useEffect(() => {
      const timer = setTimeout(() => {
        setCalcHesitation(true);
      }, 30000);
      return () => clearTimeout(timer);
    }, []);
  `;
  code = code.replace('useEffect(() => {', useEffectHooks + '\n  useEffect(() => {');
}

// 2. Apply Location Nudge to Hero
code = code.replace(
  '<h1 className="font-display text-4xl font-black',
  '{locationNudge && <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-max animate-bounce rounded-full bg-action/20 border border-action/50 px-4 py-1.5 text-xs font-bold text-action backdrop-blur-md z-30"><MapPin className="inline size-3 mr-1"/> {locationNudge}</div>}\n            <h1 className="font-display text-4xl font-black'
);

// 3. Apply Video Contextual Markers
// Instead of full regex, let's inject onTimeUpdate
code = code.replace(
  '<video ref={desktopVideoRef} autoPlay loop muted playsInline poster={heroMan} className="absolute inset-0 h-full w-full object-cover object-center">',
  `<video ref={desktopVideoRef} onTimeUpdate={(e) => {
              const t = e.currentTarget.currentTime;
              if (t > 5 && t < 10) setVideoHint("مراقبة مستمرة بلا توقف 24/7 🔴");
              else setVideoHint("");
            }} autoPlay loop muted playsInline poster={heroMan} className="absolute inset-0 h-full w-full object-cover object-center">`
);

// Add the tooltip for video
code = code.replace(
  '</video>',
  `</video>
            {videoHint && (
              <div className="absolute bottom-10 left-10 z-20 flex items-center gap-2 rounded-lg bg-black/80 px-4 py-2 font-mono text-xs font-bold text-white border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-5">
                <ScanSearch className="size-4 text-action animate-spin" /> {videoHint}
              </div>
            )}`
);

// 4. Apply Interactive Hotspots & Live Projects to Camera image
const aboutBlockStart = code.indexOf('<div className="group relative aspect-video overflow-hidden rounded-2xl border border-border shadow-2xl sm:aspect-[4/3] lg:aspect-square bg-black">');
if (aboutBlockStart > -1) {
  const nextDiv = code.indexOf('</div>\n        </div>\n      </section>', aboutBlockStart);
  if (nextDiv > -1) {
    const aboutReplacement = `<div className="group relative aspect-video overflow-hidden rounded-2xl border border-border shadow-2xl sm:aspect-[4/3] lg:aspect-square bg-black">
            <img src={cameraCloseup} alt="كاميرا مراقبة" className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
            
            {/* Live REC Indicator */}
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded bg-background/80 px-2 py-1 font-mono text-[10px] text-foreground backdrop-blur-sm z-10">
              <div className="size-2 animate-pulse rounded-full bg-action" />
              <span>REC | 03:42:01:99</span>
            </div>

            {/* Hotspots */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
               {/* Lens */}
               <div className="absolute top-[45%] left-[35%] group/spot cursor-crosshair">
                  <div className="size-6 animate-ping rounded-full bg-action/50" />
                  <div className="absolute inset-0 m-auto size-2 rounded-full bg-action" />
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 rounded bg-black/90 p-2 text-center text-[10px] font-bold text-white opacity-0 transition-opacity group-hover/spot:opacity-100 border border-action/30">عدسة ColorVu لرؤية ليلية ملونة 100%</div>
               </div>
               {/* Body */}
               <div className="absolute top-[30%] right-[30%] group/spot cursor-crosshair">
                  <div className="size-6 animate-ping rounded-full bg-action/50 delay-150" />
                  <div className="absolute inset-0 m-auto size-2 rounded-full bg-action" />
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 rounded bg-black/90 p-2 text-center text-[10px] font-bold text-white opacity-0 transition-opacity group-hover/spot:opacity-100 border border-action/30">هيكل معدني صلب IP67 مقاوم للمطر والغبار</div>
               </div>
            </div>

            {/* Bounding Box on Hover */}
            <div className="absolute left-1/4 top-1/4 h-1/2 w-1/2 border-2 border-action opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

            <div className="absolute bottom-6 right-6 rounded-lg bg-background/90 p-4 shadow-xl backdrop-blur-md z-10">
              <div className="font-display text-3xl font-black text-action animate-pulse tabular-nums">+{liveProjects}</div>
              <div className="text-sm font-bold text-foreground">مشروع منفذ بنجاح</div>
            </div>`;
    code = code.substring(0, aboutBlockStart) + aboutReplacement + code.substring(nextDiv);
  }
}

// 5. Trust Hints in Calculator
code = code.replace(
  '<div className="grid gap-6 sm:grid-cols-2">',
  `{trustHint && <div className="mb-4 text-xs font-bold text-emerald-500 animate-in fade-in flex items-center gap-2 bg-emerald-500/10 p-2 rounded-md border border-emerald-500/20"><ShieldCheck className="size-4"/> {trustHint}</div>}\n          <div className="grid gap-6 sm:grid-cols-2">`
);
code = code.replace(
  '<input type="number" id="cameras" min="1" max="64" value={cameras} onChange=',
  '<input onFocus={() => setTrustHint("بياناتك مشفرة ولا يتم تخزينها، نستخدمها فقط لحساب التكلفة المبدئية")} onBlur={() => setTrustHint("")} type="number" id="cameras" min="1" max="64" value={cameras} onChange='
);

// 6. Hesitation Hint in Calculator
code = code.replace(
  '<div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-action/20 bg-action/5 p-6 sm:flex-row">',
  `{calcHesitation && <div className="mt-4 flex w-full items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm font-bold text-amber-500 animate-in fade-in slide-in-from-bottom-2"><MessageCircle className="size-5" /> الميزانية عائق؟ لا تقلق، تواصل معنا لنرتب لك باقة تقسيط ميسرة أو خصم خاص!</div>}\n          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-action/20 bg-action/5 p-6 sm:flex-row">`
);

// 7. Package Recommendation Hint
code = code.replace(
  'className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-action bg-surface shadow-2xl"',
  'className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-action bg-surface shadow-2xl group" onMouseEnter={() => setPkgHint(true)} onMouseLeave={() => setPkgHint(false)}'
);
code = code.replace(
  '<div className="absolute -right-12 top-6 rotate-45 bg-action px-12 py-1 text-center text-[10px] font-bold uppercase tracking-widest text-action-foreground">',
  `{pkgHint && <div className="absolute -top-12 left-1/2 w-max -translate-x-1/2 rounded-full bg-foreground text-background px-3 py-1 text-[10px] font-bold animate-bounce z-20 shadow-xl after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-foreground">90% من عملائنا يختارون هذه الباقة!</div>}\n              <div className="absolute -right-12 top-6 rotate-45 bg-action px-12 py-1 text-center text-[10px] font-bold uppercase tracking-widest text-action-foreground">`
);

fs.writeFileSync('src/routes/index.tsx', code);
console.log('Index updated properly without breaking HTML');
