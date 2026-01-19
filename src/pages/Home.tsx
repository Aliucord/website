import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Footer } from "@/components/Footer";
import { STATS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-foreground selection:bg-primary/30 overflow-x-hidden flex flex-col items-center">
      <div className="w-full max-w-7xl">
        <Hero />
        
        {/* Stats Section */}
        <section className="py-24 border-y-2 border-border bg-transparent relative overflow-hidden">
          <div className="grid-bg absolute inset-0 opacity-20" />
          <div className="container px-4 relative z-10 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-6xl font-black text-primary mb-2 tracking-tighter">{stat.value}</div>
                  <div className="text-sm md:text-base font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FeatureGrid />
        
        {/* Discord Server Banner Section */}
        <section className="py-24 px-4 relative overflow-hidden bg-transparent">
          <div className="container relative z-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden border-2 border-border shadow-2xl shadow-primary/20"
            >
              <a href="https://discord.gg/EsNDvBaHVU" target="_blank" rel="noreferrer" className="block hover:opacity-90 transition-opacity duration-300">
                <img 
                  src="/discord-banner.webp" 
                  alt="Aliucord Discord Server Banner" 
                  className="w-full h-auto object-cover"
                />
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}