// Hook para limpar símbolos markdown de um texto
// Remove ###, **, *, --, [], etc. mantendo só o texto limpo
export function useCleanMarkdown(markdown: string): string {
  return markdown
    // Remove headers (###, ##, #)
    .replace(/^#+\s+/gm, "")
    // Remove bold (**texto**)
    .replace(/\*\*(.+?)\*\*/g, "$1")
    // Remove italic (*texto*)
    .replace(/\*(.+?)\*/g, "$1")
    // Remove bold with underscores (__texto__)
    .replace(/__(.+?)__/g, "$1")
    // Remove italic with underscores (_texto_)
    .replace(/_(.+?)_/g, "$1")
    // Remove code blocks (```...```)
    .replace(/```[\s\S]*?```/g, "[código]")
    // Remove inline code (`código`)
    .replace(/`(.+?)`/g, "$1")
    // Remove links ([texto](url))
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    // Remove images (![alt](url))
    .replace(/!\[(.+?)\]\(.+?\)/g, "$1")
    // Remove blockquotes (> texto)
    .replace(/^>\s+/gm, "")
    // Remove horizontal rules (---, ***, ___)
    .replace(/^[\*\-_]{3,}$/gm, "")
    // Remove list markers (-, *, +)
    .replace(/^[\*\-\+]\s+/gm, "")
    // Remove numbered list markers (1., 2., etc)
    .replace(/^\d+\.\s+/gm, "")
    // Remove extra whitespace
    .replace(/\s+/g, " ")
    .trim();
}
