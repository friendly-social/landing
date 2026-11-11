import "katex/dist/katex.min.css";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkBreaks from "remark-breaks";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { createMemo, type JSXElement } from "solid-js";
import { unified } from "unified";

interface Props {
    children: string;
    style?: string;
}

const parser = unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeKatex)
    .use(rehypeStringify);

export function Component(props: Props): JSXElement {
    const innerHTML = createMemo(() => parser.processSync(props.children));
    return (
        <div
            style={`
            white-space: pre-wrap;
            word-wrap: break-word;
            line-height: 1.25rem;
            ${props.style}
            `}
            innerHTML={String(innerHTML())}
        >
            {props.children}
        </div>
    );
}
