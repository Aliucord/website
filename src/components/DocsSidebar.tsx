import React, { useState, useEffect, useCallback } from "react";
import { Menu, X, Search, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DocsSidebarProps {
  sections: Array<{ title: string }>;
  activeTab: "plugins" | "themes" | "general";
  setActiveTab: (tab: "plugins" | "themes" | "general") => void;
}

export default function DocsSidebar({ sections, activeTab, setActiveTab }: DocsSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [matches, setMatches] = useState<Range[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  const clearHighlights = useCallback(() => {
    const highlights = document.querySelectorAll("mark.search-highlight");
    highlights.forEach((el) => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ""), el);
        parent.normalize();
      }
    });
  }, []);

  const highlightMatches = useCallback((query: string) => {
    clearHighlights();

    if (!query.trim()) {
      setMatches([]);
      setCurrentMatchIndex(0);
      return;
    }

    const contentArea = document.querySelector("section");
    if (!contentArea) return;

    const treeWalker = document.createTreeWalker(
      contentArea,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (parent?.tagName === "SCRIPT" || parent?.tagName === "STYLE" || parent?.tagName === "MARK") {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes: Text[] = [];
    let node;
    while ((node = treeWalker.nextNode())) {
      textNodes.push(node as Text);
    }

    const foundRanges: Range[] = [];
    const lowerQuery = query.toLowerCase();

    textNodes.forEach((textNode) => {
      const text = textNode.textContent || "";
      const lowerText = text.toLowerCase();
      let startIndex = 0;
      let index;

      while ((index = lowerText.indexOf(lowerQuery, startIndex)) !== -1) {
        const range = document.createRange();
        range.setStart(textNode, index);
        range.setEnd(textNode, index + query.length);
        foundRanges.push(range);
        startIndex = index + 1;
      }
    });

    foundRanges.forEach((range, idx) => {
      const mark = document.createElement("mark");
      mark.className = "search-highlight";
      mark.style.backgroundColor = idx === 0 ? "#22c55e" : "#86efac";
      mark.style.color = "#000";
      mark.style.padding = "0 2px";
      mark.style.borderRadius = "2px";
      try {
        range.surroundContents(mark);
      } catch (e) {
      }
    });

    setMatches(foundRanges);
    setCurrentMatchIndex(0);

    if (foundRanges.length > 0) {
      const firstHighlight = document.querySelector("mark.search-highlight");
      if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [clearHighlights]);

  const navigateMatch = useCallback((direction: "next" | "prev") => {
    const highlights = document.querySelectorAll("mark.search-highlight");
    if (highlights.length === 0) return;

    highlights.forEach((el) => {
      (el as HTMLElement).style.backgroundColor = "#86efac";
    });

    let newIndex;
    if (direction === "next") {
      newIndex = (currentMatchIndex + 1) % highlights.length;
    } else {
      newIndex = (currentMatchIndex - 1 + highlights.length) % highlights.length;
    }

    setCurrentMatchIndex(newIndex);
    const currentHighlight = highlights[newIndex] as HTMLElement;
    currentHighlight.style.backgroundColor = "#22c55e";
    currentHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentMatchIndex]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      highlightMatches(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, highlightMatches]);

  useEffect(() => {
    if (!isOpen) {
      clearHighlights();
      setSearchQuery("");
      setMatches([]);
      setCurrentMatchIndex(0);
    }
  }, [isOpen, clearHighlights]);

  useEffect(() => {
    setIsOpen(false);
  }, [activeTab]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigateMatch(e.shiftKey ? "prev" : "next");
    }
  };

  const handleNavigate = (index: number, title: string) => {
    const sectionId = title.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${sectionId}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-4 sm:right-8 z-[9999]">
      <div className="flex flex-col items-end gap-2">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-2xl min-w-[220px] max-w-[280px] sm:max-w-xs border-none"
              style={{ backgroundColor: 'var(--md-surface-container, hsl(var(--card)))' }}
            >
              <div className="p-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 px-3 mb-2">Sections</h3>
                <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {sections.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigate(index, section.title)}
                      className="w-full text-left px-4 py-2 rounded-lg transition-colors text-sm hover:bg-accent/10 text-muted-foreground hover:text-foreground truncate"
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center rounded-lg px-3 py-2 gap-2 border-none" style={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))' }}>
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Find in page..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent outline-none text-sm w-28 sm:w-40 text-foreground placeholder:text-muted-foreground"
                  />
                  {matches.length > 0 && (
                    <>
                      <span className="text-xs whitespace-nowrap text-muted-foreground">
                        {currentMatchIndex + 1}/{matches.length}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => navigateMatch("prev")}
                          className="p-1 rounded hover:bg-secondary"
                          aria-label="Previous match"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigateMatch("next")}
                          className="p-1 rounded hover:bg-secondary"
                          aria-label="Next match"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 rounded-lg flex items-center justify-center shadow-lg transition-colors border-none text-foreground"
            style={{ backgroundColor: 'var(--md-surface-container, hsl(var(--card)))' }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
