import { CallbackArray, DocNodeType } from "../../documenter/docs/DocNode";
import { DocsAttributes } from "../../documenter/docs/DocsAttributes";

interface MDDocsContext {
	summary?: string[];
	remarks?: string[];
	examples?: string[];
	returns?: string[];
	since?: string[];
	infos?: string[];
	alerts?: string[];
	errors?: string[];
	authors?: string[];
}

function buildMDDocsContext(docs: DocsAttributes): MDDocsContext {
	let summary: MDDocsContext["summary"];
	let remarks: MDDocsContext["remarks"];
	let examples: MDDocsContext["examples"];
	let returns: MDDocsContext["returns"];
	let since: MDDocsContext["since"];
	let infos: MDDocsContext["infos"];
	let alerts: MDDocsContext["alerts"];
	let errors: MDDocsContext["errors"];
	let authors: MDDocsContext["authors"];

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

	if (docs.returns) {
		returns = [];
		docs.returns.forEach(buildDoc(returns));
	}

	// TODO:

	return {
		summary,
		remarks,
		examples,
		returns
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

export { MDDocsContext, buildMDDocsContext, buildDoc };
