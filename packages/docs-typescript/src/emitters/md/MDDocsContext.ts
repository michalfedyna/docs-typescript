import { CallbackArray, DocNodeType } from "../../documenter/docs/DocNode.js";
import { DocsAttributes } from "../../documenter/docs/DocsAttributes.js";

interface MDDocsContext {
	summary?: string[];
	remarks?: string[];
	examples?: string[];
	returns?: string[];
	since?: string[];
	infos?: string[];
	warnings?: string[];
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
	let warnings: MDDocsContext["warnings"];
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

	if (docs.returns) {
		returns = [];
		docs.returns.forEach(buildDoc(returns));
	}

	if (docs.examples) {
		examples = [];
		docs.examples.forEach((rootNode) => rootNode.forEach(buildDoc(examples as string[])));
	}

	if (docs.since) {
		since = [];
		docs.since.forEach((rootNode) => rootNode.forEach(buildDoc(since as string[])));
	}

	if (docs.infos) {
		infos = [];
		docs.infos.forEach((rootNode) => rootNode.forEach(buildDoc(infos as string[])));
	}

	if (docs.warnings) {
		warnings = [];
		docs.warnings.forEach((rootNode) => rootNode.forEach(buildDoc(warnings as string[])));
	}

	if (docs.errors) {
		errors = [];
		docs.errors.forEach((rootNode) => rootNode.forEach(buildDoc(errors as string[])));
	}

	if (docs.authors) {
		authors = [];
		docs.authors.forEach((rootNode) => rootNode.forEach(buildDoc(authors as string[])));
	}

	return {
		summary,
		remarks,
		examples,
		returns,
		since,
		infos,
		warnings,
		errors,
		authors
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
		[DocNodeType.LinkTagDocNode]: (node) => {
			let value = "";

			if (node.value.code) {
				value = "`" + node.value.code + "`";
			}

			if (node.value.url) {
				value = node.value.url;
			}

			array[array.length - 1] += value;
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
