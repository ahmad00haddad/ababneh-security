import { useState, useEffect } from "react";
import { ScanSearch } from "lucide-react";

export function GlobalUX() {
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Radar loader
    const t = setTimeout(() => setLoading(false), 1200);
    
    // Flashlight cursor
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Scroll progression
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* 1. Radar Loader */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl transition-opacity duration-500">
          <div className="relative flex size-24 items-center justify-center rounded-full border border-action/30 bg-action/5 shadow-[0_0_40px_rgba(183,37,52,0.2)]">
            <div className="absolute inset-0 rounded-full border border-action/50 animate-ping opacity-50" />
            <ScanSearch className="size-10 text-action animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-action/20 to-transparent animate-spin" style={{ animationDuration: '2s' }} />
          </div>
          <p className="mt-4 font-mono text-xs font-bold tracking-widest text-action animate-pulse">يتم تأمين الاتصال...</p>
        </div>
      )}

      {/* 2. Flashlight Cursor */}
      <div 
        className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.03), transparent 40%)`
        }}
      />

      {/* 3. Scroll Progression Hint */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[9998] bg-background">
        <div 
          className="h-full bg-action transition-all duration-150 ease-out shadow-[0_0_10px_rgba(183,37,52,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </>
  );
}
