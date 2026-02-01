import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AliucordLogo } from "./AliucordLogo";

const MaterialIcon = ({ name, size = 24, className = "" }: { name: string, size?: number, className?: string }) => (
  <span 
    className={`material-symbols-rounded ${className}`} 
    style={{ 
      fontSize: size, 
      fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
      userSelect: 'none'
    }}
  >
    {name}
  </span>
);

export function Hero() {
  return (
    <section className="relative pt-24 pb-24 md:pt-40 md:pb-40 overflow-hidden">
      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-6 md:mb-8"
        >
          <AliucordLogo className="w-48 h-48 md:w-64 md:h-64" animated />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-7xl font-bold tracking-tighter mb-2 leading-[0.9]"
        >
          Aliucord
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto mb-8 font-medium leading-snug"
        >
          A mod for the legacy Discord Android App
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button size="lg" asChild className="h-16 px-10 text-lg rounded-full" style={{ backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
            <a href="https://github.com/Aliucord/AliucordManager/releases/latest" target="_blank" rel="noreferrer">
              <MaterialIcon name="download" size={24} className="mr-3" />
              Download Manager
            </a>
          </Button>
          <Button size="lg" asChild className="h-16 px-10 text-lg rounded-full" style={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))' }}>
            <a href="https://github.com/Aliucord/Aliucord#-installation" target="_blank" rel="noreferrer">
              <MaterialIcon name="book" size={24} className="mr-3" />
              Guide
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
