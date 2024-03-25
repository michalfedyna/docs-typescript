import { ApiDocumentedItem, ApiItem } from "@microsoft/api-extractor-model";
import { DocNode as ApiDocNode } from "@microsoft/tsdoc";

import { DocsAttributes } from "./docs/DocsAttributes.js";

import { DocNode } from "./docs/DocNode.js";
import { RootDocNode } from "./docs/RootDocNode.js";
import { PlainTextDocNode } from "./docs/PlainTextDocNode.js";
import { ParagraphDocNode } from "./docs/ParagraphDocNode.js";
import { SoftBreakDocNode } from "./docs/SoftBreakDocNode.js";
import { CodeSpanDocNode } from "./docs/CodeSpanDocNode.js";
import { FencedCodeDocNode } from "./docs/FencedCodeDocNode.js";
import { LinkTagDocNode, LinkTagDocNodeAttributes } from "./docs/LinkTagNode.js";

import { isCodeSpan, isFencedCode, isLinkTag, isParagraph, isPlainText, isSoftBreak } from "./docsNodesMatchers.js";
import { ApiModelProvider } from "./ApiModelProvider.js";
import { Debug } from "../utils/Debug.js";

namespace DocsExtractor {
	export function traverse(context: ApiItem, apiDocNode?: ApiDocNode, parent?: DocNode): RootDocNode | undefined {
		if (!apiDocNode) return;

		if (!parent) parent = new RootDocNode();

		let child: DocNode | undefined = extractNode(context, apiDocNode, parent);

		for (const member of apiDocNode.getChildNodes()) {
			DocsExtractor.traverse(context, member, child || parent);
		}

		return child || parent;
	}

	function extractNode(context: ApiItem, apiDocNode: ApiDocNode, parent: DocNode): DocNode | undefined {
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
			const attributes: LinkTagDocNodeAttributes = { url: apiDocNode.urlDestination };

			const reference = ApiModelProvider.getInstance().resolveDeclarationReference(apiDocNode.codeDestination, context);

			if (reference?.resolvedApiItem) {
				attributes.code = reference.resolvedApiItem.displayName;
			}

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
			const fancedCodeDocNode = new FencedCodeDocNode(attributes);

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

		docs.summary = DocsExtractor.traverse(apiItem, summarySection);
		docs.remarks = DocsExtractor.traverse(apiItem, remarksBlock);
		docs.returns = DocsExtractor.traverse(apiItem, returnsBlock);
		docs.deprecated = DocsExtractor.traverse(apiItem, deprecatedBlock);

		if (typeParams.blocks.length > 0) {
			docs.typeParams = typeParams.blocks
				.map((block) => DocsExtractor.traverse(apiItem, block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (params.blocks.length > 0) {
			docs.params = params.blocks
				.map((block) => DocsExtractor.traverse(apiItem, block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (seeBlocks.length > 0) {
			docs.see = seeBlocks
				.map((block) => DocsExtractor.traverse(apiItem, block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (examplesBlocks.length > 0) {
			docs.examples = examplesBlocks
				.map((block) => DocsExtractor.traverse(apiItem, block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (defaultValueBlocks.length > 0) {
			docs.defaultValue = defaultValueBlocks
				.map((block) => DocsExtractor.traverse(apiItem, block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (sinceBlocks.length > 0) {
			docs.since = sinceBlocks
				.map((block) => DocsExtractor.traverse(apiItem, block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (infoBlocks.length > 0) {
			docs.infos = infoBlocks
				.map((block) => DocsExtractor.traverse(apiItem, block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (warningBlocks.length > 0) {
			docs.warnings = warningBlocks
				.map((block) => DocsExtractor.traverse(apiItem, block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (errorBlocks.length > 0) {
			docs.errors = errorBlocks
				.map((block) => DocsExtractor.traverse(apiItem, block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		if (authorBlocks.length > 0) {
			docs.authors = authorBlocks
				.map((block) => DocsExtractor.traverse(apiItem, block))
				.filter((node): node is RootDocNode => node !== undefined);
		}

		return docs;
	}
}

export { DocsExtractor };
