const fs = require('fs');
let code = fs.readFileSync('src/routes/contact.tsx', 'utf-8');
if (!code.includes('Clock3,')) {
  code = code.replace(/import {([^}]+)} from "lucide-react";/, 'import {$1, Clock3} from "lucide-react";');
  fs.writeFileSync('src/routes/contact.tsx', code);
}
