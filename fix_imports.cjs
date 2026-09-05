const fs = require('fs');

function ensureImports(file) {
  let code = fs.readFileSync(file, 'utf-8');
  const required = ['ScanSearch', 'MapPin', 'ShieldCheck'];
  let lucideMatch = code.match(/import \{([^}]+)\} from "lucide-react";/);
  if (lucideMatch) {
    let imports = lucideMatch[1].split(',').map(s => s.trim());
    required.forEach(req => {
      if (!imports.includes(req)) imports.push(req);
    });
    code = code.replace(lucideMatch[0], `import { ${imports.join(', ')} } from "lucide-react";`);
    fs.writeFileSync(file, code);
  }
}
ensureImports('src/routes/index.tsx');
ensureImports('src/routes/contact.tsx');
console.log('Imports fixed.');
