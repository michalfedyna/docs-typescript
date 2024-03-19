import { DocsAttributes } from "../../documenter/docs/DocsAttributes";

interface MarkdownDocsContext {
	summary: string[];
	remarks: string[];
}

function buildMarkdownDocsContext(docs: DocsAttributes): MarkdownDocsContext {
	const summary: string[] = [];
	const remarks: string[] = [];

	return {
		summary,
		remarks
	};
}

export { MarkdownDocsContext, buildMarkdownDocsContext };
