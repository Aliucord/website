import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const THEME_PREVIEWS = [
  { src: "/previews/preview1.png", name: "Theme Preview 1" },
  { src: "/previews/preview2.png", name: "Theme Preview 2" },
  { src: "/previews/preview3.png", name: "Theme Preview 3" },
  { src: "/previews/preview4.png", name: "Theme Preview 4" },
  { src: "/previews/preview5.png", name: "Theme Preview 5" },
];

export function ThemePreviewCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const syncState = () => {
      setCurrent(api.selectedScrollSnap());
      setCount(api.scrollSnapList().length);
    };

    syncState();
    api.on("select", syncState);
    api.on("reInit", syncState);

    return () => {
      api.off("select", syncState);
      api.off("reInit", syncState);
    };
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = window.setInterval(() => {
      api.scrollNext();
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, [api]);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-20 pointer-events-none" />
      <div className="container relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Themes</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="px-10 md:px-14"
        >
          <div className="relative flex items-center w-full">
            <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
              <CarouselPrevious className="-left-6 md:-left-10 absolute z-10 bg-card/90 border-border hover:bg-card" />
              <CarouselContent>
                {THEME_PREVIEWS.map((preview) => (
                  <CarouselItem key={preview.src} className="basis-full">
                    <img
                      src={preview.src}
                      alt={preview.name}
                      loading="lazy"
                      className="w-full h-auto max-h-[60vh] md:max-h-[70vh] object-cover object-center transition-transform duration-500 hover:scale-[1.01]"
                      style={{ display: 'block', borderRadius: 0, margin: 0, padding: 0 }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="-right-6 md:-right-10 absolute z-10 bg-card/90 border-border hover:bg-card" />
            </Carousel>
          </div>

          {count > 0 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to preview ${index + 1}`}
                  onClick={() => api?.scrollTo(index)}
                  className={
                    index === current
                      ? "h-2.5 w-7 rounded-full bg-primary transition-all"
                      : "h-2.5 w-2.5 rounded-full bg-muted-foreground/50 hover:bg-muted-foreground/70 transition-all"
                  }
                />
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-10"
        >
          <Link href="/themes">
            <span className="material-button inline-flex items-center gap-2 cursor-pointer">
              Explore all themes
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}