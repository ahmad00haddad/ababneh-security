const fs = require('fs');
let code = fs.readFileSync('src/routes/contact.tsx', 'utf-8');

// Add Framer Motion
if (!code.includes('import { motion } from "framer-motion"')) {
    code = code.replace('import { useMemo, useState, useEffect, useRef, type ReactNode } from "react";', 'import { useMemo, useState, useEffect, useRef, type ReactNode } from "react";\nimport { motion, AnimatePresence } from "framer-motion";');
}

// 1. Floating Bubble Physics (WhatsApp)
code = code.replace('className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"', 'className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"\n            initial={{ y: 0 }}\n            animate={{ y: [0, -10, 0] }}\n            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}');
code = code.replace('<div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"', '<motion.div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"');
code = code.replace('</button>\n          {/* Direct Call Button */}', '</button>\n          {/* Direct Call Button */}');
// Need to replace the closing tag of that div
code = code.replace('</a>\n        </div>\n      )}', '</a>\n        </motion.div>\n      )}');

// 2. Map Pin Drop & Bounce
// The map pin is `<MapPin className="size-8 text-action animate-bounce" />` inside the map overlay
code = code.replace('<MapPin className="size-8 text-action animate-bounce" />', '<motion.div initial={{ y: -100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", bounce: 0.7, duration: 1 }}><MapPin className="size-8 text-action" /></motion.div>');

// 3. Accordion Spring (FAQ)
code = code.replace('<details key={i}', '<motion.details key={i} layout transition={{ type: "spring", stiffness: 300, damping: 30 }}');
code = code.replace('</details>', '</motion.details>'); // We have to map all closing tags
code = code.replace(/<\/details>/g, '</motion.details>'); // Fix all

// 4. Copy-to-clipboard Hint & 5. Ripple Effect
// For Copy-to-clipboard, we need to add state and click handler to the Phone Card.
code = code.replace('function Contact() {', 'function Contact() {\n  const [copied, setCopied] = useState(false);\n  const [ripple, setRipple] = useState<{x:number, y:number, id:number}[]>([]);\n  const addRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {\n    const rect = e.currentTarget.getBoundingClientRect();\n    setRipple([...ripple, { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() }]);\n  };\n');

const rippleElement = `{ripple.map(r => (
                  <motion.span key={r.id} initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 0.6 }} className="absolute rounded-full bg-white/30 pointer-events-none" style={{ left: r.x, top: r.y, width: 100, height: 100, marginLeft: -50, marginTop: -50 }} />
                ))}`;

// Wrap the Phone card
code = code.replace(
  '<a href="tel:0788757801" className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-action/30 hover:shadow-2xl hover:shadow-action/10 sm:p-8">',
  `<a href="#" onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText("0788757801"); setCopied(true); setTimeout(() => setCopied(false), 2000); addRipple(e); }} className={\`group relative overflow-hidden rounded-3xl border border-border \${copied ? "bg-emerald-500/10 border-emerald-500/50" : "bg-surface"} p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-action/30 hover:shadow-2xl hover:shadow-action/10 sm:p-8\`}>
   ${rippleElement}`
);
code = code.replace('<h3 className="mt-4 font-display text-xl font-bold">U.U,OU?U.Oc U+OOU?USOc</h3>', '{copied ? <h3 className="mt-4 font-display text-xl font-bold text-emerald-500">تم النسخ بنجاح! ✔️</h3> : <h3 className="mt-4 font-display text-xl font-bold">مكالمة هاتفية</h3>}');
code = code.replace('<p className="mt-2 text-sm text-muted-foreground">0788757801</p>', '{copied ? null : <p className="mt-2 text-sm text-muted-foreground">0788757801</p>}');

// Add Ripple to WhatsApp card too
code = code.replace(
  '<a href={`${whatsappBase}${encodeURIComponent("U.OO-O\\"O U<OO OOUSO_ O U,O O3OU?O3O O O1U+ OU+O,U.Oc O U,OU.O USOc")}`} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-3xl border border-action bg-action p-6 text-action-foreground shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-action/25 sm:p-8">',
  `<a href={\`\${whatsappBase}\${encodeURIComponent("مرحباً، أريد الاستفسار عن أنظمة الحماية")}\`} target="_blank" rel="noopener noreferrer" onClick={addRipple} className="group relative overflow-hidden rounded-3xl border border-action bg-action p-6 text-action-foreground shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-action/25 sm:p-8">
   ${rippleElement}`
);


fs.writeFileSync('src/routes/contact.tsx', code);
console.log('Contact features applied.');
