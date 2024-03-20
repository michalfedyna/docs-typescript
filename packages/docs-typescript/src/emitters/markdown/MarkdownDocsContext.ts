import { CallbackArray } from "../../documenter/docs/DocNode";
import { DocsAttributes } from "../../documenter/docs/DocsAttributes";

interface MarkdownDocsContext {
	summary: string[];
	remarks: string[];
}

function buildMarkdownDocsContext(docs: DocsAttributes): MarkdownDocsContext {
	const summary: string[] = [];
	const remarks: string[] = [];

	docs.summary?.forEach(buildDoc(summary));

	return {
		summary,
		remarks
	};
}

function buildDoc(array: string[]): CallbackArray {
	return {};
}

export { MarkdownDocsContext, buildMarkdownDocsContext };
