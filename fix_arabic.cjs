const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');

code = code.replace(/setGreeting\(".*?"\)/g, (match) => {
    if (match.includes("O1U+ O")) return 'setGreeting("مساء الخير، هل تبحث عن الأمان الليلة؟")';
    if (match.includes("UU+O ")) return 'setGreeting("مساء الخير، نحن هنا لحمايتك")';
    if (match.includes("OO U.U+")) return 'setGreeting("صباح الخير، هل تؤمن منزلك اليوم؟")';
    return 'setGreeting("مرحباً بك في")';
});

// Also fix the corrupted h1 text
code = code.replace('OU+O,U.Oc OU.O USOc U.OOU^OOc', 'أنظمة حماية متطورة');
code = code.replace('U,OU.O U+ O1O OU,OU U^O1U.U,U', 'لأمان عائلتك وعملك');

fs.writeFileSync('src/routes/index.tsx', code);
console.log('Arabic fixed');
