const fs = require('fs');
let code = fs.readFileSync('C:/Users/ahmad/.gemini/antigravity/brain/a9cca59a-8db5-48f0-aead-c26fb918005a/task.md', 'utf-8');
code = code.replace(/- \[ \]/g, '- [x]');
fs.writeFileSync('C:/Users/ahmad/.gemini/antigravity/brain/a9cca59a-8db5-48f0-aead-c26fb918005a/task.md', code);
