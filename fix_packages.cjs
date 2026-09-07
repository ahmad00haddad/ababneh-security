const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');

// 1. Add Scarcity Hint just below SectionHeading
const sectionHeadingRegex = /<SectionHeading eyebrow="O"O U,O O OO UOOc"[^>]+>/;
const scarcityJSX = `
            {/* Honest Scarcity Hint */}
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-action/20 bg-action/5 px-4 py-1.5 text-sm text-action shadow-inner">
              <Clock className="size-4 animate-pulse" />
              <span className="font-semibold">خصم التركيب ينتهي خلال 3 أيام</span>
            </motion.div>
`;
// Wait, the regex might not match due to powershell string corruption. Let's match by `id="packages"` instead.
const packagesHeaderMatch = /<section id="packages" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">\s*<div className="mx-auto max-w-6xl">\s*<SectionHeading[^>]+>/;

if (code.match(packagesHeaderMatch)) {
    code = code.replace(packagesHeaderMatch, match => match + scarcityJSX);
} else {
    // fallback if regex doesn't match perfectly
    const parts = code.split('id="packages"');
    if (parts.length > 1) {
        let afterId = parts[1];
        let insertPos = afterId.indexOf('/>', afterId.indexOf('<SectionHeading')) + 2;
        parts[1] = afterId.substring(0, insertPos) + scarcityJSX + afterId.substring(insertPos);
        code = parts.join('id="packages"');
    }
}

// 2. Add Custom Package Hint below the packages grid.
// The grid ends before `</section>` (or rather before `</div>\n        </section>` for packages)
const customHintJSX = `
            {/* Custom Package Hint */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mt-8 mx-auto flex max-w-md items-center justify-between rounded-xl border border-dashed border-border bg-card/50 p-4 transition-colors hover:border-action/50 hover:bg-action/5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-hero-glass/10 text-action">
                  <Settings2 className="size-5" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">تحتاج شيئاً مختلفاً؟</p>
                  <p className="text-xs text-muted-foreground">نصمم باقة خاصة تناسب احتياجاتك بدقة.</p>
                </div>
              </div>
              <a href="#custom" onClick={triggerGlitch} className="rounded-full bg-action px-4 py-2 text-xs font-bold text-white transition-transform hover:scale-105">
                تخصيص
              </a>
            </motion.div>
`;

const packagesGridEndRegex = /(<div className="mt-12 grid gap-6 lg:grid-cols-2">[\s\S]*?<\/div>)\s*(<\/div>\s*<\/section>)/;
if (code.match(packagesGridEndRegex)) {
    code = code.replace(packagesGridEndRegex, `$1\n${customHintJSX}\n$2`);
} else {
    // Fallback: search for `href="#custom" onClick={triggerGlitch} className="rounded-full` ... no wait, that's what I'm adding.
    // Let's use string manipulation safely.
    const customSectionStart = code.indexOf('<section id="custom"');
    if (customSectionStart > -1) {
        // Find the `</div>\n        </section>` right before it.
        const prevSectionEnd = code.lastIndexOf('</section>', customSectionStart);
        if (prevSectionEnd > -1) {
            // Find the `</div>` right before `</section>`
            const prevDivEnd = code.lastIndexOf('</div>', prevSectionEnd);
            if (prevDivEnd > -1) {
                code = code.substring(0, prevDivEnd) + customHintJSX + code.substring(prevDivEnd);
            }
        }
    }
}

// Ensure icons used are imported
if (!code.includes('Clock,')) code = code.replace('Settings,', 'Settings, Clock, Settings2,');

fs.writeFileSync('src/routes/index.tsx', code);
console.log('Packages Hints applied!');
