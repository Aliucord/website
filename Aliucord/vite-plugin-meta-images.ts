import type { Plugin } from "vite";

export function metaImagesPlugin(): Plugin {
  return {
    name: "vite-plugin-meta-images",
    transformIndexHtml(html) {
      return html;
    },
  };
}
