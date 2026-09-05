const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');

const newBlock = `    const [greeting, setGreeting] = useState("مرحباً بك في");
    useEffect(() => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreeting("صباح الخير، هل تؤمن منزلك اليوم؟");
      else if (hour >= 12 && hour < 18) setGreeting("مساء الخير، نحن هنا لحمايتك");
      else setGreeting("مساء الخير، هل تبحث عن الأمان الليلة؟");
    }, []);`;

code = code.replace(/const \[greeting, setGreeting\] = useState[\s\S]*?\}, \[\]\);/, newBlock);

// Fix corrupted Arabic in h1 by simply re-building the H1 blocks.
// Find the H1s and replace their text spans
code = code.replace(/<span className="text-action">U,OU.O U\+ O1O OU,OU U\^O1U.U,U<\/span>/g, '<span className="text-action">لأمان عائلتك وعملك</span>');
code = code.replace(/OU\+O,U.Oc OU.O USOc U.OOU\^OOc/g, 'أنظمة حماية متطورة');

fs.writeFileSync('src/routes/index.tsx', code);
