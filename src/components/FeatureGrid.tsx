import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { Link } from "wouter";

export function FeatureGrid() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="container px-4 relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Endless customization</h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">
            Choose from our huge list of plugins and themes to make Discord truly yours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div className="material-card group h-full transition-all duration-500 hover:bg-accent/5">
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3">
                    {feature.title}
                  </h3>
                  <div className="text-lg leading-relaxed font-medium opacity-80 text-muted-foreground">
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => (
                          <Link href={props.href || "#"}>
                            <span className="text-primary hover:underline font-bold cursor-pointer" {...props} />
                          </Link>
                        ),
                        p: ({ node, ...props }) => <span {...props} />,
                      }}
                    >
                      {feature.description}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}