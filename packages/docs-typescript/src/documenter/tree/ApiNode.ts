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
	InterfaceNode = "InterfaceNode",
	ConstructorSignatureNode = "ConstructorSignatureNode",
	PropertySignatureNode = "PropertySignatureNode",
	MethodSignatureNode = "MethodSignatureNode",
	IndexSignatureNode = "IndexSignatureNode",
	TypeAliasNode = "TypeAliasNode",
	EnumNode = "EnumNode",
	EnumMemberNode = "EnumMemberNode"
}

interface ApiNodeValue<T> {
	name: string;
	attributes: T;
	docs: DocsAttributes;
}

class ApiNode<T = unknown> extends TreeNode<ApiNodeValue<T>> {
	public type: ApiNodeType = ApiNodeType.ApiNode;
	public uri: string;

	public children: ApiNode[] = [];
	public parent?: ApiNode;

	constructor(value: ApiNodeValue<T>, parent?: ApiNode) {
		super(value, parent);

		this.uri = this._createURI(value.name, parent);
	}

	protected _createURI(name: string, parent?: ApiNode): string {
		if (parent) {
			return this._createURI(parent.value.name, parent.parent) + "/" + name;
		}

		return name;
	}
}

export { ApiNode, ApiNodeType, ApiNodeValue };
