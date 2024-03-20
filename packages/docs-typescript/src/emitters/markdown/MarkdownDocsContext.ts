import { CallbackArray, DocNodeType } from "../../documenter/docs/DocNode";
import { DocsAttributes } from "../../documenter/docs/DocsAttributes";

interface MarkdownDocsContext {
	summary?: string[];
	remarks?: string[];
}

function buildMarkdownDocsContext(docs: DocsAttributes): MarkdownDocsContext {
	let summary: string[] | undefined;
	let remarks: string[] | undefined;

	if (docs.summary) {
		summary = [];
		docs.summary?.forEach(buildDoc(summary));
	}

	if (docs.summary) {
		remarks = [];
		docs.remarks?.forEach(buildDoc(remarks));
	}

	return {
		summary,
		remarks
	};
}

function buildDoc(array: string[]): CallbackArray {
	return {
		[DocNodeType.ParagraphDocNode]: () => {
			array.push("");
		},
		[DocNodeType.PlainTextDocNode]: (node) => {
			array[array.length - 1] += node.value.text;
		},
		[DocNodeType.CodeSpanDocNode]: (node) => {
			array[array.length - 1] += "`" + node.value.code + "`";
		}
	};
}

export { MarkdownDocsContext, buildMarkdownDocsContext };
