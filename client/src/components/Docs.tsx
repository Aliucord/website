import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import DocsSidebar from "./DocsSidebar";
import { PLUGIN_DOCS, THEME_DOCS, GENERAL_DOCS } from "../lib/docs";

export default function Docs() {
  const [activeTab, setActiveTab] = useState<"plugins" | "themes" | "general">("plugins");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    if (section === "backports") {
      setActiveTab("general");
      
      const scrollToSection = () => {
        const element = document.getElementById("backports-section");
        if (element) {
          const yOffset = -120;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
          return true;
        }
        return false;
      };

      // Try with a slight delay to ensure tab switching has started
      setTimeout(() => {
        if (!scrollToSection()) {
          const interval = setInterval(() => {
            if (scrollToSection()) clearInterval(interval);
          }, 100);
          setTimeout(() => clearInterval(interval), 3000);
        }
      }, 100);
    }
  }, []);

  const docSections = activeTab === "plugins" ? PLUGIN_DOCS : activeTab === "themes" ? THEME_DOCS : GENERAL_DOCS;
  const title = activeTab === "plugins" ? "Plugin Development" : activeTab === "themes" ? "Theme Development" : "General Documentation";
  const description = activeTab === "plugins"
    ? "Learn how to develop plugins for Aliucord with our comprehensive guides covering everything from prerequisites to reflection."
    : activeTab === "themes"
      ? "Create beautiful themes for Aliucord. Customize every color and element of the Discord UI."
      : "General guides, interface information, backports, and changelogs.";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <section className="py-24 px-6 relative z-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg p-1 bg-card/80 backdrop-blur-md border border-border">
              <button
                onClick={() => setActiveTab("plugins")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "plugins"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Plugins
              </button>
              <button
                onClick={() => setActiveTab("themes")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "themes"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Themes
              </button>
              <button
                onClick={() => setActiveTab("general")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "general"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Guides
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {docSections.map((section, index) => (
              <motion.div
                key={`${activeTab}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                id={`doc-section-${index}`}
                className="rounded-lg p-8 scroll-mt-24 border border-border bg-card shadow-sm overflow-x-auto"
              >
                {index === 0 && (
                  <div className="mb-12 border-b border-border pb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tighter text-glow">
                      {title}
                    </h1>
                  </div>
                )}
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  {section.title}
                </h2>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-3xl font-bold mt-6 mb-4 text-foreground" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-2xl font-bold mt-5 mb-3 text-foreground" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-xl font-bold mt-4 mb-2 text-foreground" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-3 leading-relaxed" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside mb-3 space-y-1" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-muted-foreground" {...props} />
                      ),
                      code: ({ node, inline, ...props }: any) =>
                        inline ? (
                          <code className="bg-secondary/50 border border-border rounded px-2 py-1 font-mono text-sm text-primary dark:text-emerald-400" {...props} />
                        ) : (
                          <code className="font-mono text-sm text-primary dark:text-emerald-400 block whitespace-pre-wrap" {...props} />
                        ),
                      pre: ({ node, ...props }) => (
                        <pre className="bg-black/40 border border-border rounded p-4 overflow-x-auto mb-3 text-primary dark:text-emerald-400 whitespace-pre-wrap font-mono" {...props} />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-primary pl-4 italic my-3 text-muted-foreground" {...props} />
                      ),
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto mb-3">
                          <table className="min-w-full border-collapse border border-border" {...props} />
                        </div>
                      ),
                      thead: ({ node, ...props }) => (
                        <thead {...props} />
                      ),
                      tbody: ({ node, ...props }) => (
                        <tbody {...props} />
                      ),
                      tr: ({ node, ...props }) => (
                        <tr className="border border-border" {...props} />
                      ),
                      th: ({ node, ...props }) => (
                        <th className="border border-border bg-secondary/50 px-4 py-2 text-left font-bold text-foreground" {...props} />
                      ),
                      td:({ node, ...props }) => (
                        <td className="border border-border px-4 py-2 text-muted-foreground min-w-[150px]" {...props} />
                      ),
                    }}
                  >
                    {section.content}
                  </ReactMarkdown>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DocsSidebar sections={docSections} activeTab={activeTab} />
    </div>
  );
}
