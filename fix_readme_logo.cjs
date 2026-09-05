const fs = require('fs');
let code = fs.readFileSync('README.md', 'utf-8');
code = code.replace('src="public/favicon.svg"', 'src="public/logo.png"');
fs.writeFileSync('README.md', code);
