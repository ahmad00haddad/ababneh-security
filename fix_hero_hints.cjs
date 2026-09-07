const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');

// 1. Add state for idle and return hint
const hooksToInject = `
    const [idleHint, setIdleHint] = useState(false);
    const [returnHint, setReturnHint] = useState(false);

    useEffect(() => {
      let idleTimer: NodeJS.Timeout;
      const resetIdle = () => {
        setIdleHint(false);
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          if (window.scrollY < 100) setIdleHint(true);
        }, 5000);
      };

      window.addEventListener("mousemove", resetIdle);
      window.addEventListener("scroll", resetIdle);
      window.addEventListener("touchstart", resetIdle);
      resetIdle();

      return () => {
        window.removeEventListener("mousemove", resetIdle);
        window.removeEventListener("scroll", resetIdle);
        window.removeEventListener("touchstart", resetIdle);
        clearTimeout(idleTimer);
      };
    }, []);

    useEffect(() => {
      const handleVisibility = () => {
        if (document.visibilityState === "visible") {
          setReturnHint(true);
          setTimeout(() => setReturnHint(false), 5000);
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);
      return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);
`;
code = code.replace('const [slowNetHint, setSlowNetHint] = useState(false);', 'const [slowNetHint, setSlowNetHint] = useState(false);\n' + hooksToInject);

// 2. Add Hints to AnimatePresence
const returnHintJSX = `
        {returnHint && (
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 shadow-lg backdrop-blur-md">
            <span className="text-sm font-bold text-primary">👋 ما زلنا هنا — نكمل؟</span>
          </motion.div>
        )}
`;
code = code.replace('{slowNetHint && (', returnHintJSX + '        {slowNetHint && (');

// 3. Add Flashlight and Idle hint to Hero Desktop
const desktopHeroRegex = /<section className="relative hidden min-h-\[100svh\] pt-20 overflow-hidden bg-hero text-hero-foreground sm:block">/;
const desktopHeroReplacement = `<section className="relative hidden min-h-[100svh] pt-20 overflow-hidden bg-hero text-hero-foreground sm:block">
            {/* Flashlight Effect */}
            <div className="pointer-events-none absolute inset-0 z-[15] transition-opacity duration-300" style={{ background: \`radial-gradient(600px circle at \${mousePos.x}px \${mousePos.y}px, rgba(255,255,255,0.08), transparent 40%)\` }} />
`;
code = code.replace(desktopHeroRegex, desktopHeroReplacement);

// 4. Add Flashlight to Hero Mobile
const mobileHeroRegex = /<section className="block bg-hero text-hero-foreground sm:hidden pt-16">/;
const mobileHeroReplacement = `<section className="block bg-hero text-hero-foreground sm:hidden pt-16 relative">
            {/* Flashlight Effect Mobile */}
            <div className="pointer-events-none absolute inset-0 z-[15] transition-opacity duration-300" style={{ background: \`radial-gradient(400px circle at \${mousePos.x}px \${mousePos.y}px, rgba(255,255,255,0.08), transparent 40%)\` }} />
`;
code = code.replace(mobileHeroRegex, mobileHeroReplacement);

// 5. Add Idle Scroll Down indicator
const idleIndicatorJSX = `
            {/* Idle Scroll Down Indicator */}
            <AnimatePresence>
              {idleHint && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-hero-muted mix-blend-screen">
                  <span className="text-xs font-bold uppercase tracking-widest text-action">اسحب للأسفل</span>
                  <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="flex h-10 w-6 justify-center rounded-full border-2 border-action/50 pt-2">
                    <div className="h-2 w-1.5 rounded-full bg-action" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
`;
code = code.replace(/<\/section>\s*<section aria-label="O U,O1U,O U.O O/, idleIndicatorJSX + '          </section>\n          <section aria-label="O U,O1U,O U.O O'); // Inject before the end of the hero block

fs.writeFileSync('src/routes/index.tsx', code);
console.log('Hero Hints applied!');
