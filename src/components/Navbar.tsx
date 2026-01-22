import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { AliucordLogo } from "./AliucordLogo";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";

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

const getIconForLabel = (label: string) => {
  switch (label.toLowerCase()) {
    case 'home': return <MaterialIcon name="home" size={20} />;
    case 'plugins': return <MaterialIcon name="extension" size={20} />;
    case 'themes': return <MaterialIcon name="palette" size={20} />;
    case 'faq': return <MaterialIcon name="help" size={20} />;
    case 'documentation': return <MaterialIcon name="book" size={20} />;
    case 'about': return <MaterialIcon name="info" size={20} />;
    default: return null;
  }
};

const getMobileIconForLabel = (label: string) => {
  switch (label.toLowerCase()) {
    case 'home': return <MaterialIcon name="home" size={28} />;
    case 'plugins': return <MaterialIcon name="extension" size={28} />;
    case 'themes': return <MaterialIcon name="palette" size={28} />;
    case 'faq': return <MaterialIcon name="help" size={28} />;
    case 'documentation': return <MaterialIcon name="book" size={28} />;
    case 'about': return <MaterialIcon name="info" size={28} />;
    default: return null;
  }
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 w-full z-50 border-none bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <AliucordLogo className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" animated />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            link.href.startsWith('http') ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                {getIconForLabel(link.label)}
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold transition-colors flex items-center gap-2 ${location === link.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                {getIconForLabel(link.label)}
                {link.label}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full w-12 h-12 hover:bg-accent/10">
                <MaterialIcon name="menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-none p-6 rounded-none bg-background/95 w-[280px] duration-100">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Navigation</SheetDescription>
              <div className="flex flex-col gap-6 mt-12">
                {NAV_LINKS.map((link) => (
                  link.href.startsWith('http') ? (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-3">
                      {getMobileIconForLabel(link.label)}
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.href} href={link.href} className={`text-lg font-medium transition-colors flex items-center gap-3 ${location === link.href ? 'text-primary' : 'hover:text-primary'}`}>
                      {getMobileIconForLabel(link.label)}
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
