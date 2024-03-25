import { DocNodeType, DocNode } from "./DocNode.js";

interface ParagraphDocNodeAttributes {}

class ParagraphDocNode extends DocNode<ParagraphDocNodeAttributes> {
	public type: DocNodeType = DocNodeType.ParagraphDocNode;
}

export { ParagraphDocNode, ParagraphDocNodeAttributes };
