import { DocNodeType, DocNode } from "./DocNode";

interface ParagraphDocNodeAttributes {}

class ParagraphDocNode extends DocNode<ParagraphDocNodeAttributes> {
	public type: DocNodeType = DocNodeType.ParagraphDocNode;
}

export { ParagraphDocNode, ParagraphDocNodeAttributes };
