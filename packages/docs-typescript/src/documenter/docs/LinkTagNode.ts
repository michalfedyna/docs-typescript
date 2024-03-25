import { DocNode, DocNodeType } from "./DocNode.js";

interface LinkTagDocNodeAttributes {
	url?: string;
	code?: string;
}

class LinkTagDocNode extends DocNode<LinkTagDocNodeAttributes> {
	public type: DocNodeType = DocNodeType.LinkTagDocNode;
}

export { LinkTagDocNode, LinkTagDocNodeAttributes };
