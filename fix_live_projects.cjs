const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');
code = code.replace('<div className="font-display text-3xl font-black text-action">+500</div>', '<div className="font-display text-3xl font-black text-action animate-pulse tabular-nums">+{liveProjects}</div>');
fs.writeFileSync('src/routes/index.tsx', code);
