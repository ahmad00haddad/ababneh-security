const fs = require('fs');
let code = fs.readFileSync('src/routes/contact.tsx', 'utf-8');

// 1. Add import for SmartForm
if (!code.includes('SmartForm')) {
    code = code.replace('import { Testimonials } from "../components/Testimonials";', 'import { Testimonials } from "../components/Testimonials";\nimport { SmartForm } from "../components/SmartForm";');
}

// 2. Fix the Peak Time Nudge to be true Working Hours logic & Hesitation Nudge
const newHooks = `
    const [peakTimeNudge, setPeakTimeNudge] = useState("");
    const [hesitationHint, setHesitationHint] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
      const h = new Date().getHours();
      if (h >= 17 || h < 9) {
        setPeakTimeNudge("خارج الدوام — نرد صباحاً 9:00");
      } else {
        setPeakTimeNudge("متوسط الرد على واتساب: 4 دقائق");
      }

      let t = setTimeout(() => {
        setHesitationHint(true);
      }, 5000);
      return () => clearTimeout(t);
    }, []);
`;
code = code.replace(/const \[peakTimeNudge, setPeakTimeNudge\] = useState\(""\);/g, newHooks);

// 3. Inject SmartForm in the layout
// The layout has `<div className="mx-auto max-w-3xl">` for the contact section, let's change it to a 2-col grid.
// Find the `<section className="border-b border-border bg-background py-10 overflow-hidden">` (Wait, I need the exact string).
// It's `<section aria-label="O U,O1U,O U.O O O U,OOO OUSOc O U,U.O1OU.O_Oc" className="border-b border-border bg-background py-10 overflow-hidden">` (Oh right, arabic string got garbled in source).
// Let's match `<div className="mt-12 grid gap-6 sm:grid-cols-2">` which holds the contact cards.
const cardsGridRegex = /<div className="mt-12 grid gap-6 sm:grid-cols-2">[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/section>)/;
const cardsGridMatch = code.match(cardsGridRegex);

if (cardsGridMatch) {
    const originalGrid = cardsGridMatch[0];
    const newLayout = `
<div className="mt-12 grid gap-10 lg:grid-cols-2 items-start">
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
    ${originalGrid.replace('<div className="mt-12 grid gap-6 sm:grid-cols-2">', '')}
  </div>
  <div className="sticky top-24">
    <SmartForm />
  </div>
</div>
`;
    code = code.replace(cardsGridMatch[0], newLayout);
}

// 4. Map Hint
const mapRegex = /<motion\.div initial={{opacity:0, scale:0\.95}} whileInView={{opacity:1, scale:1}} transition={{duration:0\.5}} className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-lg relative">/;
const newMap = `<motion.div initial={{opacity:0, scale:0.95}} whileInView={{opacity:1, scale:1}} transition={{duration:0.5}} className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-lg relative group">
                  <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm">
                     <span className="bg-background text-foreground px-6 py-3 rounded-full font-bold text-sm shadow-2xl flex items-center gap-2"><MapPin className="size-4 text-action" /> اضغط للتنقل عبر خرائط Google</span>
                  </div>`;
code = code.replace(mapRegex, newMap);

// 5. Alternate Phone Hint
const phoneButtonRegex = /<a href="tel:0788757801" onClick=\{.*?className="group flex h-12 items-center gap-3/;
if (code.match(phoneButtonRegex)) {
    code = code.replace(phoneButtonRegex, match => `<div className="relative group/phone">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-max rounded-md bg-background border border-border px-3 py-1.5 text-[10px] font-bold text-muted-foreground shadow-xl opacity-0 group-hover/phone:opacity-100 transition-opacity pointer-events-none">تفضل الاتصال؟ الرقم مباشر بدون مقسّم</div>\n` + match);
    code = code.replace(/<span className="text-xs font-bold tracking-wide">.*?<\/span>\s*<\/a>/, match => match + '\n</div>');
}

// 6. WhatsApp Hesitation Hint (below the Whatsapp button)
const whatsappBaseRegex = /<div className="relative group\/fab">/;
if (code.match(whatsappBaseRegex)) {
    code = code.replace(whatsappBaseRegex, match => match + `
            <AnimatePresence>
              {hesitationHint && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="absolute -left-48 top-2 w-max rounded-lg bg-surface border border-action/30 p-3 text-xs font-bold text-foreground shadow-2xl z-50 flex items-center gap-2">
                  <div className="size-2 rounded-full bg-action animate-ping" />
                  لم يتضح؟ اسأل مهندسنا
                </motion.div>
              )}
            </AnimatePresence>
    `);
}

// 7. Controlled FAQ Accordion (openQuestion highlight + dim others)
const oldFaqRegex = /<motion\.details key=\{i\} layout transition=\{\{ type: "spring", stiffness: 300, damping: 30 \}\} className="group rounded-lg border border-border bg-surface \[\&_summary::-webkit-details-marker\]:hidden">[\s\S]*?<\/motion\.details>/g;

const newFaq = `<motion.div key={i} layout transition={{ type: "spring", stiffness: 300, damping: 30 }} className={\`group overflow-hidden rounded-lg border transition-all duration-300 \${openFaq === i ? "border-action shadow-lg bg-surface" : openFaq !== null ? "border-border/50 bg-background opacity-40 hover:opacity-100" : "border-border bg-surface"}\`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full cursor-pointer items-center justify-between p-5 font-bold text-foreground outline-none text-right">
                  {faq.q}
                  <ChevronDown className={\`size-5 transition-transform duration-300 \${openFaq === i ? "rotate-180 text-action" : ""}\`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                      <div className="border-t border-border/50 p-5 text-sm leading-7 text-muted-foreground">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>`;

code = code.replace(oldFaqRegex, newFaq);

fs.writeFileSync('src/routes/contact.tsx', code);
console.log('Contact features applied!');
