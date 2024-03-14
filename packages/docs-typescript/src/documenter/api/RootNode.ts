import { ApiNode, ApiNodeType } from "../tree/ApiNode";

class RootNode extends ApiNode<{}> {
	public type: ApiNodeType = ApiNodeType.RootNode;

	constructor() {
		super({ name: "", docs: {}, attributes: {} });
	}
}

export { RootNode };
