import { TreeNode } from "./TreeNode";
import { DocsAttributes } from "../docs/DocsAttributes";

enum ApiNodeType {
	ApiNode = "ApiNode",
	RootNode = "RootNode",
	PackageNode = "PackageNode",
	NamespaceNode = "NamespaceNode",
	ClassNode = "ClassNode",
	ConstructorNode = "ConstructorNode",
	PropertyNode = "PropertyNode",
	MethodNode = "MethodNode",
	FunctionNode = "FunctionNode",
	VariableNode = "VariableNode",
	InterfaceNode = "InterfaceNode"
}

interface ApiNodeValue<T extends object = object> {
	name: string;
	api: T;
	docs: DocsAttributes;
}

class ApiNode<T extends {}> extends TreeNode<ApiNodeValue<T>> {
	public type: ApiNodeType = ApiNodeType.ApiNode;
	public uri: string;

	constructor(value: ApiNodeValue<T>, parent?: TreeNode<ApiNodeValue<T>>) {
		super(value, parent);

		this.uri = this._createURI(value.name, parent);
	}

	protected _createURI(name: string, parent?: TreeNode<ApiNodeValue<T>>): string {
		if (parent) {
			return this._createURI(parent.value.name, parent.parent) + "/" + name;
		}

		return name;
	}
}

export { ApiNode, ApiNodeType, ApiNodeValue };
