const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');

// Add Framer Motion to index.tsx
if (!code.includes('import { motion } from "framer-motion"')) {
    code = code.replace('import { useMemo, useState, useEffect, useRef, type ReactNode } from "react";', 'import { useMemo, useState, useEffect, useRef, type ReactNode } from "react";\nimport { motion, AnimatePresence } from "framer-motion";');
}

// 1. Partnership Hint (Hikvision)
// Find Hikvision and wrap it. It's in the resolution select or text
code = code.replace('Hikvision AX PRO', '<span className="group/partner relative inline-block text-action border-b border-dashed border-action/50 cursor-help">Hikvision AX PRO<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max rounded bg-foreground text-background px-2 py-1 text-[10px] font-bold opacity-0 transition-opacity group-hover/partner:opacity-100 z-10 shadow-xl pointer-events-none">موزع معتمد بضمان الوكيل</span></span>');
code = code.replace('Hikvision ColorVu', '<span className="group/partner relative inline-block text-action border-b border-dashed border-action/50 cursor-help">Hikvision ColorVu<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max rounded bg-foreground text-background px-2 py-1 text-[10px] font-bold opacity-0 transition-opacity group-hover/partner:opacity-100 z-10 shadow-xl pointer-events-none">موزع معتمد بضمان الوكيل</span></span>');

// 2. Storage Hint & Offline Hint in Features
const featuresBlock = `
    const [hddHint, setHddHint] = useState(false);
    const [offlineHint, setOfflineHint] = useState(false);
`;
code = code.replace('function Index() {', 'function Index() {\n' + featuresBlock);

code = code.replace('HDD (Hard Disk)', '<span className="group/hdd relative inline-block cursor-help border-b border-dashed border-foreground/50">HDD (Hard Disk)<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded bg-action text-white p-2 text-center text-[10px] font-bold opacity-0 transition-opacity group-hover/hdd:opacity-100 z-10 pointer-events-none shadow-xl">يكفي لتسجيل 30 يوماً متواصلة بدون توقف</span></span>');
code = code.replace('دون الحاجة لإنترنت', '<span className="group/offline relative inline-block cursor-help text-emerald-500 font-bold border-b border-dashed border-emerald-500/50">دون الحاجة لإنترنت<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded bg-emerald-500 text-white p-2 text-center text-[10px] font-bold opacity-0 transition-opacity group-hover/offline:opacity-100 z-10 pointer-events-none shadow-xl">ماذا لو انقطع الإنترنت؟ لا تقلق، سيستمر التسجيل ولن تفقد أي لحظة!</span></span>');

// 3. Calculator Glowing Range Slider
code = code.replace('id="cameras" min="1" max="64"', 'id="cameras" min="1" max="64" className="w-full accent-action transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] focus:shadow-[0_0_15px_rgba(239,68,68,0.5)]"');

// 4. Bonus Reminder (Calculator)
code = code.replace('<div className="text-sm font-bold text-muted-foreground mt-1">القيمة التقريبية للمشروع</div>', '<div className="text-sm font-bold text-muted-foreground mt-1">القيمة التقريبية للمشروع</div>\n<div className="mt-2 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full animate-pulse border border-emerald-500/20">هذا السعر يشمل التركيب وضمان سنة مجاناً! 🎁</div>');

// 5. Skeleton Fade-in for Packages
// Replace `<article key={item.name}` with `<motion.article initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: idx*0.1}} key={item.name}`
code = code.replace('packages.map((item) => (', 'packages.map((item, idx) => (');
code = code.replace('<article key={item.name}', '<motion.article initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: idx*0.1}} key={item.name}');
code = code.replace('</article>', '</motion.article>');
code = code.replace('</article>', '</motion.article>'); // it might appear twice

// 6. Number Ticker
// We'll wrap {totalPrice.toLocaleString()} with a component or just use framer-motion key animation.
code = code.replace('<div className="font-display text-4xl font-black text-foreground sm:text-5xl">', '<div className="font-display text-4xl font-black text-foreground sm:text-5xl flex justify-center overflow-hidden h-14">\n<AnimatePresence mode="popLayout"><motion.span key={totalPrice} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>');
code = code.replace('JD {totalPrice.toLocaleString()}', 'JD {totalPrice.toLocaleString()}</motion.span></AnimatePresence>');

fs.writeFileSync('src/routes/index.tsx', code);
console.log('Index features part 2 applied.');
