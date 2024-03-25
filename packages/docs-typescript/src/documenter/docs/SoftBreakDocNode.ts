import { DocNode, DocNodeType } from "./DocNode.js";

interface SoftBreakDocNodeAttributes {}

class SoftBreakDocNode extends DocNode<SoftBreakDocNodeAttributes> {
	public type: DocNodeType = DocNodeType.SoftBreakDocNode;
}

export { SoftBreakDocNode, SoftBreakDocNodeAttributes };
