import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Book } from "lucide-react";
import { AliucordLogo } from "./AliucordLogo";

export function Hero() {
  return (
    <section className="relative pt-36 pb-24 md:pt-56 md:pb-40 overflow-hidden">
      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8"
        >
          <AliucordLogo className="w-64 h-64 md:w-96 md:h-96 text-primary" animated />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]"
        >
          Aliucord
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-14 font-medium leading-snug"
        >
          A customizable Discord client for Android
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button size="lg" asChild className="h-16 px-12 text-xl rounded-full bg-primary text-primary-foreground hover:opacity-90 shadow-2xl shadow-primary/20 transition-all font-black border-4 border-primary/10 active:scale-95">
            <a href="https://github.com/Aliucord/AliucordManager/releases/latest" target="_blank" rel="noreferrer">
              <Download className="mr-3 w-6 h-6" />
              Install Manager
            </a>
          </Button>
          <Button size="lg" asChild className="h-16 px-12 text-xl rounded-full bg-secondary text-secondary-foreground hover:opacity-90 shadow-2xl shadow-secondary/20 transition-all font-black border-4 border-secondary/10 active:scale-95">
            <a href="https://github.com/Aliucord/Aliucord#-installation" target="_blank" rel="noreferrer">
              <Book className="mr-3 w-6 h-6" />
              Guide
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}