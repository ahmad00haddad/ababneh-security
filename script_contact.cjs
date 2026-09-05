const fs = require('fs');

let code = fs.readFileSync('src/routes/contact.tsx', 'utf-8');

if (!code.includes('peakTimeNudge')) {
  code = code.replace(
    'const [fingerprint, setFingerprint] = useState(false);',
    'const [fingerprint, setFingerprint] = useState(false);\n  const [peakTimeNudge, setPeakTimeNudge] = useState("");\n  const [faqHint, setFaqHint] = useState("");\n  const [pwaHint, setPwaHint] = useState(false);\n  const faqTimerRef = useRef<NodeJS.Timeout | null>(null);\n'
  );

  const useEffectHooks = `
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
  `;
  code = code.replace('useEffect(() => {', useEffectHooks + '\n  useEffect(() => {');
}

// Peak Time Nudge on WhatsApp FAB
code = code.replace(
  /<a href=\{\`\$\{whatsappBase\}\$\{encodeURIComponent\(\"U.OOO\"O U<OO OOUSO_ O U,O O3OU?O3O O O1U\+ OU\+O,U.Oc O U,O-U.O USOc\"\)\}\`\} onClick=\{\(\) => navigator.vibrate\?\.\(\[50, 50, 50\]\)\} aria-label=\"OU\^O OU, O1O\"O U\^O OO3O O\"\" className=\"group flex h-14 items-center gap-3 overflow-hidden rounded-full border border-action\/30 bg-action\/10 pl-2 pr-6 text-foreground shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:bg-action\/20 hover:shadow-action\/20 sm:h-16\">/g,
  `<div className="relative group/fab">
            {peakTimeNudge && (
              <div className="absolute -top-14 right-0 w-max rounded-t-xl rounded-bl-xl rounded-br-sm bg-background border border-border p-3 text-[10px] font-bold text-muted-foreground shadow-xl animate-in fade-in slide-in-from-bottom-2 z-50">
                <Clock3 className="inline size-3 text-amber-500 mr-1" /> {peakTimeNudge}
              </div>
            )}
            <a href={\`\${whatsappBase}\${encodeURIComponent("مرحباً، أحتاج مساعدة بخصوص الكاميرات")}\`} onClick={() => navigator.vibrate?.([50, 50, 50])} aria-label="تواصل عبر واتساب" className="group flex h-14 items-center gap-3 overflow-hidden rounded-full border border-action/30 bg-action/10 pl-2 pr-6 text-foreground shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:bg-action/20 hover:shadow-action/20 sm:h-16">`
);
code = code.replace(
  /<span className=\"text-\[10px\] font-medium text-action\/80\">OO-OO O U.O3O O1O_OcOY<\/span>\s*<span className=\"text-sm font-bold tracking-wide transition-all duration-300 text-action-foreground drop-shadow-md\">\{fabText\}<\/span>\s*<\/div>\s*<\/a>\s*<\/div>/,
  '<span className="text-[10px] font-medium text-action/80">مستشار أمني</span>\n              <span className="text-sm font-bold tracking-wide transition-all duration-300 text-action-foreground drop-shadow-md">{fabText}</span>\n            </div>\n          </a>\n          </div>\n        </div>'
); // Adjust closing tags because we wrapped the a tag in a relative div

// Wait, the regex replacement for the peakTimeNudge might be messy. Let's do it cleanly using indexOf.
