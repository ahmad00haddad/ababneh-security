const fs = require('fs');
function fix(file) {
  let code = fs.readFileSync(file, 'utf-8');
  code = code.replace(/<Link to=\"\/contact\" className=\"flex flex-col items-center gap-1 text-action hover:text-action-hover\"><\/Link>/g, 
  '<Link to=\"/contact\" className=\"flex flex-col items-center gap-1 text-action hover:text-action-hover\">\n          <MessageCircle className=\"size-5\" />\n          <span className=\"text-[10px] font-bold\">????? ????</span>\n        </Link>');
  // also fix the ???????? issue from my previous script (encoding issue with set-content)
  code = code.replace(/<span className=\"text-\[10px\] font-bold\">\?\?\?\?\?\?\?\?<\/span>/g, '<span className=\"text-[10px] font-bold\">????????</span>');
  fs.writeFileSync(file, code);
}
fix('src/routes/index.tsx');
fix('src/routes/contact.tsx');
