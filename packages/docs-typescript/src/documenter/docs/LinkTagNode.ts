import { DocNode, DocNodeType } from "./DocNode.js";

interface LinkTagDocNodeAttributes {
	url?: string;
	text?: string;
}

class LinkTagDocNode extends DocNode<LinkTagDocNodeAttributes> {
	public type: DocNodeType = DocNodeType.LinkTagDocNode;
}

export { LinkTagDocNode, LinkTagDocNodeAttributes };
