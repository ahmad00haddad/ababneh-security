const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');
const start = code.indexOf('<<<<<<< HEAD');
const end = code.indexOf('>>>>>>> 2dfd09b', start);
const endLineIndex = code.indexOf('\n', end);
if (start > -1 && end > -1) {
    const conflictBlock = code.substring(start, endLineIndex + 1);
    code = code.replace(conflictBlock, '  ScanSearch,\n} from "lucide-react";\n');
    fs.writeFileSync('src/routes/index.tsx', code);
    console.log('Conflict fixed');
}
