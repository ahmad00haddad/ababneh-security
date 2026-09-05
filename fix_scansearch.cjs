const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');
if (!code.includes('ScanSearch,')) {
  code = code.replace(/import {([^}]+)} from "lucide-react";/, 'import {$1, ScanSearch} from "lucide-react";');
  fs.writeFileSync('src/routes/index.tsx', code);
}
