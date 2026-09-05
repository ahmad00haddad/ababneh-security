const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');
code = code.replace('<article key={title} className="group bg-card p-7 transition-colors hover:bg-accent sm:p-8">', '<motion.article initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} key={title} className="group bg-card p-7 transition-colors hover:bg-accent sm:p-8">');
fs.writeFileSync('src/routes/index.tsx', code);
