import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { AliucordLogo } from "./AliucordLogo";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Github, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4 h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <AliucordLogo className="w-9 h-9 text-primary group-hover:scale-110 transition-transform" animated />
          <span className="font-bold text-2xl tracking-tight hidden sm:block">Aliucord</span>
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
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/10">
              <a href="https://github.com/Aliucord/Aliucord" target="_blank" rel="noreferrer">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button asChild className="rounded-full bg-primary text-primary-foreground hover:opacity-90 font-bold px-6 border-2 border-primary/20 shadow-lg shadow-primary/10">
              <a href="https://github.com/Aliucord/AliucordManager/releases/latest" target="_blank" rel="noreferrer">
                Manager
              </a>
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l-2 border-border p-6 rounded-l-3xl">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Navigation</SheetDescription>
              <div className="flex flex-col gap-6 mt-12">
                {NAV_LINKS.map((link) => (
                  link.href.startsWith('http') ? (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-xl font-bold hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.href} href={link.href} className="text-xl font-bold hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  )
                ))}
                <div className="h-0.5 bg-border my-4" />
                <Button asChild className="w-full rounded-full bg-primary py-6 text-lg font-bold">
                  <a href="https://github.com/Aliucord/AliucordManager/releases/latest" target="_blank" rel="noreferrer">
                    Download Manager
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}