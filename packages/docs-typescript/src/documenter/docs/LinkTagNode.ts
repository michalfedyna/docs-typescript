import { DocNode, DocNodeType } from "./DocNode";

interface LinkTagDocNodeAttrubutes {
  url?: string,
  text?: string,
}

class LinkTagDocNode extends DocNode<LinkTagDocNodeAttrubutes> {
	public type: DocNodeType = DocNodeType.LinkTagDocNode;
}

export { LinkTagDocNode, LinkTagDocNodeAttrubutes };
