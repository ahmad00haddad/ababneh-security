const fs = require('fs');
let code = fs.readFileSync('src/routes/__root.tsx', 'utf-8');

if (!code.includes('GlobalUX')) {
  code = code.replace('import { Outlet, createRootRoute } from "@tanstack/react-router";', 'import { Outlet, createRootRoute } from "@tanstack/react-router";\nimport { GlobalUX } from "../components/GlobalUX";');
  code = code.replace('<Outlet />', '<GlobalUX />\n        <Outlet />');
  fs.writeFileSync('src/routes/__root.tsx', code);
}
console.log('Root updated with GlobalUX');
