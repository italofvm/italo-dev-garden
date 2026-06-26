import { useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

// Hook para renderizar Markdown com proteção XSS.
// marked converte MD → HTML, DOMPurify remove scripts/tags perigosas.
export function useMarkdownContent(markdown: string) {
  return useMemo(() => {
    try {
      // marked é síncrono por padrão se não houver async plugins
      const html = marked.parse(markdown) as string;
      const clean = DOMPurify.sanitize(html);
      return clean;
    } catch {
      return DOMPurify.sanitize(markdown);
    }
  }, [markdown]);
}

