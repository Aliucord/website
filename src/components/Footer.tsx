import { Link } from "wouter";
import { AliucordLogo } from "./AliucordLogo";
import { Github, Twitter, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent py-24 px-4 overflow-hidden relative flex flex-col items-start w-full">
      <m3e-divider />
      <div className="w-full">
        <div className="max-w-5xl mx-auto flex flex-col justify-center" style={{ minHeight: '180px' }}>
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8" style={{ minHeight: '120px' }}>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Link href="/" className="flex items-center gap-4 mb-6 group w-fit mx-auto md:mx-0">
                <AliucordLogo className="w-12 h-12 text-primary group-hover:rotate-12 transition-transform duration-300" animated />
                <span className="font-normal text-3xl tracking-tighter" style={{ fontSize: '2rem', fontFamily: 'Roboto, ui-sans-serif, system-ui' }}>Aliucord</span>
              </Link>
              <p className="text-base text-muted-foreground max-w-sm font-medium leading-relaxed" style={{ fontSize: '1rem', fontFamily: 'Roboto, ui-sans-serif, system-ui' }}>
                A mod for the legacy Discord Android App
              </p>
            </div>
            <m3e-button-group aria-label="Footer links" size="medium" variant="connected">
              <a href="https://github.com/Aliucord/documentation" target="_blank" rel="noreferrer" style={{ display: 'contents' }}>
                <m3e-button variant="tonal" style={{ fontFamily: 'Roboto, ui-sans-serif, system-ui', fontSize: '1rem', minWidth: 0 }}>
                  Documentation
                </m3e-button>
              </a>
              <a href="https://github.com/Aliucord/Aliucord" target="_blank" rel="noreferrer" style={{ display: 'contents' }}>
                <m3e-button variant="tonal" style={{ fontFamily: 'Roboto, ui-sans-serif, system-ui', fontSize: '1rem', minWidth: 0, marginLeft: '0.5rem' }}>
                  GitHub
                </m3e-button>
              </a>
              <a href="https://discord.gg/EsNDvBaHVU" target="_blank" rel="noreferrer" style={{ display: 'contents' }}>
                <m3e-button variant="tonal" style={{ fontFamily: 'Roboto, ui-sans-serif, system-ui', fontSize: '1rem', minWidth: 0, marginLeft: '0.5rem' }}>
                  Support Server
                </m3e-button>
              </a>
            </m3e-button-group>
          </div>
        </div>
        <div className="pt-12 w-full">
          <m3e-divider />
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 w-full min-h-[3.5rem]">
            <p className="text-muted-foreground font-normal text-center w-full md:w-auto" style={{ lineHeight: '2.25rem', margin: 0 }}>
              &copy; {currentYear} Aliucord Contributors. Not affiliated with Discord Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
