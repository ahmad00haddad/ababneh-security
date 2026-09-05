import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Star, MessageCircle, Clock, ShieldCheck, MapPin } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "م. طارق العبدالله",
    location: "إربد - الحي الجنوبي",
    date: "مركب منذ سنتين",
    text: "نظام ممتاز جداً وتجاوب سريع من الفريق، تم التركيب في فيلتي الخاصة. واجهتني مشكلة صغيرة بعد سنة وتم حلها بسرعة. الكاميرات تعمل بكفاءة 100% حتى اليوم في أصعب الظروف الجوية.",
    rating: 5,
    highlight: "تجاوب سريع",
    highlightTooltip: "متوسط سرعة استجابتنا للعملاء هو 15 دقيقة فقط!"
  },
  {
    id: 2,
    name: "مؤسسة الرؤية",
    location: "إربد - المدينة الصناعية",
    date: "مركب منذ 8 أشهر",
    text: "ركبنا 16 كاميرا لمصنعنا. الدقة ليلاً ممتازة جداً وأفضل من المتوقع بسبب ميزة ColorVu. الفريق احترافي جداً والأسعار منافسة.",
    rating: 5,
    highlight: "الدقة ليلاً",
    highlightTooltip: "كاميراتنا مجهزة بعدسات F1.0 لالتقاط ضوء أكثر بـ 4 أضعاف في الظلام."
  },
  {
    id: 3,
    name: "د. خالد ربابعة",
    location: "إربد - بشرى",
    date: "مركب منذ 3 سنوات",
    text: "نظام الأمان أنقذني من سرقة محققة. الكاميرات واضحة والتطبيق على الجوال مريح جداً. أنصح بهم وبشدة لأي شخص يبحث عن راحة البال.",
    rating: 5,
    highlight: "سرقة محققة",
    highlightTooltip: "نظامنا يرسل إشعاراً فورياً لهاتفك عند اكتشاف أي حركة بشرية مريبة."
  }
];

export function Testimonials() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-surface px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-black text-foreground sm:text-4xl md:text-5xl"
          >
            آراء عملائنا <span className="text-action">وثقتهم</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
          >
            اسحب لليمين واليسار لقراءة تجارب حقيقية من عملائنا في إربد ومحيطها.
          </motion.p>
        </div>

        {/* Draggable Carousel */}
        <div className="relative">
          <motion.div 
            className="flex cursor-grab active:cursor-grabbing gap-6 pb-8"
            drag="x"
            dragConstraints={{ right: 0, left: -1000 }} // Will be calculated dynamically in real apps, but static is fine for 3 cards
            whileTap={{ scale: 0.98 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          >
            {testimonials.map((t, idx) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="min-w-[320px] max-w-[400px] shrink-0 rounded-2xl border border-border bg-background p-6 shadow-xl"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{t.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="size-3 text-action" />
                      {t.location}
                    </div>
                  </div>
                  {/* Verified Badge */}
                  <div className="group/badge relative">
                    <ShieldCheck className="size-5 text-emerald-500 cursor-help" />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-500 opacity-0 transition-opacity group-hover/badge:opacity-100 z-10 pointer-events-none">
                      تقييم حقيقي موثق
                    </div>
                  </div>
                </div>

                {/* Liquid Star Fill (Micro-interaction) */}
                <div className="flex items-center gap-1 mb-4 group/stars cursor-crosshair relative">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative size-4">
                      {/* Empty Star */}
                      <Star className="absolute inset-0 text-muted-foreground/30" />
                      {/* Filled Liquid Star */}
                      <motion.div 
                        className="absolute inset-0 overflow-hidden text-amber-500"
                        initial={{ height: 0 }}
                        whileHover={{ height: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Star className="fill-current" />
                      </motion.div>
                      {/* Initial Fill (Static) */}
                      <div className="absolute inset-0 text-amber-500 group-hover/stars:opacity-0 transition-opacity duration-300">
                        <Star className="fill-current" />
                      </div>
                    </div>
                  ))}
                  
                  {/* Time Ago Hint */}
                  <div className="ml-auto flex items-center gap-1 rounded bg-action/10 px-2 py-0.5 text-[10px] font-bold text-action">
                    <Clock className="size-3" />
                    {t.date}
                  </div>
                </div>

                {/* Card Expand Physics & Keyword Highlight */}
                <motion.div 
                  layout
                  className="relative cursor-pointer text-sm leading-relaxed text-muted-foreground"
                  onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}
                >
                  <motion.p layout className={`${expandedId === t.id ? "" : "line-clamp-3"}`}>
                    {/* Inject Highlight */}
                    {t.text.split(t.highlight).map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="group/keyword relative inline-block text-foreground font-bold border-b border-dashed border-action/50 hover:bg-action/10 transition-colors">
                            {t.highlight}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded bg-foreground text-background p-2 text-[10px] opacity-0 transition-opacity group-hover/keyword:opacity-100 z-10 pointer-events-none shadow-xl text-center after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-foreground">
                              {t.highlightTooltip}
                            </span>
                          </span>
                        )}
                      </span>
                    ))}
                  </motion.p>
                  
                  <AnimatePresence>
                    {expandedId !== t.id && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
