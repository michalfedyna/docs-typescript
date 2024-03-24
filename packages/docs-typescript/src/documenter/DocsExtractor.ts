import { ApiDocumentedItem, ApiItem } from "@microsoft/api-extractor-model";
import { DocNode as ApiDocNode } from "@microsoft/tsdoc";

import { DocsAttributes } from "./docs/DocsAttributes";

import { DocNode } from "./docs/DocNode";
import { RootDocNode } from "./docs/RootDocNode";
import { PlainTextDocNode } from "./docs/PlainTextDocNode";
import { ParagraphDocNode } from "./docs/ParagraphDocNode";
import { SoftBreakDocNode } from "./docs/SoftBreakDocNode";
import { CodeSpanDocNode } from "./docs/CodeSpanDocNode";
import { FancedCodeDocNode } from "./docs/FancedCodeDocNode";
import { LinkTagDocNode } from "./docs/LinkTagNode";

import { isCodeSpan, isFencedCode, isLinkTag, isParagraph, isPlainText, isSoftBreak } from "./docsNodesMatchers";

namespace DocsExtractor {
	export function traverse(apiDocNode?: ApiDocNode, parent?: DocNode): RootDocNode | undefined {
		if (!apiDocNode) return;

		if (!parent) parent = new RootDocNode();

		let child: DocNode | undefined = extractNode(apiDocNode, parent);

		for (const member of apiDocNode.getChildNodes()) {
			DocsExtractor.traverse(member, child || parent);
		}

		return child || parent;
	}

	function extractNode(apiDocNode: ApiDocNode, parent: DocNode): DocNode | undefined {
		if (isPlainText(apiDocNode)) {
			const attributes = { text: apiDocNode.text };
			const plainTextNode = new PlainTextDocNode(attributes);

			parent.addChild(plainTextNode);
		}

		if (isParagraph(apiDocNode)) {
			const paragraphNode = new ParagraphDocNode({});

			return parent.addChild(paragraphNode);
		}

		if (isSoftBreak(apiDocNode)) {
			const softBreakNode = new SoftBreakDocNode({});

			parent.addChild(softBreakNode);
		}

		if (isLinkTag(apiDocNode)) {
			const attributes = {};
			const linkTagNode = new LinkTagDocNode(attributes);

			parent.addChild(linkTagNode);
		}

		if (isCodeSpan(apiDocNode)) {
			const attributes = { code: apiDocNode.code };
			const codeSpanDocNode = new CodeSpanDocNode(attributes);

			parent.addChild(codeSpanDocNode);
		}

		if (isFencedCode(apiDocNode)) {
			const attributes = { code: apiDocNode.code, language: apiDocNode.language };
			const fancedCodeDocNode = new FancedCodeDocNode(attributes);

			parent.addChild(fancedCodeDocNode);
		}
	}

	export function extract(apiItem: ApiItem): DocsAttributes {
		const docs: DocsAttributes = {};

		if (!(apiItem instanceof ApiDocumentedItem && apiItem.tsdocComment)) return docs;

		const { summarySection, remarksBlock, returnsBlock, deprecatedBlock, typeParams, seeBlocks, params, customBlocks } =
			apiItem.tsdocComment;

		const defaultValueBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@defaultValue");
		const examplesBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@example");
		const sinceBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@since");
		const infoBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@info");
		const warningBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@warning");
		const errorBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@error");
		const authorBlocks = customBlocks.filter((block) => block.blockTag.tagName === "@author");

		docs.summary = DocsExtractor.traverse(summarySection);
		docs.remarks = DocsExtractor.traverse(remarksBlock);
		docs.returns = DocsExtractor.traverse(returnsBlock);
		docs.deprecated = DocsExtractor.traverse(deprecatedBlock);

		if (typeParams.blocks.length > 0) {
			docs.typeParams = typeParams.blocks
				.map((block) => DocsExtractor.traverse(block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (params.blocks.length > 0) {
			docs.params = params.blocks
				.map((block) => DocsExtractor.traverse(block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (seeBlocks.length > 0) {
			docs.see = seeBlocks
				.map((block) => DocsExtractor.traverse(block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (examplesBlocks.length > 0) {
			docs.examples = examplesBlocks
				.map((block) => DocsExtractor.traverse(block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (defaultValueBlocks.length > 0) {
			docs.defaultValue = defaultValueBlocks
				.map((block) => DocsExtractor.traverse(block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (sinceBlocks.length > 0) {
			docs.since = sinceBlocks
				.map((block) => DocsExtractor.traverse(block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (infoBlocks.length > 0) {
			docs.infos = infoBlocks
				.map((block) => DocsExtractor.traverse(block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (warningBlocks.length > 0) {
			docs.warnings = warningBlocks
				.map((block) => DocsExtractor.traverse(block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (errorBlocks.length > 0) {
			docs.errors = errorBlocks
				.map((block) => DocsExtractor.traverse(block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (authorBlocks.length > 0) {
			docs.authors = authorBlocks
				.map((block) => DocsExtractor.traverse(block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		return docs;
	}
}

export { DocsExtractor };
