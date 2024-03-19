import { DocNode, DocNodeType } from "./DocNode";

interface SoftBreakDocNodeAttributes {}

class SoftBreakDocNode extends DocNode<SoftBreakDocNodeAttributes> {
	public type: DocNodeType = DocNodeType.SoftBreakDocNode;
}

export { SoftBreakDocNode, SoftBreakDocNodeAttributes };
