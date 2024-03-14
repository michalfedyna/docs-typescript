import { TreeNode } from "./TreeNode";

enum DocNodeType {
	DocNode = "DocNode"
}

class DocNode<T extends unknown = unknown> extends TreeNode<T> {
	public type: DocNodeType = DocNodeType.DocNode;
}

export { DocNode, DocNodeType };
