const fs = require('fs');
let code = fs.readFileSync('src/routes/contact.tsx', 'utf-8');

// Fix the missing text in Link
code = code.replace(/<Link className=\"transition-colors hover:text-hero-foreground\" to=\"\/contact\" onClick=\{triggerGlitch\}><\/Link>/g, '<Link className=\"transition-colors hover:text-hero-foreground\" to=\"/contact\" onClick={triggerGlitch}>????? ????</Link>');

// Fix the missing text in the first link
code = code.replace(/<Link className=\"transition-colors hover:text-hero-foreground\" to=\"\/\" onClick=\{triggerGlitch\}>.*?<\/a>/g, '<Link className=\"transition-colors hover:text-hero-foreground\" to=\"/\" onClick={triggerGlitch}>????????</Link>');

// Remove cyber threat counter
code = code.replace(/\{\/\* Idea 6: Cyber Threat Counter \*\/\}[\s\S]*?<\/div>/, '');

// Remove Phone Number
code = code.replace(/<a href=\"tel:0788757801\"[\s\S]*?<\/a>/, '');

// Remove ActionLink
code = code.replace(/<ActionLink href=\"#packages\"[\s\S]*?<\/ActionLink>/, '');

fs.writeFileSync('src/routes/contact.tsx', code);
