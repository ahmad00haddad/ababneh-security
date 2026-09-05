const fs = require('fs');
let code = fs.readFileSync('public/manifest.json', 'utf-8');
code = code.replace(/"src": "\/favicon.svg"/, '"src": "/logo.png"');
code = code.replace(/"type": "image\/svg\+xml"/, '"type": "image/png"');
code = code.replace(/"sizes": "any"/, '"sizes": "192x192 512x512"');
// I will also fix the corrupted Arabic in description
code = code.replace(/"description": ".*?"/, '"description": "أنظمة حماية وكاميرات مراقبة متكاملة في الأردن"');
fs.writeFileSync('public/manifest.json', code);
