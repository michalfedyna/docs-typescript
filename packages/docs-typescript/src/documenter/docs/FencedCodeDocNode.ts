import { DocNode, DocNodeType } from "./DocNode.js";

interface FencedCodeDocNodeAttributes {
	code: string;
	language: string;
}

class FencedCodeDocNode extends DocNode<FencedCodeDocNodeAttributes> {
	public type: DocNodeType = DocNodeType.FancedCodeDocNode;
}

export { FencedCodeDocNode, FencedCodeDocNodeAttributes };
