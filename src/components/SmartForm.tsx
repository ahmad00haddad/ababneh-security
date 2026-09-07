import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

export function SmartForm() {
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [shake, setShake] = useState(false);

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 0 && !val.startsWith("0")) {
      if (val.startsWith("7")) val = "0" + val;
      else val = "07" + val;
    }
    // Format: 07X XXXX XXXX
    if (val.length > 3) val = val.slice(0, 3) + " " + val.slice(3);
    if (val.length > 8) val = val.slice(0, 8) + " " + val.slice(8);
    setPhone(val.slice(0, 13));
    if (val.length === 13) setPhoneErr("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 13) {
      setPhoneErr("يرجى إدخال رقم هاتف صحيح");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      onSubmit={submit} 
      className="flex flex-col gap-8 bg-surface p-8 rounded-2xl border border-border relative overflow-hidden shadow-xl"
    >
      <div className="text-center">
        <h3 className="text-2xl font-black font-display mb-2">أو اترك رقمك لنتصل بك</h3>
        <p className="text-sm text-muted-foreground">سيصلك عرض السعر خلال 24 ساعة.</p>
      </div>
      
      {/* Floating Label Input */}
      <div className="relative">
        <motion.div animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
          <input 
            id="phone" 
            type="tel" 
            dir="ltr" 
            value={phone} 
            onChange={handlePhone} 
            placeholder=" " 
            className={`peer w-full bg-background border-2 rounded-xl px-4 pt-6 pb-2 text-left font-bold tracking-wider focus:outline-none focus:ring-0 transition-all ${
              phoneErr ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : 
              phone.length === 13 ? "border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.2)]" : 
              "border-border focus:border-action focus:shadow-[0_0_15px_rgba(var(--action),0.3)]"
            }`} 
          />
          <label 
            htmlFor="phone" 
            className="absolute right-4 top-4 text-sm text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-action"
          >
            رقم الهاتف (07X XXXX XXXX)
          </label>
          
          <AnimatePresence>
            {phone.length === 13 && (
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute left-4 top-4">
                <Check className="text-green-500 size-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {phoneErr && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-500 text-xs mt-2 absolute -bottom-6 right-0 font-bold">
              {phoneErr}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button disabled={status !== "idle"} className="relative h-14 overflow-hidden bg-action text-white font-bold rounded-xl flex items-center justify-center transition-all hover:bg-action/90 disabled:opacity-90 shadow-lg hover:shadow-action/30 hover:-translate-y-0.5 mt-2">
        <AnimatePresence mode="wait">
          {status === "idle" && <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>طلب تسعيرة</motion.span>}
          {status === "loading" && <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Loader2 className="animate-spin size-6" /></motion.div>}
          {status === "success" && <motion.span key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2"><Check className="size-6" /> تم استلام طلبك بنجاح</motion.span>}
        </AnimatePresence>
      </button>

      <p className="text-[10px] text-center text-muted-foreground font-semibold flex items-center justify-center gap-1">
        <Check className="size-3 text-green-500" /> رقمك مشفر تماماً ولا يُستخدم للتسويق المزعج.
      </p>
    </motion.form>
  );
}
