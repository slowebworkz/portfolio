import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** Renders a Markdown source string. Case-study prose is authored as Markdown in
 *  the content package; this is the only place it's turned into elements. Raw
 *  HTML in the source is not rendered (react-markdown's default).
 *
 *  `inline` drops the paragraph wrapper so the result can sit inside a `<p>` —
 *  used for short fragments like a trade-offs line. */
export function Markdown({ children, inline = false }: { children: string; inline?: boolean }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={inline ? { p: ({ children: c }) => <>{c}</> } : undefined}
    >
      {children}
    </ReactMarkdown>
  );
}
