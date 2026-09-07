const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');

code = code.replace(/^[ \t]*const \[locationNudge, setLocationNudge\] = useState\(""\);\r?\n/gm, '');

fs.writeFileSync('src/routes/index.tsx', code);
