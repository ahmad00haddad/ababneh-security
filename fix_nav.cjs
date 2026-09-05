const fs = require('fs');

function fix(file) {
  let code = fs.readFileSync(file, 'utf-8');
  code = code.replace(/<Link to=\"\/\" className=\"flex flex-col items-center gap-1 text-muted-foreground hover:text-action\"><\/Link>/g, 
  '<Link to=\"/\" className=\"flex flex-col items-center gap-1 text-muted-foreground hover:text-action\">\n          <ShieldCheck className=\"size-5\" />\n          <span className=\"text-[10px] font-bold\">????????</span>\n        </Link>');
  fs.writeFileSync(file, code);
}
fix('src/routes/index.tsx');
fix('src/routes/contact.tsx');
