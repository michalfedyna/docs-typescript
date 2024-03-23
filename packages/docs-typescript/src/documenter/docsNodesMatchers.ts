import {
	DocCodeSpan,
	DocExcerpt,
	DocFencedCode,
	DocLinkTag,
	DocNode,
	DocParagraph,
	DocPlainText,
	DocSoftBreak
} from "@microsoft/tsdoc";

function isExcerpt(node: DocNode): node is DocExcerpt {
	return node instanceof DocExcerpt;
}

function isPlainText(docNode: DocNode): docNode is DocPlainText {
	return docNode instanceof DocPlainText;
}

function isParagraph(docNode: DocNode): docNode is DocParagraph {
	return docNode instanceof DocParagraph;
}

function isCodeSpan(docNode: DocNode): docNode is DocCodeSpan {
	return docNode instanceof DocCodeSpan;
}

function isSoftBreak(docNode: DocNode): docNode is DocSoftBreak {
	return docNode instanceof DocSoftBreak;
}

function isLinkTag(docNode: DocNode): docNode is DocLinkTag {
	return docNode instanceof DocLinkTag;
}

function isFencedCode(docNode: DocNode): docNode is DocFencedCode {
	return docNode instanceof DocFencedCode;
}

export { isCodeSpan, isExcerpt, isFencedCode, isParagraph, isPlainText, isSoftBreak, isLinkTag };
