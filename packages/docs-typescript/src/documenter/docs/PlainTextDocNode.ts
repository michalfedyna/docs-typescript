import { DocNode, DocNodeType } from "./DocNode.js";

interface PlainTextDocNodeAttributes {
	text: string;
}

class PlainTextDocNode extends DocNode<PlainTextDocNodeAttributes> {
	public type: DocNodeType = DocNodeType.PlainTextDocNode;
}

export { PlainTextDocNode, PlainTextDocNodeAttributes };
