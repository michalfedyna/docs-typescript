import { DocNodeType, DocNode } from "./DocNode";

class RootDocNode extends DocNode {
	public type: DocNodeType = DocNodeType.RootDocNode;

	constructor() {
		super({ attributes: {} });
	}
}

export { RootDocNode };
