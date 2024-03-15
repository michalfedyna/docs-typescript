import { DocNode, DocNodeType } from "./DocNode";

interface PlainTextDocNodeAttributes {
	text: string;
}

class PlainTextDocNode extends DocNode<PlainTextDocNodeAttributes> {
	public type: DocNodeType = DocNodeType.PlainTextDocNode;
}

export { PlainTextDocNode, PlainTextDocNodeAttributes };
