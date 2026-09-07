const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');
const lucideMatch = code.match(/import\s+\{([^}]+)\}\s+from\s+["']lucide-react["']/);
if (lucideMatch) {
  let imports = lucideMatch[1];
  if (!imports.includes('Clock')) imports += ', Clock';
  if (!imports.includes('Settings2')) imports += ', Settings2';
  code = code.replace(lucideMatch[0], `import { ${imports} } from 'lucide-react'`);
  fs.writeFileSync('src/routes/index.tsx', code);
  console.log('Fixed imports');
}
