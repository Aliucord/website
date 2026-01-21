import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { AliucordLogo } from "./AliucordLogo";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Github, Menu, Info } from "lucide-react";
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
          <Link href="/about">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Info className="w-5 h-5" />
            </Button>
          </Link>
          <ThemeToggle />
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}