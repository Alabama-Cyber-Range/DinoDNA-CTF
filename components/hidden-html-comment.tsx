/**
 * Emits a real HTML comment into the page DOM.
 *
 * JSX block comments are removed at compile time and never appear in
 * "View Page Source" or DevTools. This component injects an actual HTML
 * comment via dangerouslySetInnerHTML.
 */
export function HiddenHtmlComment({ text }: { text: string }) {
  return (
    <span
      className="hidden"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: `<!-- ${text} -->` }}
    />
  );
}
