const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');

// The original desktop h1
const desktopH1 = '<h1 className="max-w-2xl font-display text-5xl font-black leading-[1.15] lg:text-6xl xl:text-7xl"';
// The new smaller desktop h1
const newDesktopH1 = '<h1 className="max-w-2xl font-display text-4xl font-black leading-[1.15] lg:text-5xl xl:text-6xl"';

code = code.replace(desktopH1, newDesktopH1);

// Add greeting to both mobile and desktop h1
// 1. Mobile
const mobileH1Full = `<h1 className="mt-2 font-display text-3xl font-black leading-[1.2]">
              أنظمة حماية متطورة<br />
              <span className="text-action">لأمان عائلتك وعملك</span>
            </h1>`;
const newMobileH1Full = `<h1 className="mt-2 font-display text-2xl font-black leading-[1.2]">
              <span className="block text-sm font-bold text-muted-foreground mb-1">{greeting}</span>
              أنظمة حماية متطورة<br />
              <span className="text-action">لأمان عائلتك وعملك</span>
            </h1>`;
// Arabic text might be corrupted in the replace if I use hardcoded arabic in the match. Let's use regex.
code = code.replace(/<h1 className="mt-2 font-display text-3xl font-black leading-\[1\.2\]">\s*.*<br \/>\s*<span className="text-action">.*<\/span>\s*<\/h1>/, `<h1 className="mt-2 font-display text-2xl font-black leading-[1.2]"><span className="block text-sm font-bold text-muted-foreground mb-1">{greeting}</span>أنظمة حماية متطورة<br /><span className="text-action">لأمان عائلتك وعملك</span></h1>`);

// 2. Desktop
code = code.replace(/<h1 className="max-w-2xl font-display text-4xl font-black leading-\[1\.15\] lg:text-5xl xl:text-6xl"\s*style=\{appReady \? \{ animation: "reveal 1s 2\.5s ease-out both" \} : \{ opacity: 0 \}\}>\s*.*<br \/>\s*<span className="text-action">.*<\/span>\s*<\/h1>/, `<h1 className="max-w-2xl font-display text-4xl font-black leading-[1.15] lg:text-5xl xl:text-6xl" style={appReady ? { animation: "reveal 1s 2.5s ease-out both" } : { opacity: 0 }}><span className="block text-xl font-bold text-hero-muted mb-2">{greeting}</span>أنظمة حماية متطورة<br /><span className="text-action">لأمان عائلتك وعملك</span></h1>`);

fs.writeFileSync('src/routes/index.tsx', code);
console.log('Hero fixed');
