import { DocsAttributes } from "../../documenter/docs/DocsAttributes";

interface MarkdownDocsContext {
	docs: DocsAttributes;
}

function buildMarkdownDocsContext(docs: DocsAttributes): MarkdownDocsContext {
	return {
		docs
	};
}

export { MarkdownDocsContext, buildMarkdownDocsContext };
