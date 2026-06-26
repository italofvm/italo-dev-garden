import { useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

// Configurar DOMPurify para permitir style tags (seguro porque controla os estilos)
DOMPurify.setConfig({
  ALLOWED_TAGS: [
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "blockquote",
    "pre",
    "code",
    "a",
    "img",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "br",
    "em",
    "strong",
    "hr",
  ],
  ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id"],
  KEEP_CONTENT: true,
});

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
