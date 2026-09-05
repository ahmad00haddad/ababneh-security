const fs = require('fs');
let code = fs.readFileSync('src/routes/__root.tsx', 'utf-8');
code = code.replace('{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }', '{ rel: "icon", href: "/logo.png", type: "image/png" }');
// Let's also fix the description which is probably corrupted
code = code.replace(/content: "OU\+O,U.Oc.*?"/g, 'content: "أنظمة حماية وكاميرات مراقبة متكاملة في الأردن"');
fs.writeFileSync('src/routes/__root.tsx', code);
