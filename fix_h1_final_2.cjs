const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');

let lines = code.split('\n');
for (let i=0; i<lines.length; i++) {
    if (lines[i].includes('className="mt-2 font-display text-2xl font-black leading-[1.2]"') && lines[i].includes('{greeting}</span>')) {
        lines[i] = '            <h1 className="mt-2 font-display text-2xl font-black leading-[1.2]"><span className="block text-sm font-bold text-muted-foreground mb-1">{greeting}</span>أنظمة حماية متطورة<br /><span className="text-action">لأمان عائلتك وعملك</span></h1>';
    }
    if (lines[i].includes('className="max-w-2xl font-display text-4xl font-black leading-[1.15]') && lines[i].includes('{greeting}</span>')) {
        lines[i] = '            <h1 className="max-w-2xl font-display text-4xl font-black leading-[1.15] lg:text-5xl xl:text-6xl" style={appReady ? { animation: "reveal 1s 2.5s ease-out both" } : { opacity: 0 }}><span className="block text-xl font-bold text-hero-muted mb-2">{greeting}</span>أنظمة حماية متطورة<br /><span className="text-action">لأمان عائلتك وعملك</span></h1>';
    }
}

fs.writeFileSync('src/routes/index.tsx', lines.join('\n'));
