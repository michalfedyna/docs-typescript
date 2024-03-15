import { ApiNode, ApiNodeType } from "./ApiNode";

class RootNode extends ApiNode<{}> {
	public type: ApiNodeType = ApiNodeType.RootNode;

	constructor() {
		super({ name: "", docs: {}, attributes: {} });
		this.uri = this._createURI("");
	}
}

export { RootNode };
