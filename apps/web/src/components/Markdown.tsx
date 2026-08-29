import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** Renders a Markdown source string. Case-study prose is authored as Markdown in
 *  the content package; this is the only place it's turned into elements. Raw
 *  HTML in the source is not rendered (react-markdown's default). */
export function Markdown({ children }: { children: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>;
}
