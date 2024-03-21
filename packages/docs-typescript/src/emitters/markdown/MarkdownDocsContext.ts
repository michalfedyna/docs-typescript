import { CallbackArray, DocNodeType } from "../../documenter/docs/DocNode";
import { DocsAttributes } from "../../documenter/docs/DocsAttributes";

interface MarkdownDocsContext {
	summary?: string[];
	remarks?: string[];
	examples?: string[];
}

function buildMarkdownDocsContext(docs: DocsAttributes): MarkdownDocsContext {
	let summary: MarkdownDocsContext["summary"];
	let remarks: MarkdownDocsContext["remarks"];
	let examples: MarkdownDocsContext["examples"];

	if (docs.summary) {
		summary = [];
		docs.summary.forEach(buildDoc(summary));
	}

	if (docs.remarks) {
		remarks = [];
		docs.remarks.forEach(buildDoc(remarks));
	}

	if (docs.examples) {
		examples = [];
		docs.examples.forEach((example) => example.forEach(buildDoc(examples as string[])));
	}

	return {
		summary,
		remarks,
		examples
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
		},
		[DocNodeType.FancedCodeDocNode]: (node) => {
			array.push("```" + node.value.language + "\n" + node.value.code + "\n" + "```");
		}
	};
}

export { MarkdownDocsContext, buildMarkdownDocsContext, buildDoc };
