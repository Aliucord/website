import { motion } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/constants";
import "@m3e/web/expansion-panel";

export default function FAQ() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-24 px-4">
      <div className="container max-w-5xl">
        <div className="text-center mb-16" style={{ marginTop: '3rem' }}>
          <h1 className="text-4xl font-medium mb-6 tracking-tighter" style={{ fontSize: '2.5rem', fontFamily: 'Roboto, ui-sans-serif, system-ui' }}>Frequently Asked Questions</h1>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4 justify-center">
          <m3e-accordion>
            {FAQ_ITEMS.map((item, index) => {
              // Only round the top of the first and bottom of the last panel
              let borderRadius = '0';
              if (index === 0 && index === FAQ_ITEMS.length - 1) {
                borderRadius = '2rem'; // Only one panel
              } else if (index === 0) {
                borderRadius = '2rem 2rem 0 0';
              } else if (index === FAQ_ITEMS.length - 1) {
                borderRadius = '0 0 2rem 2rem';
              }
              return (
                <m3e-expansion-panel
                  key={index}
                  style={{
                    borderRadius,
                    overflow: 'hidden',
                    '--m3e-expansion-panel-container-color': '#23232b',
                    color: 'var(--md-on-surface)'
                  }}
                >
                  <span slot="header" style={{ fontSize: '1.25rem', fontWeight: 500, fontFamily: 'Roboto, ui-sans-serif, system-ui', padding: '1.25rem 2rem', display: 'block' }}>{item.question}</span>
                  <div
                    style={{ fontSize: '1.125rem', color: 'var(--md-on-surface-variant)', padding: '0 2rem 1.5rem 2rem', whiteSpace: 'pre-line', lineHeight: 1.7 }}
                    dangerouslySetInnerHTML={{
                      __html: item.answer.replace(
                        /<a ([^>]+)>/g,
                        '<a $1 style="color: var(--md-primary); text-decoration: underline; font-weight: 500;" target="_blank" rel="noopener noreferrer">'
                      )
                    }}
                  />
                </m3e-expansion-panel>
              );
            })}
          </m3e-accordion>
        </div>
      </div>
    </div>
  );
}