import { DocNode, DocNodeType } from "./DocNode";

interface FancedCodeDocNodeAttributes {
	code: string;
}

class FancedCodeDocNode extends DocNode<FancedCodeDocNodeAttributes> {
	public type: DocNodeType = DocNodeType.FancedCodeDocNode;
}

export { FancedCodeDocNode, FancedCodeDocNodeAttributes };
