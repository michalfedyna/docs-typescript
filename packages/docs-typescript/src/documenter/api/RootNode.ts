import { ApiNode, ApiNodeType } from "./ApiNode.js";

class RootNode extends ApiNode<{}> {
	public type: ApiNodeType = ApiNodeType.RootNode;

	constructor() {
		super({ name: "", attributes: {} });
		this.uri = this._createURI(this);
	}
}

export { RootNode };
