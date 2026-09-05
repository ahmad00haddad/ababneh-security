const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');

code = code.replace(/OU\+O,U\.Oc OU\.O USOc U\.OOU\^OOc/g, 'أنظمة حماية متطورة');
code = code.replace(/U,OU\.O U\+ O1O OU,OU U\^O1U\.U,U/g, 'لأمان عائلتك وعملك');

fs.writeFileSync('src/routes/index.tsx', code);
