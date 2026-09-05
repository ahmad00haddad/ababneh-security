const fs = require('fs');

// Contact.tsx Fix
let contactCode = fs.readFileSync('src/routes/contact.tsx', 'utf-8');

const peakTimeHook = `    // Check Peak Time (Outside 9 AM - 7 PM)
    useEffect(() => {
      const hour = new Date().getHours();
      if (hour < 9 || hour >= 19) {
        setPeakTimeNudge("نحن خارج أوقات الدوام، لكن اترك رسالتك وسنرد فوراً في الصباح!");
      }
    }, []);

    // Smart PWA Prompt based on visits
    useEffect(() => {
      const visits = parseInt(localStorage.getItem("visitCount") || "0");
      if (visits > 0) {
        setPwaHint(true);
      }
      localStorage.setItem("visitCount", (visits + 1).toString());
    }, []);`;

contactCode = contactCode.replace(/    \/\/ Check Peak Time[\s\S]*?localStorage\.setItem.*?\n    \}, \[\]\);\n/, '');

if (!contactCode.includes('// Check Peak Time (Outside 9 AM - 7 PM)')) {
    contactCode = contactCode.replace(
      'function Contact() {',
      'function Contact() {\n' + peakTimeHook
    );
}

fs.writeFileSync('src/routes/contact.tsx', contactCode);

// Index.tsx Fix
let indexCode = fs.readFileSync('src/routes/index.tsx', 'utf-8');

const indexHooks = `    // Live Security Counter
    useEffect(() => {
      const interval = setInterval(() => {
        setLiveProjects(p => p + Math.floor(Math.random() * 2));
      }, 8000);
      return () => clearInterval(interval);
    }, []);

    // Location-Aware Nudge
    useEffect(() => {
      setTimeout(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((pos) => {
             setLocationNudge("أنت قريب من فرعنا في إربد، شرفنا لزيارة المعرض!");
          }, () => {}, { timeout: 5000 });
        }
      }, 4000);
    }, []);

    // Calculator Hesitation
    useEffect(() => {
      const timer = setTimeout(() => {
        setCalcHesitation(true);
      }, 30000);
      return () => clearTimeout(timer);
    }, []);`;

indexCode = indexCode.replace(/    \/\/ Live Security Counter[\s\S]*?setCalcHesitation\(true\);\n      \}, 30000\);\n      return \(\) => clearTimeout\(timer\);\n    \}, \[\]\);\n/, '');

if (!indexCode.includes('// Location-Aware Nudge')) {
    indexCode = indexCode.replace(
      'function Index() {',
      'function Index() {\n' + indexHooks
    );
}

fs.writeFileSync('src/routes/index.tsx', indexCode);
console.log('Hooks relocated to correct scope.');
