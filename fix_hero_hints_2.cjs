const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');

const idleIndicatorJSX = `
            {/* Idle Scroll Down Indicator */}
            <AnimatePresence>
              {idleHint && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-hero-muted mix-blend-screen pointer-events-none">
                  <span className="text-xs font-bold uppercase tracking-widest text-action">اسحب للأسفل</span>
                  <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="flex h-10 w-6 justify-center rounded-full border-2 border-action/50 pt-2">
                    <div className="h-2 w-1.5 rounded-full bg-action" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
`;

// Mobile Hero Ends with:
//               </div>
//             </div>
//           </section>
// We can find `id="packages"` or `<section aria-label="الارقام`? Wait, I don't know the exact string.

// Let's use `</section>` to find the end of mobile hero.
// There is `<section className="block bg-hero text-hero-foreground sm:hidden pt-16 relative">`
// Let's replace the content between `<section className="block bg-hero...` and the next `<section` by injecting it before the `</section>`.
let parts = code.split('<section aria-label="');
if (parts.length > 1) {
    // The first part ends with `</section>` which is the mobile hero!
    // Wait, desktop hero also ends with `</section>`. So the last `</section>` in parts[0] is the mobile hero. The one before it is desktop hero.
    let desktopIndex = parts[0].lastIndexOf('</section>', parts[0].lastIndexOf('</section>') - 10);
    let mobileIndex = parts[0].lastIndexOf('</section>');

    if (desktopIndex !== -1 && mobileIndex !== -1) {
        let firstHalf = parts[0].substring(0, desktopIndex);
        let secondHalf = parts[0].substring(desktopIndex, mobileIndex);
        let thirdHalf = parts[0].substring(mobileIndex);
        
        parts[0] = firstHalf + idleIndicatorJSX + secondHalf + idleIndicatorJSX + thirdHalf;
    }
}

code = parts.join('<section aria-label="');

fs.writeFileSync('src/routes/index.tsx', code);
console.log('Fixed idle indicator');
