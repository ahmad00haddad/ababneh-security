const fs = require('fs');
let code = fs.readFileSync('src/routes/contact.tsx', 'utf-8');

// 1. Add PWA hint logic
const pwaHooks = `
    const [pwaHint, setPwaHint] = useState(false);

    useEffect(() => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
      const visitedBefore = localStorage.getItem('visited_ababneh');
      
      if (!isStandalone && visitedBefore) {
        let t = setTimeout(() => setPwaHint(true), 8000);
        return () => clearTimeout(t);
      }
      localStorage.setItem('visited_ababneh', 'true');
    }, []);
`;
code = code.replace(/const \[pwaHint, setPwaHint\] = useState\(false\);/, pwaHooks);

// 2. Add PWA hint render in FAB area
const pwaRender = `
            <AnimatePresence>
              {pwaHint && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="absolute bottom-24 right-0 w-max rounded-lg bg-surface border border-action/30 p-4 text-xs font-bold text-foreground shadow-2xl z-50 flex items-start gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-action text-sm">تلميح للزائر المتكرر</span>
                    <span className="text-muted-foreground font-medium">قم بتثبيت التطبيق (Add to Home Screen) للوصول السريع بدون إنترنت.</span>
                  </div>
                  <button onClick={() => setPwaHint(false)} className="text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
                </motion.div>
              )}
            </AnimatePresence>
`;
if (code.includes('{/* WhatsApp Button (Smart FAB) */}')) {
    code = code.replace('{/* WhatsApp Button (Smart FAB) */}', pwaRender + '\n        {/* WhatsApp Button (Smart FAB) */}');
}

fs.writeFileSync('src/routes/contact.tsx', code);
console.log('PWA hint added');
