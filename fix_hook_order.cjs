const fs = require('fs');

let code = fs.readFileSync('src/routes/contact.tsx', 'utf-8');
let peakHookMatch = code.match(/    \/\/ Check Peak Time[\s\S]*?localStorage\.setItem.*?\n    \}, \[\]\);\n/);
if (peakHookMatch) {
    code = code.replace(peakHookMatch[0], '');
    code = code.replace('const faqTimerRef = useRef<NodeJS.Timeout | null>(null);', 'const faqTimerRef = useRef<NodeJS.Timeout | null>(null);\n' + peakHookMatch[0]);
    fs.writeFileSync('src/routes/contact.tsx', code);
}

let indexCode = fs.readFileSync('src/routes/index.tsx', 'utf-8');
let indexHookMatch = indexCode.match(/    \/\/ Live Security Counter[\s\S]*?setCalcHesitation\(true\);\n      \}, 30000\);\n      return \(\) => clearTimeout\(timer\);\n    \}, \[\]\);\n/);
if (indexHookMatch) {
    indexCode = indexCode.replace(indexHookMatch[0], '');
    indexCode = indexCode.replace('const [hoveredHotspot, setHoveredHotspot] = useState("");', 'const [hoveredHotspot, setHoveredHotspot] = useState("");\n' + indexHookMatch[0]);
    fs.writeFileSync('src/routes/index.tsx', indexCode);
}
console.log("Fixed hook order.");
