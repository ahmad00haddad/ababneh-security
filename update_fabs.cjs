const fs = require('fs');

function updateFile(file) {
  let code = fs.readFileSync(file, 'utf-8');

  // Add state if not exists
  if (!code.includes('fabVisible')) {
    code = code.replace(/const \[fabText, setFabText\] = useState\("???? ?? ????"\);/, 'const [fabText, setFabText] = useState("???? ?? ????");\n  const [fabVisible, setFabVisible] = useState(true);');
    // For contact.tsx if it doesn't have fabText state (wait, I duplicated index, so it should have it).
  }

  // Wrap FABs
  const fabStartStr = '<div className="fixed bottom-24 right-5 z-50 sm:bottom-7 sm:right-7 flex flex-col gap-3 items-end">';
  
  if (code.includes(fabStartStr) && !code.includes('fabVisible && (')) {
    const replacement = '      {fabVisible && (\n' +
      '        <div className="fixed bottom-24 right-5 z-50 sm:bottom-7 sm:right-7 flex flex-col gap-3 items-end animate-in fade-in slide-in-from-bottom-5">\n' +
      '          <button onClick={() => setFabVisible(false)} aria-label="????? ???????" className="grid size-6 place-items-center rounded-full bg-background/80 border border-border text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-background hover:text-foreground">\n' +
      '            <X className="size-3" />\n' +
      '          </button>';
      
    code = code.replace(fabStartStr, replacement);
    
    // Close the condition block at the end of FABs
    // The FAB div ends right before the Mobile Bottom App Bar or </main>
    const navStart = '{/* Mobile Bottom App Bar */}';
    if (code.includes(navStart)) {
      code = code.replace(navStart, '      )}\n\n      ' + navStart);
    }
  }

  // If it's contact.tsx, we also remove the contact form
  if (file.includes('contact.tsx')) {
    const formStart = code.indexOf('<section id=\"contact-form\"');
    if (formStart > -1) {
      // Find the end of the section by looking for the footer
      const footerStart = code.indexOf('<footer id=\"contact\"');
      if (footerStart > -1) {
        const before = code.substring(0, formStart);
        const after = code.substring(footerStart);
        code = before + after;
      }
    }
  }

  fs.writeFileSync(file, code);
}

updateFile('src/routes/index.tsx');
updateFile('src/routes/contact.tsx');
console.log('Updated FABs and removed contact form');
