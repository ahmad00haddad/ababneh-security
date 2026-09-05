const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');
code = code.split('</article>').join('</motion.article>');
fs.writeFileSync('src/routes/index.tsx', code);
