import { Link } from "wouter";
import { AliucordLogo } from "./AliucordLogo";
import { Github, Twitter, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent border-t-2 border-border py-24 px-4 overflow-hidden relative flex flex-col items-center">
      <div className="container relative z-10 max-w-5xl flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16 text-center md:text-left justify-items-center md:justify-items-start w-full">
          <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-4 mb-8 group w-fit">
              <AliucordLogo className="w-12 h-12 text-primary group-hover:rotate-12 transition-transform duration-300" animated />
              <span className="font-black text-3xl tracking-tighter">Aliucord</span>
            </Link>
            <p className="text-xl text-muted-foreground max-w-sm font-medium leading-relaxed">
              A customizable Discord client for Android
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-black text-sm tracking-widest mb-8 text-primary/80">Resources</h4>
            <ul className="space-y-4 text-center md:text-left">
              <li>
                <a href="https://github.com/Aliucord/documentation" target="_blank" rel="noreferrer" className="text-lg font-bold text-muted-foreground hover:text-primary transition-colors">Documentation</a>
              </li>
              <li>
                <a href="https://github.com/Aliucord/Aliucord" target="_blank" rel="noreferrer" className="text-lg font-bold text-muted-foreground hover:text-primary transition-colors">GitHub</a>
              </li>
              <li>
                <Link href="/faq" className="text-lg font-bold text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t-2 border-border flex flex-col md:flex-row justify-between items-center gap-6 w-full">
          <p className="text-muted-foreground font-bold italic">
            &copy; {currentYear} Aliucord. Not affiliated with Discord Inc.
          </p>
          <div className="flex gap-8 text-sm font-black tracking-widest text-muted-foreground">
            <a href="https://discord.gg/EsNDvBaHVU" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Support Server</a>
          </div>
        </div>
      </div>
    </footer>
  );
}