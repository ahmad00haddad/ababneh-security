const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');

// The location block looks like this:
/*
    // Location-Aware Nudge
    useEffect(() => {
      setTimeout(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((pos) => {
             setLocationNudge("...");
          }, () => {}, { timeout: 5000 });
        }
      }, 4000);
    }, []);
*/

// I'll replace it with empty string
code = code.replace(/^[ \t]*\/\/ Location-Aware Nudge\s*useEffect\(\(\) => \{\s*setTimeout\(\(\) => \{\s*if \("geolocation" in navigator\) \{\s*navigator\.geolocation\.getCurrentPosition\(\(pos\) => \{\s*setLocationNudge\(.*?\);\s*\}, \(\) => \{\}, \{ timeout: 5000 \}\);\s*\}\s*\}, 4000\);\s*\}, \[\]\);/gm, '');

fs.writeFileSync('src/routes/index.tsx', code);
