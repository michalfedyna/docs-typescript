import { DocNode, DocNodeType } from "./DocNode";

interface CodeSpanDocNodeAttributes {
	code: string;
}

class CodeSpanDocNode extends DocNode<CodeSpanDocNodeAttributes> {
	public type: DocNodeType = DocNodeType.CodeSpanDocNode;
}

export { CodeSpanDocNode, CodeSpanDocNodeAttributes };
