const fs = require('fs');
let code = fs.readFileSync('src/routes/contact.tsx', 'utf-8');

// Inject states and hooks
if (!code.includes('peakTimeNudge')) {
  code = code.replace(
    'const [fabVisible, setFabVisible] = useState(true);',
    'const [fabVisible, setFabVisible] = useState(true);\n  const [peakTimeNudge, setPeakTimeNudge] = useState("");\n  const [faqHint, setFaqHint] = useState("");\n  const [pwaHint, setPwaHint] = useState(false);\n  const faqTimerRef = useRef<NodeJS.Timeout | null>(null);\n'
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

// 1. Peak Time Nudge on FAB
// Find the WhatsApp Button anchor start
const waStart = code.indexOf('{/* WhatsApp Button (Smart FAB) */}');
if (waStart > -1) {
  const waAnchor = code.indexOf('<a href=', waStart);
  if (waAnchor > -1) {
    // Inject the wrapper div before the anchor
    const wrapper = `<div className="relative group/fab">
            {peakTimeNudge && (
              <div className="absolute -top-14 right-0 w-max max-w-[200px] rounded-t-xl rounded-bl-xl rounded-br-sm bg-background border border-border p-3 text-[10px] font-bold text-muted-foreground shadow-xl animate-in fade-in slide-in-from-bottom-2 z-50">
                <Clock3 className="inline size-3 text-amber-500 mr-1" /> {peakTimeNudge}
              </div>
            )}\n            `;
    code = code.substring(0, waAnchor) + wrapper + code.substring(waAnchor);
    
    // Find the end of this anchor tag to close the div
    const waEnd = code.indexOf('</a>', waAnchor) + 4;
    code = code.substring(0, waEnd) + '\n          </div>' + code.substring(waEnd);
  }
}

// 2. Reading Intent Hint (FAQ)
// We need to add onMouseEnter and onMouseLeave to the FAQ details/summary elements.
const faqMap = code.indexOf('faqData.map((faq, index)');
if (faqMap > -1) {
  const detailsStart = code.indexOf('<details', faqMap);
  if (detailsStart > -1) {
    code = code.substring(0, detailsStart) + 
      '<details ' +
      'onMouseEnter={() => { faqTimerRef.current = setTimeout(() => setFaqHint(faq.q), 5000); }} ' +
      'onMouseLeave={() => { if(faqTimerRef.current) clearTimeout(faqTimerRef.current); setFaqHint(""); }} ' +
      code.substring(detailsStart + 8);
      
    // Add the Tooltip UI for the FAQ hint
    const sectionEnd = code.indexOf('</section>', faqMap);
    if (sectionEnd > -1) {
      code = code.substring(0, sectionEnd) + 
      `\n        {faqHint && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-full bg-action px-6 py-3 text-sm font-bold text-white shadow-2xl animate-in fade-in slide-in-from-bottom-5 border border-white/20">
            <MessageCircle className="inline size-4 mr-2" />
            هل واجهت صعوبة في فهم: "{faqHint}"؟ تحدث مع مهندسنا الآن!
          </div>
        )}\n      ` + code.substring(sectionEnd);
    }
  }
}

// 3. Smart PWA Prompt
// Find the Download button
const btnStart = code.indexOf('<button onClick={handleInstallClick}');
if (btnStart > -1) {
  code = code.substring(0, btnStart) + '<div className="relative">' + code.substring(btnStart);
  
  const btnEnd = code.indexOf('</button>', btnStart) + 9;
  const pwaTooltip = `
                 {pwaHint && (
                   <div className="absolute -top-10 left-1/2 w-max -translate-x-1/2 rounded-full bg-foreground text-background px-3 py-1 text-[10px] font-bold animate-bounce z-20 shadow-xl after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-foreground">
                     تزورنا كثيراً؟ ثبت التطبيق للوصول بضغطة واحدة!
                   </div>
                 )}
                 </div>`;
  code = code.substring(0, btnEnd) + pwaTooltip + code.substring(btnEnd);
}

fs.writeFileSync('src/routes/contact.tsx', code);
console.log('Contact features injected.');
