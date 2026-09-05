const fs = require('fs');
let code = fs.readFileSync('src/routes/index.tsx', 'utf-8');

// 1. Intent-Based Greeting
const intentGreeting = `
    const [greeting, setGreeting] = useState("مرحباً بك في");
    useEffect(() => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setGreeting("صباح الخير، هل تؤمن منزلك اليوم؟");
      else if (hour >= 12 && hour < 18) setGreeting("مساء الخير، نحن هنا لحمايتك");
      else setGreeting("مساء الخير، هل تبحث عن الأمان الليلة؟");
    }, []);
`;
code = code.replace('function Index() {', 'function Index() {\n' + intentGreeting);
code = code.replace('<span className="block text-xl font-bold tracking-normal text-muted-foreground sm:text-2xl">', '<span className="block text-xl font-bold tracking-normal text-muted-foreground sm:text-2xl">\n{greeting}</span><span className="hidden">');
code = code.replace('OU+O,U.Oc O-U.O USOc O_UUSOc', 'أنظمة حماية ذكية'); // Fix encoding text

// 2. Scroll-Direction Hint
code = code.replace('const [fabText, setFabText] = useState("OO-O_O U.O1 OrO\\"USO");', 'const [fabText, setFabText] = useState("تحدث مع خبير");\n  const [isIdle, setIsIdle] = useState(false);\n  useEffect(() => {\n    let timeout = setTimeout(() => setIsIdle(true), 5000);\n    const reset = () => { setIsIdle(false); clearTimeout(timeout); timeout = setTimeout(() => setIsIdle(true), 5000); };\n    window.addEventListener("scroll", reset); window.addEventListener("mousemove", reset);\n    return () => { window.removeEventListener("scroll", reset); window.removeEventListener("mousemove", reset); clearTimeout(timeout); };\n  }, []);\n');

// 3. Add Scroll-Direction Hint to Hero (bottom of hero)
const scrollHint = `
        {isIdle && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="w-6 h-10 border-2 border-action rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-action rounded-full animate-bounce" />
            </div>
            <span className="text-[10px] font-bold text-action">اسحب للأسفل</span>
          </div>
        )}
`;
code = code.replace('</section>\n\n      {/* Camera Close-up Section */}', scrollHint + '\n      </section>\n\n      {/* Camera Close-up Section */}');


// 4. Testimonials Import and usage
if (!code.includes('import { Testimonials }')) {
    code = code.replace('import cameraCloseup from "../assets/camera-closeup.jpg";', 'import cameraCloseup from "../assets/camera-closeup.jpg";\nimport { Testimonials } from "../components/Testimonials";');
    code = code.replace('</section>\n\n      {/* Bottom Nav / FABs */}', '</section>\n\n      <Testimonials />\n\n      {/* Bottom Nav / FABs */}');
}

fs.writeFileSync('src/routes/index.tsx', code);
console.log('Index features part 1 applied.');
